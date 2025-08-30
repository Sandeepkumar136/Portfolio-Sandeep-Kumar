import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqqOLrb2R73cguRf4GIDhM93Wh7y1da2I",
  authDomain: "blogportfolio-eb969.firebaseapp.com",
  projectId: "blogportfolio-eb969",
  storageBucket: "blogportfolio-eb969.firebasestorage.app",
  messagingSenderId: "354314123678",
  appId: "1:354314123678:web:4cb9bf29c6c7908bfa3e8f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
