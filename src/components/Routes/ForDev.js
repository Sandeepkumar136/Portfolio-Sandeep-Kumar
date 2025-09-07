import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { blogDb } from "../Auth/firebaseConfig";
import { useCert } from "../context/CertDialogueContext";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDarkMode } from "../context/DarkModeContext";

// Helper: return first 8 words; trimmed; safe on empty
function getExactly8Words(text) {
  const safe = (text || "").trim();
  if (!safe) return "";
  const words = safe.split(/\s+/);
  return words.slice(0, 8).join(" ");
}
function getExactly15Words(text) {
  const safe = (text || "").trim();
  if (!safe) return "";
  const words = safe.split(/\s+/);
  return words.slice(0, 15).join(" ");
}

// Framer Motion helpers
const focusRing = {
  boxShadow: "0 0 0 3px rgba(99,102,241,.35)",
  borderColor: "rgb(99,102,241)",
};
const btnHover = { scale: 1.05, y: -1 };
const btnTap = { scale: 0.97 };

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const dropIn = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 0.2, damping: 24, stiffness: 420 },
  },
  exit: { y: "100vh", opacity: 0 },
};

const ForDev = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [sections, setSections] = useState([]);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const { openCert, closeCert, isCertDialogOpen } = useCert();
  const { darkMode } = useDarkMode();

  const validUsername = (process.env.REACT_APP_BLOG_USERNAME || "").trim();
  const validPassword = (process.env.REACT_APP_BLOG_PASSWORD || "").trim();

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isAuthenticated") === "true";
    if (loggedIn) setIsAuthenticated(true);
  }, []);

  // Load posts list (title, subtitle, date)
  useEffect(() => {
    const postsRef = collection(blogDb, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const rows = snap.docs.map((d) => {
          const data = d.data();
          const ts = data.createdAt;
          const dateStr =
            ts && typeof ts.toDate === "function"
              ? ts.toDate().toLocaleString()
              : "—";
          return {
            id: d.id,
            title: data.title || "",
            subtitle: data.subtitle || "",
            createdAt: ts || null,
            createdAtText: dateStr,
          };
        });
        setPosts(rows);
        setLoadingPosts(false);
      },
      (err) => {
        console.error(err);
        setLoadingPosts(false);
      }
    );
    return () => unsub();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validUsername || !validPassword) {
      setError(
        "Configuration error: missing REACT_APP_BLOG_USERNAME or REACT_APP_BLOG_PASSWORD"
      );
      return;
    }

    const user = username.trim();
    const pass = password.trim();

    if (user === validUsername && pass === validPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("isAuthenticated", "true");
      setError("");
    } else {
      setError("Please Enter Valid Credentials");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    toast.success("Logged out");
  };

  // Add a new empty section
  const addSection = () => {
    setSections((prev) => [...prev, { miniHeadings: [], paragraphs: [] }]);
  };

  // Add mini heading to a section
  const addMiniHeading = (index) => {
    setSections((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        miniHeadings: [...next[index].miniHeadings, ""],
      };
      return next;
    });
  };

  // Add paragraph to a section
  const addParagraph = (index) => {
    setSections((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        paragraphs: [...next[index].paragraphs, ""],
      };
      return next;
    });
  };

  // Update input in section
  const handleSectionChange = (sectionIndex, field, value, itemIndex) => {
    setSections((prev) => {
      const next = [...prev];
      const arr = [...next[sectionIndex][field]];
      arr[itemIndex] = value;
      next[sectionIndex] = { ...next[sectionIndex], [field]: arr };
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optionally strip empty entries to keep data clean
    const cleanedSections = sections.map((s) => ({
      miniHeadings: (s.miniHeadings || []).map((m) => m.trim()).filter(Boolean),
      paragraphs: (s.paragraphs || []).map((p) => p.trim()).filter(Boolean),
    }));

    try {
      await addDoc(collection(blogDb, "posts"), {
        title: title.trim(),
        subtitle: subtitle.trim(),
        sections: cleanedSections,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setSubtitle("");
      setSections([]);
      toast.success("Blog post added!");
    } catch (err) {
      console.error(err);
      toast.error("Error adding post");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(blogDb, "posts", id));
      toast.success("Post deleted");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting post");
    }
  };

  // Gate the editor behind the animated login screen
  if (!isAuthenticated) {
    return (
      <div className="pro-container">
        {/* Toasts available in unauthenticated view */}
        <ToastContainer
          position="top-right"
          autoClose={3500}
          theme={darkMode ? "dark" : "light"}
        />

        <div className="pro-heading-contain">
          <h3 className="heading-pro">Precision Meets Creativity.</h3>
          <h6 className="subtitle-pro">
            Transforming complex ideas into{" "}
            <span className="p-highlight">seamless</span>, engaging, and{" "}
            <span className="p-highlight">impactful</span> user experiences.
          </h6>
        </div>
        <div className="p-l-pro-wrap">
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

          {/* Login Form Animation */}
          <motion.form
            onSubmit={handleLogin}
            className="p-l-contain"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="heading-p-l">Login</h4>
            <div className="pro-m-wrap">
              <div className="p-l-l-wrap">
                <label htmlFor="username" className="lbl-p-l">
                  Username
                </label>
                <motion.input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-underline"
                  whileFocus={focusRing}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                />
              </div>
              <div className="p-l-l-wrap">
                <label htmlFor="password" className="lbl-p-l">
                  Password
                </label>
                <motion.input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-underline"
                  whileFocus={focusRing}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                />
              </div>
              <motion.button
                className="pro-s-btn"
                type="submit"
                whileHover={btnHover}
                whileTap={btnTap}
              >
                Login
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    );
  }

  // Authenticated: show the Add Blog editor + List of posts
  return (
    <div className="fd-container">
      {/* Toasts available in authenticated view */}
      <ToastContainer position="top-right" autoClose={3500} theme="dark" />

      <div className="fd-d-heading-c">
        <div className="fd-dd-heading-c">
          <h3 className="fd-dd-heading-h-c">Add new blogs</h3>
          <h6 className="subtitle-fd-dd-h-c">
            Craft Fresh Stories, Insights, and Ideas Instantly.
          </h6>
        </div>
        <motion.button
          className="fd-d-h-l-btn"
          type="button"
          onClick={handleLogout}
          whileHover={btnHover}
          whileTap={btnTap}
        >
          Logout page
        </motion.button>
      </div>

      <form onSubmit={handleSubmit} className="fd-f-contain">
        <div className="fd-f-head-inp-contain">
          <div className="fd-f-head-wrap">
            <label htmlFor="post-title">Heading</label>
            <motion.input
              id="post-title"
              type="text"
              placeholder="Heading"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              whileFocus={focusRing}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            />
          </div>
          <div className="fd-f-head-wrap">
            <label htmlFor="post-subtitle">Subtitle</label>
            <motion.input
              id="post-subtitle"
              type="text"
              placeholder="Subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              whileFocus={focusRing}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            />
          </div>
        </div>

        <div className="fd-section-contain">
          {sections.map((sec, secIndex) => (
            <div key={secIndex} className="fd-m-p-inp-contain">
              <h4 className="fd-heading-s">Section {secIndex + 1}</h4>

              <div className="contain-m-p-main">
                {sec.miniHeadings.map((mh, i) => (
                  <motion.input
                    key={`mh-${secIndex}-${i}`}
                    type="text"
                    className="fd-mini-inp"
                    placeholder="Subtitle"
                    value={mh}
                    onChange={(e) =>
                      handleSectionChange(
                        secIndex,
                        "miniHeadings",
                        e.target.value,
                        i
                      )
                    }
                    whileFocus={focusRing}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 22,
                    }}
                  />
                ))}
                <motion.button
                  className="heading-m-fd"
                  type="button"
                  onClick={() => addMiniHeading(secIndex)}
                  whileHover={btnHover}
                  whileTap={btnTap}
                >
                  + Add Subtitle
                </motion.button>
              </div>

              <div className="fd-p-main-contain">
                {sec.paragraphs.map((p, i) => (
                  <motion.textarea
                    key={`p-${secIndex}-${i}`}
                    placeholder="Paragraph"
                    value={p}
                    onChange={(e) =>
                      handleSectionChange(
                        secIndex,
                        "paragraphs",
                        e.target.value,
                        i
                      )
                    }
                    whileFocus={focusRing}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 22,
                    }}
                  />
                ))}
                <motion.button
                  className="fd-add-h-p"
                  type="button"
                  onClick={() => addParagraph(secIndex)}
                  whileHover={btnHover}
                  whileTap={btnTap}
                >
                  + Add Paragraph
                </motion.button>
              </div>
            </div>
          ))}
        </div>

        <div className="btn-contain-fd">
          <motion.button
            className="ad-sec-btn-fd"
            type="button"
            onClick={addSection}
            whileHover={btnHover}
            whileTap={btnTap}
          >
            + Add Section
          </motion.button>
          <motion.button
            className="ad-p"
            type="submit"
            whileHover={btnHover}
            whileTap={btnTap}
          >
            Publish Post
          </motion.button>
        </div>
      </form>

      <div className="ac-container">
        <h4 className="ac-heading">All Posts</h4>
        {loadingPosts ? (
          <p>Loading…</p>
        ) : posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <ul className="acc-container">
            {posts.map((p) => {
              const totalWords = (p.title || "")
                .trim()
                .split(/\s+/)
                .filter(Boolean).length;
              const preview = getExactly8Words(p.title || "");
              const showEllipsis = totalWords > 8;
              const totalsub = (p.subtitle || "")
                .trim()
                .split(/\s+/)
                .filter(Boolean).length;
              const ptsubtitle = getExactly15Words(p.subtitle || "");
              const showsubellipsis = totalsub > 8;

              return (
                <li key={p.id} className="acc-contain">
                  <div>
                    <div className="acc-head-wrap">
                      <div className="acc-head">
                        {preview}
                        {showEllipsis ? "..." : ""}...
                      </div>
                      <motion.button
                        type="button"
                        onClick={openCert}
                        className="del-acc-btn"
                        whileHover={btnHover}
                        whileTap={btnTap}
                      >
                        <i className="bx bx-trash"></i>
                      </motion.button>
                    </div>
                    <div className="acc-date">{p.createdAtText}</div>
                    <div className="acc-sub">
                      {ptsubtitle} {showsubellipsis ? "..." : ""}...
                    </div>
                  </div>

                  {/* Animated confirm dialog */}
                  <AnimatePresence>
                    {isCertDialogOpen && (
                      <motion.div
                        className="acc-overlay-d"
                        key="confirm-overlay"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={closeCert}
                      >
                        <motion.div
                          className="acc-d-box"
                          key="confirm-modal"
                          variants={dropIn}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <h4 className="heading-acc-d">
                            Confirm blog deletion
                          </h4>
                          <div className="acc-btn-d-contain">
                            <motion.button
                              type="button"
                              onClick={closeCert}
                              className="btn-d-acc n"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.96 }}
                            >
                              cancel
                            </motion.button>
                            <motion.button
                              type="button"
                              onClick={() => {
                                handleDelete(p.id);
                                closeCert();
                              }}
                              className="btn-d-acc d"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.96 }}
                            >
                              delete
                            </motion.button>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ForDev;
