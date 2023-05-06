

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // TODO: Replace the following with your app's Firebase project configuration
// // See: https://support.google.com/firebase/answer/7015592
//  const firebaseConfig = {
//     apiKey: "AIzaSyC4hh7tbxOvEWjeZ5e_uCYjaPu1mbnspeE",
//   authDomain: "assignment-6-f146b.firebaseapp.com",
//   databaseURL: "https://assignment-6-f146b-default-rtdb.firebaseio.com",
//   projectId: "assignment-6-f146b",
//   storageBucket: "assignment-6-f146b.appspot.com",
//   messagingSenderId: "271710536494",
//   appId: "1:271710536494:web:9766f8a01099b27b29f0bf",
//   measurementId: "G-MCXDH4542L"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);


// // Initialize Cloud Firestore and get a reference to the service
// export const auth = getAuth()
// export const db = getFirestore();
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import Constants from 'expo-constants';
// Firebase config
 const firebaseConfig = {
    apiKey: "AIzaSyC4hh7tbxOvEWjeZ5e_uCYjaPu1mbnspeE",
  authDomain: "assignment-6-f146b.firebaseapp.com",
  databaseURL: "https://assignment-6-f146b-default-rtdb.firebaseio.com",
  projectId: "assignment-6-f146b",
  storageBucket: "assignment-6-f146b.appspot.com",
  messagingSenderId: "271710536494",
  appId: "1:271710536494:web:9766f8a01099b27b29f0bf",
  measurementId: "G-MCXDH4542L"
};
// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();