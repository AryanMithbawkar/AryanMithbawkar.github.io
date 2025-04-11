import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs } from "@firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3Yi9HGi6q1mff0YVv_78rFS2ZSA0bMxs",
  authDomain: "aronportfolio-a0a8c.firebaseapp.com",
  projectId: "aronportfolio-a0a8c",
  storageBucket: "aronportfolio-a0a8c.firebasestorage.app",
  messagingSenderId: "1061628617973",
  appId: "1:1061628617973:web:3a0402d5af485e8a3411bc",
  measurementId: "G-EEFVNJD2GC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, collection, addDoc };
