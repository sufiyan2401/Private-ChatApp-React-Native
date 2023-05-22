
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image, Modal } from 'react-native'
import { GiftedChat, Bubble, InputToolbar, Composer } from 'react-native-gifted-chat'
import { launchImageLibrary } from 'react-native-image-picker'
import firestore from '@react-native-firebase/firestore'
import { storage } from '../config/Firebase'
import { uploadBytes, getDownloadURL, ref, getStorage } from 'firebase/storage';
export default function ChatScreen({ user, route }) {

    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [useruid, setUseruid] = useState(user.uid)
    const [unreadmessages, setUnReadMessages] = useState(1)
    const { uid, name } = route.params;
    const [imageurl, setImageUrl] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImagePreview, setSelectedImagePreview] = useState(null);


    const onTyping = () => {
        setIsTyping(true);
    }
    const selectImage = async () => {
        try {
            // Launch image library to select an image
            const image = await new Promise((resolve, reject) => {
                launchImageLibrary({ mediaType: 'photo' }, response => {
                    if (response.didCancel) {
                        reject('Image selection cancelled');
                    } else if (response.error) {
                        reject(`Image picker error: ${response.error}`);
                    } else {
                        resolve(response.assets);
                    }
                });
            });

            // Check if image is available
            if (!image[0].uri) {
                throw new Error('No image selected');
            }

            // Set the selected image preview and show the modal
            setSelectedImagePreview(image[0].uri);
            setIsModalVisible(true);
        } catch (error) {
            console.error('Error selecting image:', error);
            throw error;
        }
    };

    const checker = () => {
        firestore().collection("chatrooms")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const unreadCounts = doc.data().unreadCounts;
                    const suid = Object.keys(unreadCounts)[0];
                    const unreadmessages = unreadCounts[uid];
                    const docid = uid > user.uid ? user.uid + "-" + uid : uid + "-" + user.uid
                    if (suid == useruid) {
                        // console.warn("mileti")
                        firestore().collection('chatrooms')
                            .doc(docid).update({
                                unreadCounts: {
                                    [useruid]: "0",
                                }
                                // [useruid]:"working" , [uid]: "working"       
                            })
                        // setUnReadMessages("0")
                    }
                    console.log(unreadmessages)
                });
            })
            .catch((error) => {
                console.warn("Error getting documents: ", error);
            });
    }
    // useEffect(() => {
    checker()
    // }, [])
    const getAllMessages = async () => {
        const docid = uid > user.uid ? user.uid + "-" + uid : uid + "-" + user.uid
        const querySanp = await firestore().collection('chatrooms')
            .doc(docid)
            .collection('messages')
            .orderBy('createdAt', "desc")
            .get()
        const allmsg = querySanp.docs.map(docSanp => {
            return {
                ...docSanp.data(),
                createdAt: docSanp.data().createdAt.toDate()
            }
        })

        setMessages(allmsg)


    }
    useEffect(() => {
        const docid = uid > user.uid ? user.uid + "-" + uid : uid + "-" + user.uid
        const messageRef = firestore().collection('chatrooms')
            .doc(docid)
            .collection('messages')
            .orderBy('createdAt', "desc")

        const unSubscribe = messageRef.onSnapshot((querySnap) => {
            const allmsg = querySnap.docs.map(docSanp => {
                const data = docSanp.data()
                if (data.createdAt) {
                    return {
                        ...docSanp.data(),
                        createdAt: docSanp.data().createdAt.toDate()
                    }
                } else {
                    return {
                        ...docSanp.data(),
                        createdAt: new Date()
                    }
                }

            })
            setMessages(allmsg)
        })


        return () => {
            unSubscribe()
        }


    }, [])

    const onSend = async (messageArray = [], image = '') => {
        const msg = messageArray[0]
        setUnReadMessages(unreadmessages + 1)
        const mymsg = {
            ...msg,
            sentBy: user.uid,
            sentTo: uid,
            createdAt: new Date(),
            sendAt: new Date().getTime(),
            readBy: user.uid,
            unreadBy: uid,
            username: name,
            pictureurl: image
        }
        const unreadCounts = {
            [uid]: unreadmessages
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
        const docid = uid > user.uid ? user.uid + "-" + uid : uid + "-" + user.uid
        try {
            await firestore().collection('chatrooms')
                .doc(docid)
                .collection('messages')
                .add({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() })
            await firestore().collection('chatrooms')
                .doc(docid).set({
                    unreadCounts
                    // [useruid]:"working" , [uid]: "working"       
                })
        } catch (err) {
            console.warn(err, "there error")
        }
    }
    const ImagePreviewModal = ({ isVisible, imageUri, onSend }) => {
        return (
            <Modal visible={isVisible} onRequestClose={() => { }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
                    <TouchableOpacity onPress={onSend}>
                        <Text style={{ color: 'blue', padding: 10 }}>Send</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    };

    const renderInputToolbar = (props) => (
        <InputToolbar
            {...props}
            // containerStyle={{ borderTopWidth: 1.5, borderTopColor: '#51e2f5' }}
            textInputStyle={{ color: 'black' }}
            containerStyle={{ borderTopWidth: 1.5, borderTopColor: '#51e2f5', flexDirection: 'row', alignItems: 'center' }}
            primaryStyle={{ flex: 1 }}
            renderComposer={(composerProps) => (
                <View style={{ flex: 1, flexDirection: 'row', color: 'black' }}>
                    {!composerProps.text && (
                        <TouchableOpacity onPress={selectImage}>
                            <Text style={{ color: 'blue', padding: 10 }}>Pick Image</Text>
                        </TouchableOpacity>
                    )}
                    <Composer {...composerProps} />
                </View>
            )}
        />
        // <InputToolbar
        //     {...props}

        //     containerStyle={{ borderTopWidth: 1.5, borderTopColor: '#51e2f5' }}
        //     textInputStyle={{ color: 'black' }}
        //     renderAccessory={() => (
        //         <TouchableOpacity onPress={selectImage}>
        //             <Text style={{ color: 'blue', padding: 10 }} >Pick Image</Text>
        //         </TouchableOpacity>

        //     )}
        // />
    );
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <GiftedChat
                renderUsernameOnMessage={true}
                isTyping={true}
                messages={messages}
                renderInputToolbar={renderInputToolbar}
                onInputTextChanged={() => onTyping()}
                onSend={(text) => onSend(text)}
                user={{
                    _id: user.uid,
                }}
                renderCustomView={(props) => {
                    const { currentMessage } = props;
                    if (props.currentMessage?.pictureurl) {
                        const isMyMessage = currentMessage.user._id === user.uid;
                        const alignSelf = isMyMessage ? 'justify-content-end' : 'flex-start';

                        return (
                            <View style={{ alignSelf, marginRight: 10, marginLeft: 10 }}>
                                <Image
                                    source={{ uri: props.currentMessage?.pictureurl }}
                                    style={{ width: 200, height: 200, borderRadius: 10 }}
                                />
                            </View>
                        );
                    }
                    return null;
                }}
                renderBubble={(props) => {
                    const { currentMessage } = props;
                    const isMyMessage = currentMessage.user._id === user.uid;

                    return (
                        <Bubble
                            {...props}
                            wrapperStyle={{
                                left: { backgroundColor: isMyMessage ? '#FFFFFF' : '#E5E5E5' },
                                right: { backgroundColor: '#000' },
                                borderRadius: 10,
                                paddingHorizontal: 0,
                                // Add any other custom styles you want
                            }}
                            textStyle={{
                                left: { color: '#000000' },
                                right: {
                                    color: '#FFFFFF',
                                    // marginBottom: 
                                    // Add any other custom styles you want
                                },

                            }}
                        />
                    );
                }}
            />
            <ImagePreviewModal
                isVisible={isModalVisible}
                imageUri={selectedImagePreview}
                onSend={() => {
                    setIsModalVisible(false);
                    onSend('', selectedImagePreview);
                }}
            />
        </View>
    );
}
