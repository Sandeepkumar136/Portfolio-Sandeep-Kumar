// SinglePost.js
import React from "react";

const SinglePost = ({ post, onBack }) => {
  return (
    <div>
      <button onClick={onBack} style={{ marginBottom: "20px" }}>← Back to List</button>
      <h2>{post.title}</h2>
      <h3>{post.subtitle}</h3>
      {post.sections?.map((sec, i) => (
        <div key={i} style={{ marginTop: "15px", paddingLeft: "10px", borderLeft: "2px solid #ccc" }}>
          {sec.miniHeadings?.map((mh, idx) => (
            <h4 key={idx}>{mh}</h4>
          ))}
          {sec.paragraphs?.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SinglePost;
