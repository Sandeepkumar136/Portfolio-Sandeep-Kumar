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
    try {
      await addDoc(collection(blogDb, "posts"), {
        title,
        subtitle,
        sections,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setSubtitle("");
      setSections([]);
      alert("✅ Blog post added!");
    } catch (err) {
      console.error(err);
      alert("Error adding post");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(blogDb, "posts", id));
    } catch (err) {
      console.error(err);
      alert("Error deleting post");
    }
  };

  // Gate the editor behind the animated login screen
  if (!isAuthenticated) {
    return (
      <div className="pro-container">
        <div className="pro-heading-contain">
          <h3 className="heading-pro">Precision Meets Creativity.</h3>
          <h6 className="subtitle-pro">
            Transforming complex ideas into{" "}
            <span className="p-highlight">seamless</span>, engaging, and{" "}
            <span className="p-highlight">impactful</span> user experiences.
          </h6>
        </div>

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
                whileFocus={{ scale: 1.02 }}
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
    );
  }

  // Authenticated: show the Add Blog editor + List of posts
  return (
    <div className="fd-container">
      <div className="fd-d-heading-c">
        <div className="fd-dd-heading-c">
          <h3 className="fd-dd-heading-h-c">Add new blogs</h3>
          <h6 className="subtitle-fd-dd-h-c">
            Craft Fresh Stories, Insights, and Ideas Instantly.
          </h6>
        </div>
        <button className="fd-d-h-l-btn" type="button" onClick={handleLogout}>
          Logout page
        </button>
      </div>

      {/* Posts list (title, subtitle, date + delete) */}

      <form onSubmit={handleSubmit} className="fd-f-contain">
        <div className="fd-f-head-inp-contain">
          <div className="fd-f-head-wrap">
          <label htmlFor="text">Heading
          </label>
          <input
            type="text"
            placeholder="Heading"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />
            </div>
            <div className="fd-f-head-wrap">
              <label htmlFor="text">subtitle</label>
          <input
            type="text"
            placeholder="Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            />
            </div>
        </div>

        <div className="fd-section-contain">
        {sections.map((sec, secIndex) => (
          <div key={secIndex} className="fd-m-p-inp-contain">
            <h4 className="fd-heading-s" >Section {secIndex + 1}</h4>
            <div className="contain-m-p-main">
            {sec.miniHeadings.map((mh, i) => (
              <input
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
                />
              ))}
            <button className="heading-m-fd" type="button" onClick={() => addMiniHeading(secIndex)}>
              + Add Subtitle
            </button>
              </div>
              <div className="fd-p-main-contain">
            {sec.paragraphs.map((p, i) => (
              <textarea
              key={`p-${secIndex}-${i}`}
              placeholder="Paragraph"
              value={p}
              onChange={(e) =>
                handleSectionChange(secIndex, "paragraphs", e.target.value, i)
              }
              />
            ))}
            <button className="fd-add-h-p" type="button" onClick={() => addParagraph(secIndex)}>
              + Add Paragraph
            </button>
            </div>
          </div>
        ))}
        </div>
        <div className="btn-contain-fd">
        <button className="ad-sec-btn-fd" type="button" onClick={addSection}>
          + Add Section
        </button>
        <button className="ad-p" type="submit">Publish Post</button>
        </div>
      </form>
      <div className="my-6">
        <h4 className="mb-2">All Posts</h4>
        {loadingPosts ? (
          <p>Loading…</p>
        ) : posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <ul className="divide-y">
            {posts.map((p) => (
              <li key={p.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm opacity-80">{p.subtitle}</div>
                  <div className="text-xs opacity-70">{p.createdAtText}</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ForDev;
