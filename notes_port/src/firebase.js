import firebase from 'firebase/compat/app'; // For Firebase 9.x compatibility mode
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAZbrMm0lHELEM0uTkEyoSTUk7rTfuVqHs",
    authDomain: "fir-ologi.firebaseapp.com",
    projectId: "fir-ologi",
    storageBucket: "fir-ologi.appspot.com",
    messagingSenderId: "691465790967",
    appId: "1:691465790967:web:e60ce9f9078d96d2a2faf2",
    databaseURL: "https://fir-ologi-default-rtdb.firebaseio.com",
    measurementId: "G-MGB84Q7K2F"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firestore
//const firestore = app.firestore();

// Optionally, enable offline persistence
//firestore.enablePersistence().catch(err => {
//  console.error('Firestore persistence error:', err);
//});

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export default firebase;