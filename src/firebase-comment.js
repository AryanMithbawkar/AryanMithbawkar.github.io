import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3Yi9HGi6q1mff0YVv_78rFS2ZSA0bMxs",
  authDomain: "aronportfolio-a0a8c.firebaseapp.com",
  projectId: "aronportfolio-a0a8c",
  storageBucket: "aronportfolio-a0a8c.firebasestorage.app",
  messagingSenderId: "1061628617973",
  appId: "1:1061628617973:web:3a0402d5af485e8a3411bc",
  measurementId: "G-EEFVNJD2GC"
  };

// Initialize with a unique name
const app = initializeApp(firebaseConfig, 'aronportfolio');
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };