// PostList.js
import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { blogDb } from "../Auth/firebaseConfig"; // <-- updated
import SinglePost from "../contents/SinglePost";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // Track which post is clicked

  useEffect(() => {
    const q = query(collection(blogDb, "posts"), orderBy("createdAt", "desc")); // <-- use blogDb
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Click handler to select a post
  const handleClick = (post) => {
    setSelectedPost(post);
  };

  // Back to list
  const handleBack = () => {
    setSelectedPost(null);
  };

  if (selectedPost) {
    // Show full post
    return <SinglePost post={selectedPost} onBack={handleBack} />;
  }

  // Show list of posts
  return (
    <div>
      <h1>All Posts</h1>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", cursor: "pointer" }}
          onClick={() => handleClick(post)}
        >
          <h2>{post.title}</h2>
          <h3>{post.subtitle}</h3>
        </div>
      ))}
    </div>
  );
};

export default PostList;
