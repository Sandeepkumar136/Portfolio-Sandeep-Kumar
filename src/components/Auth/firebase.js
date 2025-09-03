// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhUgAc9mnk2_GMmUJudDC54GWfh6ELtXI",
  authDomain: "login-auth-dc16d.firebaseapp.com",
  projectId: "login-auth-dc16d",
  storageBucket: "login-auth-dc16d.firebasestorage.app",
  messagingSenderId: "637164461921",
  appId: "1:637164461921:web:cada2cb66b6c0bc46cef20",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
