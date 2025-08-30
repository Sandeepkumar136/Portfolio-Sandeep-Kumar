import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
          <h2>{post.title}</h2>
          <h3>{post.subtitle}</h3>
          {post.sections?.map((sec, i) => (
            <div key={i}>
              <h4>{sec.miniHeading}</h4>
              <p>{sec.paragraph}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PostList;
