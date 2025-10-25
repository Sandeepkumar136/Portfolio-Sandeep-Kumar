// src/pages/PublicDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { databases, DB_ID, COLLECTION_ID } from "../lib/appwrite";
import { renderSection } from "../utils/Section";
import Loader from "../../utils/Loader";
import { motion } from "framer-motion";

const pageContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.08 }
  }
};

const slideUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function PublicDetail() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [err, setErr] = useState("");

  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: "Check out this page!",
      url: window.location.href
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Page shared successfully");
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    }
  };

  useEffect(() => {
    let mounted = true;
    databases
      .getDocument(DB_ID, COLLECTION_ID, id)
      .then((d) => {
        if (mounted) setDoc(d);
      })
      .catch((e) => setErr(e?.message || "Not found"));
    return () => {
      mounted = false;
    };
  }, [id]);

  const sections = doc?.sectionsJson
    ? (() => {
        try {
          return JSON.parse(doc.sectionsJson);
        } catch {
          return [];
        }
      })()
    : [];
  console.log({ sections });

  return (
    <motion.div
      className="bl-d-b-container"
      variants={pageContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div className="bl-d-b-btn-c" variants={slideUp}>
        <Link className="bl-d-b-btn" to="/blogs">
          Back
        </Link>
        <button type="button" onClick={handleShare} className="bl-d-b-btn">
          Share
        </button>
      </motion.div>

      {err && <div style={{ color: "red" }}>{err}</div>}

      {!doc ? (
        <Loader />
      ) : (
        <div className="b-d-contain-ms">
          <motion.div variants={slideUp}>
            <h1 className="b-d-head-ms">{doc.heading}</h1>
          </motion.div>

          <motion.div variants={slideUp}>
            <h3 className="b-d-s-ms">{doc.subtitle}</h3>
          </motion.div>

          <motion.div className="b-d-d-ms" variants={slideUp}>
            {doc.$createdAt ? new Date(doc.$createdAt).toLocaleString() : ""}
          </motion.div>

          <motion.div
            variants={{
              show: {
                transition: { staggerChildren: 0.06, delayChildren: 0.05 }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {sections.map((s, i) => renderSection(s, i))}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
