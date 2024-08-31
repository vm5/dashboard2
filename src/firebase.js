import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDea0V6owRyS1cS88wN1mv3isV0C_qyI5s",
    authDomain: "nucleusfusion-c0852.firebaseapp.com",
    projectId: "nucleusfusion-c0852",
    storageBucket: "nucleusfusion-c0852.appspot.com",
    messagingSenderId: "621324471038",
    appId: "1:621324471038:web:aa5650b39d9ea358d933af",
    measurementId: "G-09G6YF09H2"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, firebaseSignInWithEmailAndPassword as signInWithEmailAndPassword, firebaseSignOut as signOut };
