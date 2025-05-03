// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBLlof7ysrcX1XW1TkZEHxUWe3E6BMWeWY",
  authDomain: "chatting-21ad1.firebaseapp.com",
  projectId: "chatting-21ad1",
  storageBucket: "chatting-21ad1.firebasestorage.app",
  messagingSenderId: "937972663942",
  appId: "1:937972663942:web:ffbc5bba045b172cca7307"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
