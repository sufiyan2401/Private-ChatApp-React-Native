// import React,{useState,useEffect} from 'react'
// import { View, Text } from 'react-native'
// import { GiftedChat,Bubble,InputToolbar} from 'react-native-gifted-chat'
// import firestore from '@react-native-firebase/firestore'
// export default function ChatScreen({user,route}) {
//     const [messages, setMessages] = useState([]);
//      const {uid} = route.params;
//      const getAllMessages = async ()=>{
//         const docid  = uid > user.uid ? user.uid+ "-" + uid : uid+"-"+user.uid 
//         const querySanp = await firestore().collection('chatrooms')
//         .doc(docid)
//         .collection('messages')
//         .orderBy('createdAt',"desc")
//         .get()
//        const allmsg =   querySanp.docs.map(docSanp=>{
//             return {
//                 ...docSanp.data(),
//                 createdAt:docSanp.data().createdAt.toDate()
//             }
//         })
//         setMessages(allmsg)


//      }
//     useEffect(() => {
//       // getAllMessages()

//       const docid  = uid > user.uid ? user.uid+ "-" + uid : uid+"-"+user.uid 
//         const messageRef = firestore().collection('chatrooms')
//         .doc(docid)
//         .collection('messages')
//         .orderBy('createdAt',"desc")

//       const unSubscribe =  messageRef.onSnapshot((querySnap)=>{
//             const allmsg =   querySnap.docs.map(docSanp=>{
//              const data = docSanp.data()
//              if(data.createdAt){
//                  return {
//                     ...docSanp.data(),
//                     createdAt:docSanp.data().createdAt.toDate()
//                 }
//              }else {
//                 return {
//                     ...docSanp.data(),
//                     createdAt:new Date()
//                 }
//              }

//             })
//             setMessages(allmsg)
//         })


//         return ()=>{
//           unSubscribe()
//         }


//       }, [])

//       const onSend =(messageArray) => {
//         const msg = messageArray[0]
//         const mymsg = {
//             ...msg,
//             sentBy:user.uid,
//             sentTo:uid,
//             createdAt:new Date()
//         }
//        setMessages(previousMessages => GiftedChat.append(previousMessages,mymsg))
//        const docid  = uid > user.uid ? user.uid+ "-" + uid : uid+"-"+user.uid 

//        firestore().collection('chatrooms')
//        .doc(docid)
//        .collection('messages')
//        .add({...mymsg,createdAt:firestore.FieldValue.serverTimestamp()})


//       }
//     return (
//         <View style={{flex:1,backgroundColor:"#f5f5f5"}}>
//            <GiftedChat
//                 messages={messages}
//                 onSend={text => onSend(text)}
//                 user={{
//                     _id: user.uid,
//                 }}
//                 renderBubble={(props)=>{
//                     return <Bubble
//                     {...props}
//                     wrapperStyle={{
//                       right: {
//                         backgroundColor:"green",

//                       }

//                     }}
//                   />
//                 }}

//                 renderInputToolbar={(props)=>{
//                     return <InputToolbar {...props}
//                      containerStyle={{borderTopWidth: 1.5, borderTopColor: 'green'}} 
//                      textInputStyle={{ color: "black" }}
//                      />
//                 }}

//                 />
//         </View>
//     )
// }


// // //THUQdkImzFVOv2LqHvxdSn3RDLY2-jxgISB0nWgRmtfu2OIn1BIVlBMu1
//MY OWN CODE
// import { View, Text } from 'react-native'
// import React, { useState, useEffect, useCallback } from 'react'
// import { GiftedChat } from 'react-native-gifted-chat'
// import firestore from '@react-native-firebase/firestore'
// const ChatScreen = ({ user, route }) => {
//   const { uid } = route.params;
//   const [messages, setMessages] = useState([])
//   const getAllMessages = async () => {
//     const docid = uid > user.uid ? user.uid + "-" + uid : uid + "-" + user.uid
//     const querySanp = firestore().collection('chatrooms')
//       .doc(docid)
//       .collection("messages")
//       .orderBy('createdAt', "asc")
//       .get()
//     const allmsg = querySanp.docs.map(docSanp => {
//       return {
//         ...querySanp.doc(),
//         createdAt: docSanp.data().createdAt.toDate()
//       }
//     })
//     setMessages(allmsg)
//   }
//   useEffect(() => {
//     getAllMessages();
//   }, [])


//   const onSend = (messageArray) => {
//     console.log(messageArray)
//     const msg = messageArray[0]
//     const mymsg = {
//       ...msg,
//       sentby: user.uid,
//       sentTo: uid,
//       createdAt: new Date()
//     }
//     setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
//     const docid = uid > user.uid ? user.uid + "-" + uid : uid + "-" + user.uid
//     firestore().collection('chatrooms')
//       .doc(docid)
//       .collection("messages")
//       .add({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() })
//   }
//   return (
//     <View style={{ flex: 1 }}>
//       <GiftedChat
//         messages={messages}
//         onSend={text => onSend(text)}
//         user={{
//           _id: user.uid,
//         }}
//       />
//     </View>
//   )
// }

// export default ChatScreen
import React,{useState,useEffect} from 'react'
import { View, Text } from 'react-native'
import { GiftedChat,Bubble,InputToolbar} from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'
export default function ChatScreen({user,route}) {
    const [messages, setMessages] = useState([]);
     const {uid} = route.params;
     const getAllMessages = async ()=>{
        const docid  = uid > user.uid ? user.uid+ "-" + uid : uid+"-"+user.uid 
        const querySanp = await firestore().collection('chatrooms')
        .doc(docid)
        .collection('messages')
        .orderBy('createdAt',"desc")
        .get()
       const allmsg =   querySanp.docs.map(docSanp=>{
            return {
                ...docSanp.data(),
                createdAt:docSanp.data().createdAt.toDate()
            }
        })
        setMessages(allmsg)

    
     }
    useEffect(() => {
      // getAllMessages()

      const docid  = uid > user.uid ? user.uid+ "-" + uid : uid+"-"+user.uid 
        const messageRef = firestore().collection('chatrooms')
        .doc(docid)
        .collection('messages')
        .orderBy('createdAt',"desc")

      const unSubscribe =  messageRef.onSnapshot((querySnap)=>{
            const allmsg =   querySnap.docs.map(docSanp=>{
             const data = docSanp.data()
             if(data.createdAt){
                 return {
                    ...docSanp.data(),
                    createdAt:docSanp.data().createdAt.toDate()
                }
             }else {
                return {
                    ...docSanp.data(),
                    createdAt:new Date()
                }
             }
                
            })
            setMessages(allmsg)
        })


        return ()=>{
          unSubscribe()
        }

        
      }, [])

      const onSend =(messageArray) => {
        const msg = messageArray[0]
        const mymsg = {
            ...msg,
            sentBy:user.uid,
            sentTo:uid,
            createdAt:new Date()
        }
       setMessages(previousMessages => GiftedChat.append(previousMessages,mymsg))
       const docid  = uid > user.uid ? user.uid+ "-" + uid : uid+"-"+user.uid 
 
       firestore().collection('chatrooms')
       .doc(docid)
       .collection('messages')
       .add({...mymsg,createdAt:firestore.FieldValue.serverTimestamp()})


      }
    return (
        <View style={{flex:1,backgroundColor:"#51e2f5"}}>
           <GiftedChat
                messages={messages}
                onSend={text => onSend(text)}
                
                user={{
                    _id: user.uid,
                }}
                renderBubble={(props)=>{
                    return <Bubble
                    {...props}
                    wrapperStyle={{
                      right: {
                        backgroundColor:"#a28089",

                      }
                      
                    }}
                  />
                }}

                renderInputToolbar={(props)=>{
                    return <InputToolbar {...props}
                     containerStyle={{borderTopWidth: 1.5, borderTopColor: '#51e2f5'}} 
                     textInputStyle={{ color: "black" }}
                     />
                }}
                
                />
        </View>
    )
}


//THUQdkImzFVOv2LqHvxdSn3RDLY2-jxgISB0nWgRmtfu2OIn1BIVlBMu1