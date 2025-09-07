// SinglePost.js
import React from "react";

const SinglePost = ({ post, onBack }) => {
  // 1) Normalize createdAt/date to a JS Date
  const createdAtDate = React.useMemo(() => {
    const v = post?.createdAt ?? post?.date;
    if (!v) return null;

    // Firestore Timestamp instance
    if (typeof v?.toDate === "function") return v.toDate();

    // Plain object like { seconds, nanoseconds }
    if (v?.seconds != null) return new Date(v.seconds * 1000);

    // ISO string, ms epoch, or Date
    return v instanceof Date ? v : new Date(v);
  }, [post?.createdAt, post?.date]);

  // 2) Human + machine formats
  const createdAtISO = createdAtDate ? createdAtDate.toISOString() : "";
  const createdAtText = createdAtDate
    ? new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(createdAtDate)
    : "";

  const handleShare = async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.href : "";
      const shareText = [
        post?.subtitle || post?.title || "",
        createdAtText ? `Published: ${createdAtText}` : "",
      ]
        .filter(Boolean)
        .join(" • ");

      const data = {
        title: post?.title || document.title,
        text: shareText, // Put createdAtText inside text (Web Share API ignores custom keys)
        url,
      };

      if (navigator.share) {
        await navigator.share(data);
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard");
        return;
      }

      window.prompt("Copy this link:", url);
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <div className="rbc-container">
      <div className="rbc-btn-functions">
        <button onClick={onBack}>
          <i className="bx bx-chevron-left"></i>
          <span className="rbc-b-warp">Back</span>
        </button>
        <div className="rbc-b-wrap-dbc">
          {createdAtText && (
            <div className="rbc-meta">
              <time dateTime={createdAtISO}>{createdAtText}</time>
            </div>
          )}
          <button onClick={handleShare}>
            <span className="rbc-b-warp">Share</span>
            <i className="bx bx-share"></i>
          </button>
        </div>
      </div>

      <div className="rbc-head-container">
        <h2>{post.title}.</h2>
        <h3>{post.subtitle}</h3>

        {/* Created-at display */}
      </div>

      <div className="rbc-contain-wrap">
        {post.sections?.map((sec, i) => (
          <div key={i} className="rbc-contain-m">
            <div className="rbc-head-wrap">
              {sec.miniHeadings?.map((mh, idx) => (
                <h4 className="rbc-heading" key={idx}>
                  {mh}
                </h4>
              ))}
            </div>
            <div className="rbc-pr-wrap">
              {sec.paragraphs?.map((p, idx) => (
                <p className="rbc-subtitle" key={idx}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePost;
