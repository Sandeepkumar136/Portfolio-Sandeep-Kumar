// src/components/Auth/Register.jsx
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, authDb } from "./firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom"; // Import Link

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // 1. Create user
      // Get user from the returned userCredential
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Save user data to Firestore
      if (user) {
        await setDoc(doc(authDb, "Users", user.uid), {
          email: user.email,
          firstName: fname, // This 'fname' now matches 'data.firstName' in Navbar
          lastName: lname,
          photo: "", // Default photo
        });
      }
      
      // 3. Notify and navigate
      toast.success("User Registered Successfully!!", { position: "top-center" });
      navigate("/"); // Navigate to home or profile after signup
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h3>Sign Up</h3>
      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered? <Link to="/login">Login</Link> {/* Use Link here */}
      </p>
    </form>
  );
}

export default Register;