// utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbsaWyZsAZG4bTI8xYhlbWuwTphYdIXwo",
  authDomain: "elevatr-bf4f0.firebaseapp.com",
  projectId: "elevatr-bf4f0",
  storageBucket: "elevatr-bf4f0.firebasestorage.app",
  messagingSenderId: "852701859709",
  appId: "1:852701859709:web:f4cb329f147c19102ec614",
  measurementId: "G-EYW1PN5SD2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services you need
export const auth = getAuth(app);               // 🔹 Auth instance
export const googleProvider = new GoogleAuthProvider(); // 🔹 Google Auth
export const db = getFirestore(app);           // 🔹 Firestore DB
