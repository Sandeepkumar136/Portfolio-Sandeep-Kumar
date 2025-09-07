// src/components/Navbar.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { auth, authDb } from "../Auth/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { deleteUser, onAuthStateChanged } from "firebase/auth";
import { useDarkMode } from "../context/DarkModeContext";

const Navbar = () => {
  // DROPDOWNS / SIDEBAR STATE
  const [isOpen, setIsOpen] = useState(false);      // top-right account menu
  const [isNdOpen, setIsNdOpen] = useState(false);  // navbar "Snapshot" dropdown
  const [isSdOpen, setIsSdOpen] = useState(false);  // sidebar "Snapshot" dropdown
  const [isAOpen, setIsAOpen] = useState(false);    // sidebar "Account" dropdown
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const MotionLink = motion(Link);

  // AUTH STATE FOR NAVBAR/SIDEBAR
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  // Toggle handlers
  const toggleNdBtn = useCallback(() => setIsNdOpen((v) => !v), []);
  const toggleDropdown = useCallback(() => setIsOpen((v) => !v), []);
  const toggleSdBtn = useCallback(() => setIsSdOpen((v) => !v), []);
  const toggleABtn = useCallback(() => setIsAOpen((v) => !v), []);
  const toggleSidebarBtn = useCallback(() => setSidebarOpen((v) => !v), []);

  // Subscribe to Firebase auth; fetch optional profile fields from Firestore
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const snap = await getDoc(doc(authDb, "Users", fbUser.uid));
          const data = snap.exists() ? snap.data() : {};
          setAuthUser({
            name: data.firstName || fbUser.displayName || "User",
            photo: fbUser.photoURL || data.photo || "",
            email: fbUser.email || "",
          });
        } catch {
          setAuthUser({
            name: fbUser.displayName || "User",
            photo: fbUser.photoURL || "",
            email: fbUser.email || "",
          });
        }
      } else {
        setAuthUser(null);
      }
    });
    return () => unsub();
  }, []);

  // Framer Motion variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -8,
      scale: 0.98,
      pointerEvents: "none",
      transition: { duration: 0.15, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      pointerEvents: "auto",
      transition: {
        duration: 0.2,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.04,
        delayChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -4 },
    open: { opacity: 1, y: 0, transition: { duration: 0.18 } },
  };

  const sidebarVariants = {
    closed: { x: "100%", opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.03,
        delayChildren: 0.05,
      },
    },
  };

  const chevronRotate = (open) => ({
    rotate: open ? 180 : 0,
    transition: { duration: 0.2, ease: "easeOut" },
  });

  const buttonTap = { scale: 0.98, transition: { duration: 0.06 } };
  const buttonHover = { scale: 1.02, transition: { duration: 0.12 } };

  const isLoggedIn = !!authUser;
  const isGoogleUser = !!auth.currentUser?.providerData?.some(
    (p) => p.providerId === "google.com"
  );

  // Handlers
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (err) {
      alert(err?.message || "Logout failed");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (!auth.currentUser) return;
      await deleteUser(auth.currentUser);
      alert("Account deleted");
      navigate("/login");
    } catch (err) {
      if (err?.code === "auth/requires-recent-login") {
        alert("Please re-authenticate to delete your account.");
        navigate("/login?reauth=1");
      } else {
        alert(err?.message || "Delete failed");
      }
    }
  };

  const handleChangePassword = () => {
    // Navigate to a screen hosting <ChangePassword/> for email/password users
    navigate("/profile");
  };

  return (
    <div className="navigation">
      <nav className="navbar">
        <div className="nav-r-contain">
          <Link to="/" className="nav-logo">
            <i className="bx bx-code-alt"></i>
            <span className="nav-title">Codewith Sanju</span>
          </Link>

          <ul className="nav-links">
            <Link to="/services" className="nav-contain">services</Link>
            <Link to="/books" className="nav-contain">books</Link>
            <Link to="/projects" className="nav-contain">projects</Link>
            <Link to="/blog" className="nav-contain">blogs</Link>

            {/* Snapshot dropdown */}
            <div className="n-d-d-btn-contain">
              <motion.button
                className="nav-dropdown-btn"
                whileHover={buttonHover}
                whileTap={buttonTap}
                onClick={toggleNdBtn}
                aria-expanded={isNdOpen}
                aria-haspopup="menu"
              >
                <div className="n-d-d-heading">Snapshot</div>
                <motion.i
                  className="bx bx-chevron-down n-d-d-icon"
                  animate={chevronRotate(isNdOpen)}
                />
              </motion.button>

              <AnimatePresence initial={false}>
                {isNdOpen && (
                  <motion.ul
                    className="n-d-item-contain"
                    key="nav-snapshot"
                    variants={menuVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    style={{ transformOrigin: "top center" }}
                    role="menu"
                  >
                    <MotionLink
                      onClick={() => setIsNdOpen(false)}
                      to="/manifesto"
                      className="n-d-links"
                      variants={itemVariants}
                      role="menuitem"
                    >
                      manifesto
                    </MotionLink>
                    <MotionLink
                      onClick={() => setIsNdOpen(false)}
                      to="/achievements"
                      className="n-d-links"
                      variants={itemVariants}
                      role="menuitem"
                    >
                      achievements
                    </MotionLink>
                    <MotionLink
                      onClick={() => setIsNdOpen(false)}
                      to="/resume"
                      className="n-d-links"
                      variants={itemVariants}
                      role="menuitem"
                    >
                      resume
                    </MotionLink>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </ul>
        </div>

        <div className="nav-l-contain">
          <ul className="nav-side-links">
            <Link to="/fordev" className="nav-s-contain">for dev</Link>
            <Link to="/about" className="nav-s-contain">about</Link>

            {/* Account (top-right) */}
            <li className="nav-s-drop-btn-c">
              {isLoggedIn ? (
                <>
                  <motion.button
                    className="dropdown-btn-n"
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                    onClick={toggleDropdown}
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                  >
                    <>
                      <div className="user-p-logo-n">
                        {authUser.photo ? (
                          <img
                            src={authUser.photo}
                            alt="Profile"
                            width="28"
                            height="28"
                            style={{ borderRadius: "50%", objectFit: "cover" }}
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <i className="bx bx-user n-db-u-img"></i>
                        )}
                      </div>
                      <span className="user-name-n">{authUser.name}</span>
                    </>
                    <motion.i
                      className="bx bx-chevron-down btn-s-n-db"
                      animate={chevronRotate(isOpen)}
                    />
                  </motion.button>

                  <AnimatePresence initial={false} mode="wait">
                    {isOpen && (
                      <motion.div
                        className="drop-content-n"
                        key="account-menu"
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        style={{ transformOrigin: "top center" }}
                        role="menu"
                      >
                        <motion.ul className="btn-s-n-db-c">
                          {!isGoogleUser && (
                            <motion.li
                              className="btn-s-n-item-db"
                              variants={itemVariants}
                              onClick={() => {
                                handleChangePassword();
                                setIsOpen(false);
                              }}
                              role="menuitem"
                            >
                              change password
                            </motion.li>
                          )}
                          <motion.li
                            className="btn-s-n-item-db"
                            variants={itemVariants}
                            onClick={() => {
                              handleLogout();
                              setIsOpen(false);
                            }}
                            role="menuitem"
                          >
                            logout
                          </motion.li>
                          <motion.li
                            className="btn-s-n-item-db"
                            variants={itemVariants}
                            onClick={() => {
                              handleDeleteAccount();
                              setIsOpen(false);
                            }}
                            role="menuitem"
                          >
                            delete account
                          </motion.li>
                        </motion.ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link to="/login" className="user-name-n" onClick={toggleSidebarBtn}>
                  Login
                </Link>
              )}
            </li>
          </ul>

          <ul className="toogle-btns-contain-n">
            <button className="t-b-c-nav" aria-label="toggle theme">
              <i onClick={toggleDarkMode} className={`bx bx-${darkMode ? "moon" : "sun"}`}></i>
            </button>
            <button className="t-b-c-nav nav-toggle-btn" aria-label="toggle menu">
              <i
                onClick={toggleSidebarBtn}
                className={`bx ${isSidebarOpen ? "bx-x" : "bx-menu"}`}
              ></i>
            </button>
          </ul>
        </div>
      </nav>

      {/* Sidebar with motion + exit animation */}
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.aside
            key="sidebar"
            className="sidebar open"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            aria-label="Sidebar"
          >
            <div className="s-user-contain">
              {isLoggedIn ? (
                <>
                  <div className="side-logo">
                    {authUser.photo ? (
                      <img
                        src={authUser.photo}
                        alt="Profile"
                        width="40"
                        height="40"
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <i className="bx bx-user"></i>
                    )}
                  </div>
                  <span className="side-username">{authUser.name}</span>
                </>
              ) : (
                <Link onClick={toggleSidebarBtn} to="/login" className="side-username">
                  Login
                </Link>
              )}
            </div>

            <motion.ul className="side-contents">
              <MotionLink to="/services" onClick={toggleSidebarBtn} className="side-items" variants={itemVariants}>
                <i className="side-c-icon bx bx-devices"></i>
                <span className="side-c-title">services</span>
              </MotionLink>
              <MotionLink to="/books" onClick={toggleSidebarBtn} className="side-items" variants={itemVariants}>
                <i className="side-c-icon bx bx-book-open"></i>
                <span className="side-c-title">books</span>
              </MotionLink>
              <MotionLink to="/projects" onClick={toggleSidebarBtn} className="side-items" variants={itemVariants}>
                <i className="side-c-icon bx bx-layers"></i>
                <span className="side-c-title">projects</span>
              </MotionLink>
              <MotionLink to="/blog" onClick={toggleSidebarBtn} className="side-items" variants={itemVariants}>
                <i className="side-c-icon bx bx-comment"></i>
                <span className="side-c-title">blogs</span>
              </MotionLink>

              {/* Sidebar Snapshot dropdown */}
              <div className="side-c-drop-container">
                <motion.button
                  className="side-c-drop-btn"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  onClick={toggleSdBtn}
                  aria-expanded={isSdOpen}
                  aria-controls="sidebar-snapshot-menu"
                >
                  <div className="side-c-title-db">
                    <i className="bx bx-dots-horizontal-rounded"></i>
                    <span className="side-inner-db-title">snapshot</span>
                  </div>
                  <motion.i
                    className="side-c-db-btn bx bx-chevron-down"
                    animate={chevronRotate(isSdOpen)}
                  />
                </motion.button>

                <AnimatePresence initial={false}>
                  {isSdOpen && (
                    <motion.ul
                      id="sidebar-snapshot-menu"
                      className="side-s-d-contain"
                      key="side-snapshot"
                      variants={menuVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      style={{ transformOrigin: "top center" }}
                      role="menu"
                    >
                      <MotionLink onClick={toggleSidebarBtn} to="/manifesto" className="side-s-links" variants={itemVariants} role="menuitem">
                        <i className="bx bx-bulb"></i>
                        <span className="side-s-title">manifesto</span>
                      </MotionLink>
                      <MotionLink onClick={toggleSidebarBtn} to="/achievements" className="side-s-links" variants={itemVariants} role="menuitem">
                        <i className="bx bx-trophy"></i>
                        <span className="side-s-title">achievements</span>
                      </MotionLink>
                      <MotionLink onClick={toggleSidebarBtn} to="/resume" className="side-s-links" variants={itemVariants} role="menuitem">
                        <i className="bx bx-id-card"></i>
                        <span className="side-s-title">resume</span>
                      </MotionLink>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              <MotionLink onClick={toggleSidebarBtn} to="/fordev" className="side-items" variants={itemVariants}>
                <i className="side-c-icon bx bx-code-alt"></i>
                <span className="side-c-title">for dev</span>
              </MotionLink>
              <MotionLink onClick={toggleSidebarBtn} to="/about" className="side-items" variants={itemVariants}>
                <i className="side-c-icon bx bx-info-circle"></i>
                <span className="side-c-title">about</span>
              </MotionLink>

              {/* Sidebar Account dropdown — only when logged in */}
              {isLoggedIn && (
                <div className="side-c-drop-container">
                  <motion.button
                    className="side-c-drop-btn"
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                    onClick={toggleABtn}
                    aria-expanded={isAOpen}
                    aria-controls="sidebar-account-menu"
                  >
                    <div className="side-c-title-db">
                      <i className="bx bx-cog"></i>
                      <span className="side-inner-db-title">Account</span>
                    </div>
                    <motion.i
                      className="side-c-db-btn bx bx-chevron-down"
                      animate={chevronRotate(isAOpen)}
                    />
                  </motion.button>

                  <AnimatePresence initial={false}>
                    {isAOpen && (
                      <motion.ul
                        id="sidebar-account-menu"
                        className="side-s-d-contain"
                        key="side-account"
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        style={{ transformOrigin: "top center" }}
                        role="menu"
                      >
                        {!isGoogleUser && (
                          <motion.li
                            className="side-s-links"
                            variants={itemVariants}
                            onClick={() => {
                              handleChangePassword();
                              setIsAOpen(false);
                            }}
                            role="menuitem"
                          >
                            <i className="bx bx-lock-alt"></i>
                            <span className="side-s-title">Change Password</span>
                          </motion.li>
                        )}

                        <motion.li
                          className="side-s-links"
                          variants={itemVariants}
                          onClick={() => {
                            handleLogout();
                            setIsAOpen(false);
                          }}
                          role="menuitem"
                        >
                          <i className="bx bx-log-out"></i>
                          <span className="side-s-title">Logout</span>
                        </motion.li>

                        <motion.li
                          className="side-s-links"
                          variants={itemVariants}
                          onClick={() => {
                            handleDeleteAccount();
                            setIsAOpen(false);
                          }}
                          role="menuitem"
                        >
                          <i className="bx bx-user-x"></i>
                          <span className="side-s-title">Delete Account</span>
                        </motion.li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
