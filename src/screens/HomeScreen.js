import React, { useState, useEffect } from 'react'
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { FAB } from 'react-native-paper'
import { Badge, Button } from 'react-native-paper';
import { stringLiteral } from '@babel/types';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UnreadMessagesIcon from '../components/UnreadMessagesIcon';


// import { getFirestore } from "firebase/firestore";

// import { AsyncStorage } from 'react-native';
export default  function HomeScreen({ user, navigation }) {
    // console.log(user)
    const [users, setUsers] = useState(null)
    const [messages , setMessages] = useState({})
    const [info , setInfo] = useState("")
    const [unit , setUnit] = useState("")
    const [unread,setUnread] = useState(0)
    const getunread =async() =>{
        firestore().collection("chatrooms")
    .get()
    .then((querySnapshot) => {
        // console.log("querysnap" , querySnapshot)
        querySnapshot.forEach((doc) => {
            // console.log("doc" , doc.data())
            // setUnit(doc.data())
                const unreadCounts = doc.data().unreadCounts;
                const uid = Object.keys(unreadCounts)[0];
                const unreadmessages = unreadCounts[uid];
                    // console.log(`uid: ${uid}, unread messages: ${unreadmessages}`);
                    setUnit(uid)
                    setUnread(unreadmessages)
        });
    }) 
    .catch((error) => {
        console.warn("Error getting documents: ", error);
    });
      
    }
        getunread();
    const getUsers = async () => {
        const querySanp = await firestore().collection('users').where('uid', '!=', user.uid).get 
        ()
        const allusers = querySanp.docs.map(docSnap => docSnap.data())
        // console.log(allusers)
        setUsers(allusers)
    }

    useEffect(() => {
        getUsers()
    }, [])
    // AsyncStorage.setItem('key', 'value');  

    const RenderCard = ({ item }) => {
        return(
                <TouchableOpacity onPress={() => navigation.navigate('chat', {
                name: item.name, uid: item.uid,
                status: typeof (item.status) == "string" ? item.status : item.status.toDate().toString()
            })}>
            <View style={{
                backgroundColor:'black',
                color:'white',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
              }}>
                <View style={{ marginRight: 16 }}>
                  <Text style={{ fontSize: 18 , color:'white'}}>{item.name}</Text>
                  <Text style={{ fontSize: 18, color:'white' }}>{item.email}</Text>
                </View>
                {/* {console.warn(unread)} */}
  {unit == item.uid ? null:<UnreadMessagesIcon count={unread} /> }
                
              </View>
              </TouchableOpacity>
        )
        // return(
        // )
        // if(unit==item.uid){
        // }
        // return (
        //     // <TouchableOpacity onPress={()=>{navigation.navigate('chat')}}>
        //     <TouchableOpacity onPress={() => navigation.navigate('chat', {
        //         name: item.name, uid: item.uid,
        //         status: typeof (item.status) == "string" ? item.status : item.status.toDate().toString()
        //     })}>
        //         <View style={styles.mycard}>
        //             {/* <Image source={{uri:item.pic}} style={styles.img}/> */}
        //             {/* <Button icon="account" style={styles.img} /> */}
        //             <View>
        //                 <Text style={styles.text}>
        //                     {item.name}
        //                 </Text>
        //                 {/* {unit == item.uid ? <Text>0</Text> : <Text>{unread}</Text>} */}
        //                 <Text style={styles.text}>
        //                     {item.email}
        //                 </Text>

        //             </View>
        //         </View>
        //     </TouchableOpacity>
        // )
        // setInfo(item.uid)
    }
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={users}
                renderItem={({ item }) => { return <RenderCard item={item} /> }}
                keyExtractor={(item) => item.uid}
            />
            <Button icon="account" style={{ fontSize: 60 }} onPress={() => navigation.navigate("account")}>
                See Acount Info
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({
    img: { width: 60, height: 60, borderRadius: 30, backgroundColor: "green" },
    text: {
        color: 'black',
        fontSize: 18,
        marginLeft: 15,
    },
    mycard: {
        flexDirection: "row",
        margin: 3,
        padding: 4,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "white"
    },
});
    // //get
    // //id sendto
    // if(get !== null){
        
    
    //     // loop id check
    // if(){
    // }else{
    // const tempSendTo='asdasd';
    // const tempSendBy='sdasdasd';
    // const dummy = {
    //         sendTo:tempSendTo,
    //         sendBy:tempSendBy,
    //         time:new Date().getTime()
    //     }
    // const tempData=[...getData]
    // tempData.push(dummy)
    // }
    // }else{
    //     const tempSendTo='asdasd';
    // const tempSendBy='sdasdasd';
    // data=[
    //     {
    //         sendTo:'sadasd',
    //         sendBy:'asdasd',
    //         time:new Date().getTime()
    //     }
    //     ]
    // }