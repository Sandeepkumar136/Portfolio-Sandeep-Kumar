import React from "react";
import { motion } from "framer-motion";
import Image_Exported from "../assets/ImageExporter";

const Profile = () => {
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
    </motion.div>
  );
};

export default Profile;
