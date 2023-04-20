import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
export default function SignupScreen({ navigation }) {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [showNext, setShowNext] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    // if (loading) {
    //     return <ActivityIndicator size="large" color="#00ff00" />
    // }
    const userSignup = async () => {
        setLoading(true)
        if (!email || !password || !name) {
            alert("please add all the field")
            return
        }
        if (password.length < 6) {
            setError("Password Must Be Greater Than 6 Digits")
        }
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            setError("")
        }


        try {
            const result = await auth().createUserWithEmailAndPassword(email, password)
            firestore().collection('users').doc(result.user.uid).set({
                name: name,
                email: result.user.email,
                uid: result.user.uid,
                // pic:image,
                status: "online"
            })
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setError("something Went Wrong/")
            // setError("error:",err)
            // setError(err)
        }


    }
    const pickImageAndUpload = () => {
        launchImageLibrary({ quality: 0.5 }, (fileobj) => {

            const uploadTask = storage().ref().child(`/userprofile/${Date.now()}`).putFile(fileobj.uri)
            uploadTask.on('state_changed',
                (snapshot) => {

                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (progress == 100) alert('image uploaded')

                },
                (error) => {
                    alert("error uploading image")
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        setImage(downloadURL)
                    });
                }
            );
        })
    }
    return (
        <KeyboardAvoidingView behavior="position">
            <View style={styles.box1}>
                <Text style={styles.text}>Welcome to Whatsapp 5.0</Text>
                <Image style={styles.img} source={require('../assets/wa.png')} />
            </View>
            <View style={styles.box2}>
                <Text style={{color:'black',marginLeft:120}}>Signup Here !</Text>

                {!showNext &&
                    <>
                    <View style={{marginTop:20}}>
                        <TextInput
                            label="Email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            mode="outlined"
                            placeholder='test@gmail.com'
                            disabled={loading}
                            />
                        </View>
                        <View style={{marginTop:40}}>
                        <TextInput
                            label="password"
                            mode="outlined"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry
                            disabled={loading}
                            />
                        <Text style={{color:'black'}}>Password Must Be Greater Than 6digits</Text>
                        </View>
                        <View style={{marginTop:40}}>
                        <TextInput
                            label="Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                            mode="outlined"
                            disabled={loading}
                            />
                        </View>
                        <View style={{marginTop:40}}>
                        {loading ? <ActivityIndicator size="large" color="#00ff00" /> :  <Button
                            mode="contained"
                            disabled={!email || !password || !name ||password.length<6 || loading || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) }
                            // disabled={image?false:true}
                            onPress={() => userSignup()}
                        >Signup</Button>  }
                        </View>
                    </>
                }
            
                <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{ textAlign: "center", color: 'black',marginTop:20 }}>Already have an account ?</Text></TouchableOpacity>
                <Text style={{color:'black', display:'flex', alignItems:'center' , marginTop:20, marginLeft:100}}>{error}</Text>
                
            </View>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        color: "green",
        margin: 10
    },
    img: {
        width: 200,
        height: 200
    },
    box1: {
        alignItems: "center"
    },
    box2: {
        paddingHorizontal: 40,
        justifyContent: "space-evenly",
        height: "50%"
    }
});