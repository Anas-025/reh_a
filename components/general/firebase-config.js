// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBGGqa8qHWhb_7ygwqL1_NKKHMli4iyK0",
  authDomain: "reh-a-demo1-9efe4.firebaseapp.com",
  projectId: "reh-a-demo1-9efe4",
  storageBucket: "reh-a-demo1-9efe4.appspot.com",
  messagingSenderId: "766229230297",
  appId: "1:766229230297:web:ce56c7247fbe2d737644c8",
  measurementId: "G-VJVWCGZQ4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const fbStorage = getStorage(app);