// src/pages/PublicDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { databases, DB_ID, COLLECTION_ID } from "../lib/appwrite";
import { renderSection } from "../utils/Section";
import Loader from "../../utils/Loader";

export default function PublicDetail() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [err, setErr] = useState("");
  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: "Check out this page!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Page shared successfully");
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      // Fallback: copy URL to clipboard
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
    <div className="bl-d-b-container">
      <div className="bl-d-b-btn-c">
        <Link className="bl-d-b-b" to="/blogs">
          <i className="bx  bx-chevron-left"></i> Back
        </Link>
        <button type="button" onClick={handleShare} className="bl-d-b-btn"><i className='bx  bx-share'  ></i>  <span className="s-v-c">Share</span></button>
      </div>

      {err && <div style={{ color: "red" }}>{err}</div>}
      {!doc ? (
        <Loader />
      ) : (
        <div className="b-d-contain-ms" >
          <h1 className="b-d-head-ms" >{doc.heading}</h1>
          <h3 className="b-d-s-ms">{doc.subtitle}</h3>
          <div className="b-d-d-ms">
            {doc.$createdAt ? new Date(doc.$createdAt).toLocaleString() : ""}
          </div>
          <div>{sections.map((s, i) => renderSection(s, i))}</div>
        </div>
      )}
    </div>
  );
}