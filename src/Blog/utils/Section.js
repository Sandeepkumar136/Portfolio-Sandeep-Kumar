// src/utils/Section.js
import React from "react";
import { motion } from "framer-motion";

export function emptySection(type = "paragraph") {
  switch (type) {
    case "miniHeading":
      return { type: "miniHeading", text: "" };
    case "miniSubtitle":
      return { type: "miniSubtitle", text: "" };
    case "paragraph":
      return { type: "paragraph", text: "" };
    case "rowList":
      return { type: "rowList", heading: "", items: [] };
    case "gridList":
      return { type: "gridList", heading: "", items: [] };
    default:
      return { type: "paragraph", text: "" };
  }
}

// Reliable in-view triggers configured here
const viewport = { once: true, amount: 0.35 };

const revealUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
  }
};

const listStagger = {
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04
    }
  }
};

const itemReveal = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" }
  }
};

export function renderSection(s, i) {
  if (!s || !s.type) return null;

  switch (s.type) {
    case "paragraph":
      return (
        <motion.p
          key={i}
          className="sec-para"
          variants={revealUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {s.text || ""}
        </motion.p>
      );

    case "miniHeading":
      return (
        <motion.h3
          key={i}
          className="sec-miniHeading"
          variants={revealUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {s.text || ""}
        </motion.h3>
      );

    case "miniSubtitle":
      return (
        <motion.p
          key={i}
          className="sec-miniSubtitle"
          variants={revealUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {s.text || ""}
        </motion.p>
      );

    case "rowList": {
      const items = Array.isArray(s.items) ? s.items : [];
      return (
        <motion.section
          key={i}
          className="sec-rowlist"
          variants={listStagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {s.heading ? (
            <motion.h4
              className="sec-rowlist-title"
              variants={revealUp}
              viewport={viewport}
            >
              {s.heading}
            </motion.h4>
          ) : null}

          <motion.div className="sec-rowlist-items" variants={listStagger}>
            {items.map((it, idx) => {
              const isObj = it && typeof it === "object";
              const title = isObj
                ? it.title || ""
                : typeof it === "string"
                ? it
                : "";
              const desc = isObj ? it.desc || it.description || "" : "";
              return (
                <motion.div
                  key={idx}
                  className="sec-row"
                  variants={itemReveal}
                  viewport={viewport}
                >
                  <div className="sec-row-content">
                    <div className="sec-row-title">{title}</div>
                    {desc ? <div className="sec-row-desc">{desc}</div> : null}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>
      );
    }

    case "gridList": {
      const items = Array.isArray(s.items) ? s.items : [];
      return (
        <motion.section
          key={i}
          className="sec-gridlist"
          variants={listStagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {s.heading ? (
            <motion.h4
              className="sec-gridlist-title"
              variants={revealUp}
              viewport={viewport}
            >
              {s.heading}
            </motion.h4>
          ) : null}

          <motion.div className="sec-gridlist-items" variants={listStagger}>
            {items.map((it, idx) => {
              const isObj = it && typeof it === "object";
              const title = isObj
                ? it.title || ""
                : typeof it === "string"
                ? it
                : "";
              const desc = isObj ? it.desc || it.description || "" : "";
              return (
                <motion.article
                  key={idx}
                  className="sec-card"
                  variants={itemReveal}
                  viewport={viewport}
                >
                  <div className="sec-card-title">{title}</div>
                  {desc ? <div className="sec-card-desc">{desc}</div> : null}
                </motion.article>
              );
            })}
          </motion.div>
        </motion.section>
      );
    }

    default:
      return null;
  }
}
