import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResumeContain from "../contents/ResumeContain";


const Resume = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [isShowNotice, setIsShowNotice] = useState(false);

  const validUsername = process.env.REACT_APP_USERNAME;
  const validPassword = process.env.REACT_APP_PASSWORD;

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isAuthenticated");
    if (loggedIn) setIsAuthenticated(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === validUsername && password === validPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("isAuthenticated", "true");
      setError("");
    } else {
      setError("Please Enter Valid Credentials");
    }
  };

  const handleNotice = () => {
    setIsShowNotice(!isShowNotice);
  };

  return isAuthenticated ? (
    <ResumeContain />
  ) : (
    <div className="pro-container">
      <div className="pro-heading-contain">
        <h3 className="heading-pro">Precision Meets Creativity.</h3>
        <h6 className="subtitle-pro">
          Transforming complex ideas into{" "}
          <span className="p-highlight">seamless</span>, engaging, and{" "}
          <span className="p-highlight">impactful</span> user experiences.
        </h6>
      </div>

      {/* Notice Card Animation */}
      <AnimatePresence>
        {!isShowNotice && (
          <motion.div
            className="pro-notice-card"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="p-n-c-heading-contain">
              <h3 className="heading-p-n-c">No Peeking, No Sneaking</h3>
              <button
                type="button"
                onClick={handleNotice}
                className="p-n-c-btn"
              >
                <i className="icon-p-n-c bx bx-x"></i>
              </button>
            </div>
            <p className="text-p-n-c">
              Members only beyond this point. Login to unlock the magic. Need
              access? <span className="p-highlight">Ping</span> the{" "}
              <span className="p-highlight">gatekeeper.</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="p-l-pro-wrap"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="p-l-contain">
          {/* Error Alert Animation */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="err-pro"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                key="error"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Animation */}
          <motion.form
            onSubmit={handleLogin}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="heading-p-l">Login</h4>
            <div className="pro-m-wrap">
              <div className="p-l-l-wrap">
                <label htmlFor="text" className="lbl-p-l">
                  Username
                </label>
                <motion.input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-underline"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              <div className="p-l-l-wrap">
                <label htmlFor="password" className="lbl-p-l">
                  Password
                </label>
                <motion.input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-underline"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              <motion.button
                className="pro-s-btn"
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Resume;
