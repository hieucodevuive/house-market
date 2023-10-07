// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj798NdeR61hKect1El9U2xs89QWwi62k",
  authDomain: "house-market-35549.firebaseapp.com",
  projectId: "house-market-35549",
  storageBucket: "house-market-35549.appspot.com",
  messagingSenderId: "783725936944",
  appId: "1:783725936944:web:00b516f7e1cdfec97a08f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();