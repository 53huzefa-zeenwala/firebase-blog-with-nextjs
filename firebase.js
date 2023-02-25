// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW27bufkOmGiwHEtC9KuWf9Fwwe_qXUds",
  authDomain: "blog-with-nextjs.firebaseapp.com",
  projectId: "blog-with-nextjs",
  storageBucket: "blog-with-nextjs.appspot.com",
  messagingSenderId: "610612280225",
  appId: "1:610612280225:web:1141f44df084090a80e9e0",
  measurementId: "G-7PSBBT673B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)