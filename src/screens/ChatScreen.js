import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'
export default function ChatScreen({ user, route }) {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [useruid, setUseruid] = useState(user.uid)
    const [unreadmessages, setUnReadMessages] = useState(1)
    const { uid,name } = route.params;

    const onTyping = () => {
        setIsTyping(true);
    }

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

    const onSend = async (messageArray) => {
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
            username:name
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
    return (
        <View style={{ flex: 1, backgroundColor: "#3B5998" }}>
            <GiftedChat
            renderUsernameOnMessage={true}
                isTypinsg={true}
                messages={messages}
                onInputTextChanged={() => onTyping()}
                onSend={text => onSend(text)}
                user={{
                    _id: user.uid,
                }}
                renderBubble={(props) => {
                    return (
                      <Bubble
                        {...props}
                        wrapperStyle={{
                          left: { backgroundColor: '#FFFFFF', },
                          right: { backgroundColor: '#000', },
                        }}
                        textStyle={{
                          left: { color: '#000000' },
                          right: { color: '#FFFFFF' }
                        }}
                      />
                    );
                  }}
                  
                // renderBubble={(props) => {
                //     return <Bubble
                //         {...props}
                //         wrapperStyle={{
                //             right: {
                //                 backgroundColor: "#a28089",
                //             }

                //         }}
                //     />
                // }}

                renderInputToolbar={(props) => {
                    return <InputToolbar {...props}
                        containerStyle={{ borderTopWidth: 1.5, borderTopColor: '#51e2f5' }}
                        textInputStyle={{ color: "black" }}
                    />
                }}

            />
        </View>
    )
}
