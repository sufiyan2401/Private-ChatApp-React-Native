import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'
import { collection, doc, addDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { database } from '../config/Firebase'
// import { db } from '../config/Firebase';
export default function ChatScreen({ user, route }) {

    // const [unreadMessages, setUnreadMessages] = useState([]);

    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [useruid, setUseruid] = useState(user.uid)
    const [unreadmessages, setUnReadMessages] = useState(1)
    const { uid } = route.params;
    const onTyping = () => {
        setIsTyping(true);
    }

    const checker = () => {
        firestore().collection("chatrooms")
            .get()
            .then((querySnapshot) => {
                // console.log("querysnap" , querySnapshot)
                querySnapshot.forEach((doc) => {
                    // console.log("doc" , doc.data())
                    // setUnit(doc.data())
                    const unreadCounts = doc.data().unreadCounts;
                    const suid = Object.keys(unreadCounts)[0];
                    const unreadmessages = unreadCounts[uid];
                    const docid = uid > user.uid ? user.uid + "-" + uid : uid + "-" + user.uid
                    if (unreadmessages.length > 0 || suid == uid) {
                        console.warn("mileti")
                        firestore().collection('chatrooms')
                            .doc(docid).update({
                                unreadCounts: {
                                    [user.uid]: "0",
                                }
                                // [useruid]:"working" , [uid]: "working"       
                            })
                    }
                    // console.warn(uid, unreadmessages)
                    // console.log(`uid: ${uid}, unread messages: ${unreadmessages}`);
                    // setUnit(uid)
                    // setUnread(unreadmessages)
                });
            })
            .catch((error) => {
                console.warn("Error getting documents: ", error);
            });
    }
    useEffect(() => {
        checker()
    }, [])
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
        // getAllMessages()

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
            // firestore().collection('chatrooms')
            //     .doc(docid).update({
            //         unreadCounts: {
            //             [user.uid]: "0",
            //         }
            //         // [useruid]:"working" , [uid]: "working"       
            //     })
            setMessages(allmsg)
        })


        return () => {
            unSubscribe()
        }


    }, [])

    const onSend = async (messageArray) => {
        const msg = messageArray[0]
        setUnReadMessages(unreadmessages + 1)
        // setUnReadMessages(unreadmessages + 1)
        const mymsg = {
            ...msg,
            sentBy: user.uid,
            sentTo: uid,
            createdAt: new Date(),
            // uid: unreadmessages,
            sendAt: new Date().getTime(),
            readBy: user.uid,
            unreadBy: uid
        }
        const unreadCounts = {
            // [useruid]: "hello",
            [uid]: unreadmessages
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
        // addDoc(collection(database, "chatrooms", docid, "messages"), {
        //     msgtext: "message",
        //     // ...mymsg,
        //     // createdAt: serverTimestamp()
        //     // sentBy: "mainho",
        //     // // seenby: itemId,
        //     // date: "pta nhii",
        // });
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

        // const query = query(collectionGroup(db, 'messages'), where('docid', '==', docid));
        // const docRef =  addDoc(query, { ...mymsg, createdAt: serverTimestamp() });

        // const docRef = doc(db, 'chatrooms', docid, 'messages', new Date().getTime().toString());
        // addDoc(docRef, { ...mymsg, createdAt: serverTimestamp() });

        //  addDoc(collection(doc(db, 'chatrooms', docid, 'messages')), { ...mymsg, createdAt: serverTimestamp() });

        //  addDoc(collection(doc(db, 'chatrooms', docid, 'messages')), { ...mymsg, createdAt: serverTimestamp() });
        // setIsTyping(false);

    }
    return (
        <View style={{ flex: 1, backgroundColor: "#51e2f5" }}>
            <GiftedChat
                messages={messages}
                onInputTextChanged={() => onTyping()}
                isTyping={true}
                onSend={text => onSend(text)}
                user={{
                    _id: user.uid,
                }}
                renderBubble={(props) => {
                    return <Bubble
                        {...props}
                        wrapperStyle={{
                            right: {
                                backgroundColor: "#a28089",
                            }

                        }}
                    />
                }}

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


// https://blog.logrocket.com/how-to-build-chatroom-app-react-firebase/
// https://css-tricks.com/building-a-real-time-chat-app-with-react-and-firebase/
// https://css-tricks.com/building-a-real-time-chat-app-with-react-and-firebase/
// https://stackoverflow.com/questions/73090418/conversion-to-firebase-9-from-version-7-giving-me-firebaseerror-expected-type
// 