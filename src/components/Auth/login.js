// src/components/Auth/login.jsx
import React, { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Complete redirect flow if used as fallback
  useEffect(() => {
    let mounted = true;
    getRedirectResult(auth)
      .then((result) => {
        if (!mounted) return;
        if (result?.user) {
          toast.success("Logged in with Google");
          navigate("/profile", { replace: true });
        }
      })
      .catch((error) => {
        if (!mounted) return;
        if (error?.message) toast.error(error.message);
      });
    return () => {
      mounted = false;
    };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in successfully", { position: "top-center" });
      navigate("/profile", { replace: true });
    } catch (error) {
      toast.error(error.message || "Login failed", { position: "bottom-center" });
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Enter your email first");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset link sent to your email");
    } catch (error) {
      toast.error(error.message || "Reset failed");
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Try popup first
      await signInWithPopup(auth, provider);
      toast.success("Logged in with Google");
      navigate("/profile", { replace: true });
    } catch (error) {
      // Common fallback for popup-blocked or some mobile browsers
      if (
        error?.code === "auth/popup-blocked" ||
        error?.code === "auth/popup-closed-by-user"
      ) {
        try {
          await signInWithRedirect(auth, provider);
        } catch (redirErr) {
          toast.error(redirErr?.message || "Google sign-in failed (redirect)");
        }
      } else if (error?.code === "auth/account-exists-with-different-credential") {
        toast.error(
          "Account exists with different sign-in method. Use the original provider."
        );
      } else {
        toast.error(error?.message || "Google sign-in failed");
      }
    }
  };

  // Motion variants and interaction presets
  const containerVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  };

  const buttonHover = { scale: 1.04, boxShadow: "0 6px 18px rgba(0,0,0,0.08)" };
  const buttonTap = { scale: 0.97 };

  const inputFocus = {
    scale: 1.01,
    boxShadow: "0 0 0 3px rgba(66,153,225,0.45)",
    borderColor: "rgba(66,153,225,1)",
    transition: { type: "spring", stiffness: 400, damping: 28 },
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="fl-container-wrap">
        <AnimatePresence initial={false}>
          <motion.form
            className="fl-container"
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.h3 className="fl-heading" variants={itemVariants}>
              Login
            </motion.h3>

            <motion.div className="fl-inp-l-wrap" variants={itemVariants}>
              <label>Email address</label>
              <motion.input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                whileFocus={inputFocus}
                // baseline style ensures smooth transition in/out of focus
                style={{
                  border: "1px solid var(--border-color, #ced4da)",
                  outline: "none",
                }}
              />
            </motion.div>

            <motion.div className="fl-inp-l-wrap" variants={itemVariants}>
              <label>Password</label>
              <motion.input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                whileFocus={inputFocus}
                style={{
                  border: "1px solid var(--border-color, #ced4da)",
                  outline: "none",
                }}
              />
            </motion.div>

            <motion.div className="fl-u-btn-contain" variants={itemVariants}>
              <motion.button
                type="submit"
                className="btn-m-fl"
                whileHover={buttonHover}
                whileTap={buttonTap}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
              >
                Login
              </motion.button>
            </motion.div>

            <motion.div className="fl-m-contain" variants={itemVariants}>
              <motion.button
                type="button"
                className="btn btn-link"
                onClick={handleForgotPassword}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.12 }}
              >
                Forgot Password?
              </motion.button>

              <motion.button
                type="button"
                className="btn btn-outline-dark"
                onClick={handleGoogleSignIn}
                whileHover={buttonHover}
                whileTap={buttonTap}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <span className="text-g-b">Login with</span>
                <i className="bx bxl-google" aria-hidden="true"></i>
              </motion.button>
            </motion.div>

            <motion.p className="fl-b-text" variants={itemVariants}>
              New user? <a href="/register">Register Here</a>
            </motion.p>
          </motion.form>
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

export default Login;
