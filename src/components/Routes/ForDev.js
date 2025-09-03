import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { blogDb } from "../Auth/firebaseConfig"; // <-- updated

const ForDev = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [sections, setSections] = useState([]);

  // Add a new empty section
  const addSection = () => {
    setSections([...sections, { miniHeadings: [], paragraphs: [] }]);
  };

  // Add mini heading to a section
  const addMiniHeading = (index) => {
    const newSections = [...sections];
    newSections[index].miniHeadings.push("");
    setSections(newSections);
  };

  // Add paragraph to a section
  const addParagraph = (index) => {
    const newSections = [...sections];
    newSections[index].paragraphs.push("");
    setSections(newSections);
  };

  // Update input in section
  const handleSectionChange = (sectionIndex, field, value, itemIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex][field][itemIndex] = value;
    setSections(newSections);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(blogDb, "posts"), { // <-- use blogDb
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

      {sections.map((sec, secIndex) => (
        <div key={secIndex} className="section border p-2 my-2">
          <h4>Section {secIndex + 1}</h4>

          {/* Mini Headings */}
          {sec.miniHeadings.map((mh, i) => (
            <input
              key={i}
              type="text"
              placeholder="Mini Heading"
              value={mh}
              onChange={(e) =>
                handleSectionChange(secIndex, "miniHeadings", e.target.value, i)
              }
            />
          ))}
          <button type="button" onClick={() => addMiniHeading(secIndex)}>
            + Add Mini Heading
          </button>

          {/* Paragraphs */}
          {sec.paragraphs.map((p, i) => (
            <textarea
              key={i}
              placeholder="Paragraph"
              value={p}
              onChange={(e) =>
                handleSectionChange(secIndex, "paragraphs", e.target.value, i)
              }
            ></textarea>
          ))}
          <button type="button" onClick={() => addParagraph(secIndex)}>
            + Add Paragraph
          </button>
        </div>
      ))}

      <button type="button" onClick={addSection}>
        + Add Section
      </button>
      <button type="submit">Publish Post</button>
    </form>
  );
};

export default ForDev;
