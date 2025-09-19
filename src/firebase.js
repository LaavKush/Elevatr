// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBL-N3hNe4MAfgXFhB7kSPdN_08bO-0H3o",
  authDomain: "elevatr-ad340.firebaseapp.com",
  projectId: "elevatr-ad340",
  storageBucket: "elevatr-ad340.firebasestorage.app",
  messagingSenderId: "183482711018",
  appId: "1:183482711018:web:bb972454d6ade315749093",
  measurementId: "G-305J6YXGC8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
