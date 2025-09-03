// Import the functions you need from the SDKs
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase project configs
const firebaseConfigs = {
  authProject: {
    apiKey: "AIzaSyBhUgAc9mnk2_GMmUJudDC54GWfh6ELtXI",
    authDomain: "login-auth-dc16d.firebaseapp.com",
    projectId: "login-auth-dc16d",
    storageBucket: "login-auth-dc16d.firebasestorage.app",
    messagingSenderId: "637164461921",
    appId: "1:637164461921:web:cada2cb66b6c0bc46cef20",
  },
  blogProject: {
    apiKey: "AIzaSyAqqOLrb2R73cguRf4GIDhM93Wh7y1da2I",
    authDomain: "blogportfolio-eb969.firebaseapp.com",
    projectId: "blogportfolio-eb969",
    storageBucket: "blogportfolio-eb969.firebasestorage.app",
    messagingSenderId: "354314123678",
    appId: "1:354314123678:web:4cb9bf29c6c7908bfa3e8f",
  },
};

// Initialize Firebase apps (avoid duplicate initialization)
const authApp = !getApps().some(app => app.name === "authApp")
  ? initializeApp(firebaseConfigs.authProject, "authApp")
  : getApp("authApp");

const blogApp = !getApps().some(app => app.name === "blogApp")
  ? initializeApp(firebaseConfigs.blogProject, "blogApp")
  : getApp("blogApp");

// Exports
export const auth = getAuth(authApp);      // For authentication
export const authDb = getFirestore(authApp); // Firestore of auth project
export const blogDb = getFirestore(blogApp); // Firestore of blog project
export default { authApp, blogApp };
