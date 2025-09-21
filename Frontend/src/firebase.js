// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBL-N3hNe4MAfgXFhB7kSPdN_08bO-0H3o",
  authDomain: "elevatr-ad340.firebaseapp.com",
  projectId: "elevatr-ad340",
  storageBucket: "elevatr-ad340.firebasestorage.app",
  messagingSenderId: "183482711018",
  appId: "1:183482711018:web:bb972454d6ade315749093",
  measurementId: "G-305J6YXGC8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Helper to get Firebase ID token
export const getFirebaseToken = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.log("⚠️ No user is signed in.");
    return null;
  }
  try {
    const token = await user.getIdToken();
    return token;
  } catch (err) {
    console.error("Error getting Firebase token:", err);
    return null;
  }
};

// Listener for auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ User is signed in.");
    user.getIdToken().then((token) => {
      console.log("✅ Firebase ID Token:", token);
    });
  } else {
    console.log("⚠️ User is signed out.");
  }
});
