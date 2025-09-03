import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function SignInwithGoogle() {
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user already exists in Firestore
      const userRef = doc(db, "Users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          firstName: user.displayName,
          lastName: "",
          photo: user.photoURL,
        });
      }

      toast.success("Google Login Successful");
      window.location.href = "/profile";
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-danger mt-3"
      onClick={handleGoogleSignIn}
    >
      Sign in with Google
    </button>
  );
}

export default SignInwithGoogle;
