import React, { useState, useEffect } from "react";

const ProtectedComponent = () => (
  <div>
    <h2>🎉 You’re in!</h2>
    <p>This is the restricted content.</p>
  </div>
);

const Resume = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(""); // 🆕 Track error message
  const [isShowNotice, setIsShowNotice] = useState(false);

  const validUsername = "admin";
  const validPassword = "1234";

  // On mount, check sessionStorage
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isAuthenticated");
    if (loggedIn) setIsAuthenticated(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === validUsername && password === validPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("isAuthenticated", "true"); // persists until browser close
      setError(""); // clear any previous error
    } else {
      setError("Please Enter Valid Credentials"); // set error
    }
  };

  const handleNotice = () => {
    setIsShowNotice(!isShowNotice);
  };

  return isAuthenticated ? (
    <ProtectedComponent />
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
      <div className={`pro-notice-card ${isShowNotice ? "close" : ""}`}>
        <div className="p-n-c-heading-contain">
          <h3 className="heading-p-n-c">No Peeking, No Sneaking</h3>
          <button type="button" onClick={handleNotice} className="p-n-c-btn">
            <i className="icon-p-n-c bx bx-x"></i>
          </button>
        </div>
        <p className="text-p-n-c">
          Members only beyond this point. Login to unlock the magic. Need
          access? <span className="p-highlight">Ping</span> the{" "}
          <span className="p-highlight">gatekeeper.</span>
        </p>
      </div>
      <div className="p-l-pro-wrap">
        <div className="p-l-contain">
          {error && <div className="err-pro">{error}</div>}
          <form onSubmit={handleLogin}>
              <h4 className="heading-p-l">Login</h4>
            <div className="pro-m-wrap">
              <div className="p-l-l-wrap">
                <label htmlFor="text" className="lbl-p-l">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="p-l-l-wrap">
                <label htmlFor="password" className="lbl-p-l">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="pro-s-btn" type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Resume;
