import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const ForDev = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [sections, setSections] = useState([{ miniHeading: "", paragraph: "" }]);

  const addSection = () => {
    setSections([...sections, { miniHeading: "", paragraph: "" }]);
  };

  const handleSectionChange = (index, field, value) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        title,
        subtitle,
        sections,
        createdAt: serverTimestamp()
      });
      setTitle("");
      setSubtitle("");
      setSections([{ miniHeading: "", paragraph: "" }]);
      alert("✅ Blog post added!");
    } catch (err) {
      console.error(err);
      alert("Error adding post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Subtitle"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />

      {sections.map((sec, i) => (
        <div key={i}>
          <input
            type="text"
            placeholder="Mini Heading"
            value={sec.miniHeading}
            onChange={(e) => handleSectionChange(i, "miniHeading", e.target.value)}
          />
          <textarea
            placeholder="Paragraph"
            value={sec.paragraph}
            onChange={(e) => handleSectionChange(i, "paragraph", e.target.value)}
          ></textarea>
        </div>
      ))}

      <button type="button" onClick={addSection}>+ Add Section</button>
      <button type="submit">Publish Post</button>
    </form>
  );
};

export default ForDev;
