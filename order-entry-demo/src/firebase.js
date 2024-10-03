// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore'; // Updated import

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6oiW1sIUth9QVuIJpb67Vn8h0VaRrUew",
  authDomain: "pos-systems-c3aef.firebaseapp.com",
  projectId: "pos-systems-c3aef",
  storageBucket: "pos-systems-c3aef.appspot.com",
  messagingSenderId: "214566462367",
  appId: "1:214566462367:web:6a6965a2879bc5bf0693aa",
  measurementId: "G-YT8LYP0G0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app); // Updated Firestore initialization

export { db };