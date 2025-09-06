// PostList.js
import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { blogDb } from "../Auth/firebaseConfig";
import SinglePost from "../contents/SinglePost";

// NEW: Framer Motion
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const heroVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 160, damping: 22 }
  }
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Orchestrate children entering in a cascade
      staggerChildren: 0.08,
      delayChildren: 0.12
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.15 }
  }
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
      {/* AnimatePresence controls enter/exit across views */}
      <AnimatePresence mode="wait" initial={false}>
        {selectedPost ? (
          // Detail view (exits list, then enters detail)
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
            {/* Hero text entrance */}
            <motion.h1 className="heading-jsm" variants={heroVariants}>
              Craft. Share. Inspire.
            </motion.h1>
            <motion.h3 className="subtitle-jsm" variants={heroVariants}>
              Empowering ideas through stories, design, and meaningful digital expression.
            </motion.h3>

            {/* Staggered list reveal */}
            <motion.ul
              className="jsm-container"
              variants={listVariants}
              initial="hidden"
              animate="visible"
              // Enable layout animations when list changes
              layout
            >
              {/* AnimatePresence for item-level add/remove */}
              <AnimatePresence initial={false}>
                {posts.map((post) => (
                  <motion.li
                    key={post.id}
                    className="jsm-contain"
                    variants={itemVariants}
                    // Exit when removed or re-ordered
                    exit="exit"
                    // Subtle hover/tap micro-interactions
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleClick(post)}
                    // Layout animations between states
                    layout
                    // Shared element link to detail view (title or card)
                    layoutId={`post-${post.id}`}
                  >
                    <motion.h2
                      className="jsm-c-title"
                      // Optionally share just the title
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
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};

export default PostList;
