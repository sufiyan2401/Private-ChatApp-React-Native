// // import React, { useEffect, useState } from 'react'
// // import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native'
// // import firestore from '@react-native-firebase/firestore'
// // import Feather from 'react-native-vector-icons/Feather'
// // import { Button } from 'react-native-paper'
// // import auth from '@react-native-firebase/auth'

// // export default function AccountScreen({ user }) {
// //     const [profile, setProfile] = useState('')

// //     useEffect(() => {
// //         firestore().collection('users').doc(user.uid).get().then(docSnap => {
// //             setProfile(docSnap.data())
// //         })
// //     }, [])
// //     if (!profile) {
// //         return <ActivityIndicator size="large" color="#00ff00" />
// //     }
// //     return (
// //         <View style={styles.container}>
// //             {/* <Image style={styles.img} source={{uri:profile.pic}} /> */}
// //             <Text style={styles.text}>Name - {profile.uid}</Text>
// //             <View style={{ flexDirection: "row" }}>
// //                 <Feather name="mail" size={30} color="white" />
// //                 <Text style={[styles.text, { marginLeft: 10 }]}>{profile.email}</Text>
// //             </View>
// //             <Button
// //                 style={styles.btn}
// //                 mode="contained"
// //                 onPress={() => {
// //                     firestore().collection('users')
// //                         .doc(user.uid)
// //                         .update({
// //                             status: firestore.FieldValue.serverTimestamp()
// //                         }).then(() => {
// //                             auth().signOut()
// //                         })
// //                 }}
// //             >Logout</Button>
// //         </View>
// //     )
// // }


// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         backgroundColor: "black",
// //         alignItems: "center",
// //         justifyContent: "space-evenly"
// //     },
// //     img: {
// //         width: 200,
// //         height: 200,
// //         borderRadius: 100,
// //         borderWidth: 3,
// //         borderColor: "white"
// //     },
// //     text: {
// //         fontSize: 23,
// //         color: "white"
// //     },
// //     btn: {
// //         borderColor: "white",
// //         backgroundColor: 'black',
// //         borderWidth: 3
// //     }
// // })
// import React, { useEffect, useState } from 'react'
// import firestore from '@react-native-firebase/firestore'
// import Feather from 'react-native-vector-icons/Feather'
// import auth from '@react-native-firebase/auth'
// import { View, Image, Modal, TextInput,ActivityIndicator, StyleSheet, } from 'react-native';
// import { Avatar, Button, Text } from 'react-native-paper';

// const AccountScreen = ({user}) => {
//     const [modalVisible, setModalVisible] = useState(false);
//     const [name, setName] = useState('');
//     const [bio, setBio] = useState('');
//     const [profile, setProfile] = useState('')

//         useEffect(() => {
//             firestore().collection('users').doc(user.uid).get().then(docSnap => {
//                 setProfile(docSnap.data())
//             })
//         }, [])
//         if (!profile) {
//             return <ActivityIndicator size="large" color="#00ff00" />
//         }
//     const handleSaveProfile = () => {
//         // Perform the save action with the name and bio values
//         console.log('Name:', name);
//         console.log('Bio:', bio);

//         // Close the modal and reset the input values
//         setModalVisible(false);
//         setName('');
//         setBio('');
//     };

//     return (
//         <>
//             <View style={styles.container}>
//                 <Image source={require('../assets/wa.png')} style={styles.image} />
//             </View>

//             <Text variant="titleMedium" style={styles.black}>
//                 Name :
//             </Text>
//             <Text variant="displayMedium" style={styles.black}>
//                 {profile.name}
//             </Text>
//             <Text>{'\n'}</Text>
//             <Text variant="titleMedium" style={styles.black}>
//                 Bio :
//             </Text>
//             <Text variant="displayMedium" style={styles.black}>
//                 {
//                     profile.bio
//                 }
//             </Text>
//             <Text>{'\n'}</Text>
//             <Button
//                 icon="camera"
//                 mode="contained"
//                 onPress={() => setModalVisible(true)}
//             >
//                 Edit Profile
//             </Button>
//             <Text>{'\n'}</Text>
//             <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
//                 Logout
//             </Button>

//             <Modal visible={modalVisible} animationType="slide">
//                 <View style={styles.modalContainer}>
//                     <Text style={styles.modalTitle}>Edit Profile</Text>
//                     <Text variant="titleMedium" style={styles.black}>
//                         Name :
//                     </Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Enter name"
//                         value={name}
//                         onChangeText={(text) => setName(text)}
//                     />
//                       <Text variant="titleMedium" style={styles.black}>
//                 Bio :
//             </Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Enter bio"
//                         value={bio}
//                         onChangeText={(text) => setBio(text)}
//                     />
//                     <Button
//                         icon="content-save"
//                         mode="contained"
//                         onPress={handleSaveProfile}
//                     >
//                         Save
//                     </Button>
//                     <Text>{'\n'}</Text>
//                     <Button
//                         icon="close"
//                         mode="contained"
//                         onPress={() => {
//                             setModalVisible(false);
//                             setName('');
//                             setBio('');
//                         }}
//                     >
//                         Cancel
//                     </Button>
//                 </View>
//             </Modal>
//         </>
//     );
// };

// export default AccountScreen;

// const styles = StyleSheet.create({
//     black: {
//         color: 'black',
//     },
//     container: {
//         width: 150,
//         height: 150,
//         borderRadius: 75,
//         overflow: 'hidden',
//     },
//     image: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: 150,
//         height: 150,
//         borderRadius: 75,
//         borderWidth: 3,
//         borderColor: 'white',
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     input: {
//         color:'black',
//         width: '80%',
//         height: 40,
//         backgroundColor: 'white',
//         marginBottom: 10,
//         paddingHorizontal: 10,
//     },
// });

import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import { View, Image, Modal, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper';

const AccountScreen = ({ user }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profile, setProfile] = useState('');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot((docSnap) => {
        setProfile(docSnap.data());
      });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (!profile) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  const handleSaveProfile = () => {
    // Perform the save action with the modified name and bio values
    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        name: name, // New value for the name field
        bio: bio, // New value for the bio field
      })
      .then(() => {
        console.warn('Document updated successfully');
      })
      .catch((error) => {
        console.warn('Error updating document:', error);
      });

    // Close the modal and reset the input values
    setModalVisible(false);
    setName('');
    setBio('');
  };

  return (
    <>
      <View style={styles.container}>
        <Image source={require('../assets/wa.png')} style={styles.image} />
      </View>

      <Text variant="titleMedium" style={styles.black}>
        Name :
      </Text>
      <Text variant="displayMedium" style={styles.black}>
        {profile.name}
      </Text>
      <Text>{'\n'}</Text>
      <Text variant="titleMedium" style={styles.black}>
        Bio :
      </Text>
      <Text variant="displayMedium" style={styles.black}>
        {profile.bio}
      </Text>
      <Text>{'\n'}</Text>
      <Button icon="camera" mode="contained" onPress={() => setModalVisible(true)}>
        Edit Profile
      </Button>
      <Text>{'\n'}</Text>
      <Button icon="camera" mode="contained"onPress={() => {
                    firestore().collection('users')
                        .doc(user.uid)
                        .update({
                            status: firestore.FieldValue.serverTimestamp()
                        }).then(() => {
                            auth().signOut()
                        })
                }}>
        Logout
      </Button>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Profile</Text>
          <Text variant="titleMedium" style={styles.black}>
            Name :
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name || profile.name}
            onChangeText={(text) => setName(text)}
          />
          <Text variant="titleMedium" style={styles.black}>
            Bio :
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter bio"
            value={bio || profile.bio}
            onChangeText={(text) => setBio(text)}
          />
          <Button icon="content-save" mode="contained" onPress={handleSaveProfile} disabled={!name || !bio}>
            Save
          </Button>
          <Text>{'\n'}</Text>
          <Button
            icon="close"
            mode="contained"
            onPress={() => {
              setModalVisible(false);
              setName('');
              setBio('');
            }}
          >
            Cancel
          </Button>
        </View>
      </Modal>
    </>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  black: {
    color: 'black',
  },
  container: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    color: 'black',
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
