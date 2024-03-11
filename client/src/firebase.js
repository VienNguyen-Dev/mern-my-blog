// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-my-blog.firebaseapp.com",
  projectId: "mern-my-blog",
  storageBucket: "mern-my-blog.appspot.com",
  messagingSenderId: "912170904210",
  appId: "1:912170904210:web:a6f1c1bbb42167e1f0d44b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);