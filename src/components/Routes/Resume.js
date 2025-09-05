import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResumeContain from "../contents/ResumeContain";

const Resume = () => {
  return (
    <div className="pro-container">
      {/* Content now shown unconditionally */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ResumeContain />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Resume;
