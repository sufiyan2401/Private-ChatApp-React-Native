// import React,{useState} from 'react'
// import { View, Text ,Image,StyleSheet,KeyboardAvoidingView,TouchableOpacity,ActivityIndicator} from 'react-native'
// import { TextInput,Button } from 'react-native-paper';
// import auth from '@react-native-firebase/auth'
// export default function SignupScreen({navigation}) {
//     const [email,setEmail] = useState('')
//     const [password,setPassword] = useState('')
//     const [loading,setLoading] = useState(false)
//     // if(loading){
//     //     // return  <ActivityIndicator size="large" color="#00ff00" />
//     // }
//     const userLogin = async ()=>{
//         setLoading(true)
//         if(!email || !password){
//                alert("please add all the field")
//                return 
//         }
//         try{
//           const result =  await auth().signInWithEmailAndPassword(email,password)
//             setLoading(false)
//         }catch(err){
//             alert("something went wrong")
//         }
       

//     }
//     return (
//         <KeyboardAvoidingView behavior="position">
//             <View style={styles.box1}>
//                 <Text style={styles.text}>Welcome to Whatsapp 5.0</Text>
//                 <Image style={styles.img} source={require('../assets/wa.png')} />
//             </View>
//             <View style={styles.box2}>
//             <Text style={{color:'black',marginLeft:120}}>Login Here !</Text>
//                  <TextInput
//                  label="Email"
//                  value={email}
//                  onChangeText={(text)=>setEmail(text)}
//                  mode="outlined"
//                 />
//                 <TextInput
//                  label="password"
//                  mode="outlined"
//                  value={password}
//                  onChangeText={(text)=>setPassword(text)}
//                  secureTextEntry
//                 />
                
//                  {/* <Button
//                 mode="contained"
//                 onPress={()=>userLogin()}
//                 disabled={!email || !password}
//                 >Login</Button> */}
//                  <Button
//                 mode="contained"
//                 onPress={()=>userLogin()}
//                 disabled={!email || !password}
//                 >Login</Button>
//                 <TouchableOpacity onPress={()=>navigation.navigate('signup')}><Text style={{textAlign:"center" , color:"black"}}>Dont have an account ?</Text></TouchableOpacity>
               
//             </View>
//         </KeyboardAvoidingView>
//     )
// }


// const styles = StyleSheet.create({
//     text:{
//         fontSize:22,
//         color:"green",
//         margin:10
//     },
//     img:{
//         width:200,
//         height:200
//     },
//     box1:{
//         alignItems:"center"
//     },
//     box2:{
//         paddingHorizontal:40,
//         justifyContent:"space-evenly",
//         height:"50%"
//     }
//  });
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err , setErr] = useState("")
  const userLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      alert('Please fill in all fields');
      setLoading(false);
      return;
    }
    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
    } catch (err) {
        setErr("There Is An Login Error")
    // alert(err)
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.box1}>
        <Text style={styles.text}>Welcome to Whatsapp 5.0</Text>
        <Image style={styles.img} source={require('../assets/wa.png')} />
      </View>
      <View style={styles.box2}>
        <Text style={{ color: 'black', marginLeft: 120 }}>Login Here !</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode="outlined"
          disabled={loading}
        />
        <TextInput
          label="password"
          mode="outlined"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          disabled={loading}
        />

        <Button
          mode="contained"
          onPress={() => userLogin()}
          disabled={!email || !password || loading}
          loading={loading}
        >
          Login
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <Text style={{ textAlign: 'center', color: 'black' }}>
            Don't have an account?
          </Text>
          <Text style={{ textAlign: 'center', color: 'black' }}>
            {err}
          </Text>

        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    color: 'green',
    margin: 10,
  },
  img: {
    width: 200,
    height: 200,
  },
  box1: {
    alignItems: 'center',
  },
  box2: {
    paddingHorizontal: 40,
    justifyContent: 'space-evenly',
    height: '50%',
  },
});
