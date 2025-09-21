import React from "react";
import { motion } from "framer-motion";
import Image_Exported from "../assets/ImageExporter";
import LangData from "../Jsons/LangData";

const Menifesto = () => {
  const items = [
    {
      heading: "10th",
      subtitle: "Inter High School",
      location: "Kishanganj",
      state: "Bihar",
      desc: "The roots of discipline and discovery. A chapter where dreams formed under chalk dust and morning bells in the gentle heartland of Kishanganj.",
      back_image: Image_Exported["madel-image"],
    },
    {
      heading: "Intermediate",
      subtitle: "Insan Inter College",
      location: "Kishanganj",
      state: "Bihar",
      desc: "A scholarly rite of passage where youth was sculpted with choice and clarity. The place that sharpened purpose and invited deeper reflection.",
      back_image: Image_Exported["madel-image"],
    },
    {
      heading: "B.COM",
      subtitle: "Purnia University",
      location: "Purnia",
      state: "Bihar",
      desc: "Beneath the academic archways of Purnia, commerce was embraced like a craft. Here, balance sheets and ambitions were equally honored.",
      back_image: Image_Exported["madel-image"],
    },
    {
      heading: "Frontend Development",
      subtitle: "W3s School",
      location: "Hamburg",
      state: "Germany",
      desc: "A canvas of pixels and code. In W3s School’s realm, interfaces took form, and the visual soul of the web began to breathe.",
      back_image: Image_Exported["madel-image"],
    },
    {
      heading: "Backend Development",
      subtitle: "Apna College",
      location: "Delhi",
      state: "India",
      desc: "The unseen workings of the web revealed their secrets. Through Apna College’s light, logic and structure flourished in code behind the curtains.",
      back_image: Image_Exported["madel-image"],
    },
  ];
  const skills = [
    "html5",
    "css3",
    "javascript",
    "sass",
    "react",
    "nodejs",
    "redux",
    "mongodb",
    "typescript",
    "jquery",
    "vuejs",
    "python",
    "flask",
    "postgresql",
    "bootstrap",
    "netlify",
    "github",
    "git",
    "visual-studio",
    "terminal",
  ];

  return (
    <motion.div
      className="profile-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="p-user-container"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Profile Image Container */}
        <motion.div
          className="p-u-logo-contain"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          whileHover={{ scale: 1.03 }}
        >
          <motion.img
            src={Image_Exported["user-picture"]}
            alt="User Profile"
            className="img-user-p"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>

        {/* Info Section */}
        <motion.div
          className="p-info-contain"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
        >
          {/* Name (glitch handled by CSS, just animate position) */}
          <motion.div
            className="gl-p-in-wrapper"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="p-in-name" data-text="Sandeep Kumar">
              Sandeep Kumar
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.span
            className="p-in-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Frontend Developer
          </motion.span>

          {/* Description */}
          <motion.p
            className="text-in"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Creative and detail-oriented frontend developer skilled in React,
            responsive design, UI/UX, animations, and state management,
            delivering seamless, interactive web experiences with modern web
            technologies.
          </motion.p>

          {/* Social Links (stagger) */}
          <motion.ul
            className="in-links-contain"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 1 },
              },
            }}
          >
            {["gmail", "discord", "github"].map((platform, index) => (
              <motion.li
                key={index}
                className="links-in"
                variants={{
                  hidden: { y: 15, opacity: 0, scale: 0.8 },
                  visible: { y: 0, opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <i className={`bx bxl-${platform}`}></i>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
      <h4 className="infinity-heading">Academic Journey</h4>
      <div className="p-ed-container">
        {items.map((e, i) => (
          <div key={i} className="p-ed-card">
            <div className="p-ed-upper-contain">
              <div className="p-ed-title-contain">
                <h3 className="heading-p-ed">{e.heading}</h3>
                <p className="p-ed-subtitle">{e.subtitle}</p>
              </div>
              <p className="p-ed-loc">
                <span className="p-ed-city">{e.location}</span>
                <span className="p-ed-state">{e.state}</span>
              </p>
            </div>
            <p className="text-p-ed">{e.desc}</p>
          </div>
        ))}
      </div>
      <h4 className="infinity-heading">Learning</h4>
      <div className="cur-ed-container">
        <div className="cur-ed-cards">
          <div className="cur-ed-upper-contain">
            <p className="cur-ed-title-contain">
              <h3 className="cur-ed-title">Master in C.</h3>
              <h4 className="cur-ed-subtitle">Sradha Khapra</h4>
            </p>
            <p className="curr-cur-info">currently</p>
          </div>
          <p className="cur-ed-text">
            With quiet perseverance, Sradha Khanpra delves into the elegant
            precision of C—where logic flows like a river through valleys of
            memory. In every function, she chisels mastery, weaving clarity and
            power into the codebase.
          </p>
        </div>
        <div className="cur-ed-cards">
          <div className="cur-ed-upper-contain">
            <p className="cur-ed-title-contain">
              <h3 className="cur-ed-title">Master in MongoDB</h3>
              <h4 className="cur-ed-subtitle">Haris Ali Khan</h4>
            </p>
            <p className="curr-cur-info">currently</p>
          </div>
          <p className="cur-ed-text">
            In the dynamic heart of NoSQL, Haris Ali Khan studies the vast
            forests of MongoDB. Document by document, he deciphers the art of
            flexible data. His journey is one of modern mastery.
          </p>
        </div>
      </div>
      <h4 className="infinity-heading">Languages</h4>
      <div className="lang-container">
        {LangData.LangAssets.map((element, index) => (
          <div key={index} className="lang-card">
            <div className="lang-logo-contain">
              <img
                src={element.icon}
                alt={element.title}
                className="lang-img"
              />
            </div>
            <div className="lang-item-contain">
              <h3 className="lang-title">{element.title}</h3>
              <div className="lang-logo-contain-main">
                <div className="logo-lang-base">
                  <i
                    className="bx bx-book-open"
                    onClick={() => window.open(element.docs, "_blank")}
                  ></i>
                  <span className="title-lgo-base">Docs</span>
                </div>
                <div className="logo-lang-base">
                  <i
                    className="bx bxl-git"
                    onClick={() => window.open(element.git, "_blank")}
                  ></i>
                  <span className="title-lgo-base">Git</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Menifesto;
