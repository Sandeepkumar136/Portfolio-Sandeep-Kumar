// PostList.js
import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { blogDb } from "../Auth/firebaseConfig";
import SinglePost from "../contents/SinglePost";

// Framer Motion
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const heroVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 160, damping: 22 },
  },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.15 },
  },
};

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const q = query(collection(blogDb, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleClick = (post) => setSelectedPost(post);
  const handleBack = () => setSelectedPost(null);

  return (
    <LayoutGroup>
      <AnimatePresence mode="wait" initial={false}>
        {selectedPost ? (
          // Detail view
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
          >
            <SinglePost post={selectedPost} onBack={handleBack} />
          </motion.div>
        ) : (
          // List view
          <motion.div
            key="list"
            className="jsm-j-container"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Hero Section */}
            <motion.h1 className="heading-jsm" variants={heroVariants}>
              Craft. Share. Inspire.
            </motion.h1>
            <motion.h3 className="subtitle-jsm" variants={heroVariants}>
              Empowering ideas through stories, design, and meaningful digital
              expression.
            </motion.h3>

            {/* Show posts if available, else fallback */}
            {posts.length > 0 ? (
              <motion.ul
                className="jsm-container"
                variants={listVariants}
                initial="hidden"
                animate="visible"
                layout
              >
                <AnimatePresence initial={false}>
                  {posts.map((post) => (
                    <motion.li
                      key={post.id}
                      className="jsm-contain"
                      variants={itemVariants}
                      exit="exit"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleClick(post)}
                      layout
                      layoutId={`post-${post.id}`}
                    >
                      <motion.h2
                        className="jsm-c-title"
                        layoutId={`post-title-${post.id}`}
                      >
                        {post.title}
                      </motion.h2>
                      <motion.h3 className="jsm-c-subtitle">
                        {post.subtitle}
                      </motion.h3>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
            ) : (
              <motion.div
                className="no-blogs"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ type: "spring", stiffness: 160, damping: 20 }}
              >
                <h2>✨ Blogs will be coming soon...</h2>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};

export default PostList;
