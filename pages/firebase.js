import React from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/auth";
import {getStorage} from 'firebase/storage';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyC8YMsb8VWYUkjbnBa1ZYTLqjuFYSoORH8",
  authDomain: "puredropauth.firebaseapp.com",
  projectId: "puredropauth",
  storageBucket: "puredropauth.appspot.com",
  messagingSenderId: "527849326434",
  appId: "1:527849326434:web:c0b3a1e97a906127818e3b",
  measurementId: "G-8J1C37TX9F"
};   

// const firebaseConfig = {
//   apiKey: "AIzaSyCYk8jRkvuumhPZyS19EA-_MOkzySqU7Gk",
//   authDomain: "germanyimmigrationportal.firebaseapp.com",
//   projectId: "germanyimmigrationportal",
//   storageBucket: "germanyimmigrationportal.appspot.com",
//   messagingSenderId: "429231427981",
//   appId: "1:429231427981:web:50bcd742d9fa14c30d6dc4",
//   measurementId: "G-KW7SP3KBZ4"
// };




const app = firebase.initializeApp(firebaseConfig)

export const db = app.firestore()

export  const auth = app.auth()

export const storage = getStorage(app)

export const dbauth = getAuth(app)

export const Provider = new firebase.auth.GoogleAuthProvider()


export const apk = firebase.initializeApp(firebaseConfig)






const FirebasePage = () => {
  return (
    <div>
      {/* Your page content here */}
    </div>
  );
};

export default FirebasePage;