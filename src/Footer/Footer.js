import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Variants
const listContainerVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { when: "afterChildren" },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

const listItemVariants = {
  closed: { opacity: 0, y: -12 },
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 420, damping: 28 },
  },
};

const fadeUpStagger = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.05, delayChildren: 0.03 },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

const Footer = () => {
  const [isConOpen, setIsConOpen] = useState(false);
  const [isAbOpen, setIsAbConOpen] = useState(false);
  const [isSocOpen, setIsSocOpen] = useState(false);

  const HandleMClick = () => setIsConOpen((v) => !v);
  const HandleAClick = () => setIsAbConOpen((v) => !v);
  const HandleSClick = () => setIsSocOpen((v) => !v);

  return (
    <div className="footer">
      {/* Desktop / Max footer */}
      <motion.div
        className="max-footer"
        variants={fadeUpStagger}
        initial="hidden"
        animate="show"
      >
        <motion.div className="mx-footer-container" variants={fadeUpItem}>
          <h3 className="heading-mx-footer">main</h3>
          <ul className="mx-footer-contain">
            <motion.li
              className="mx-footer-items"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
            >
              Contact
            </motion.li>
            <motion.li
              className="mx-footer-items"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
            >
              Work with us
            </motion.li>
            <motion.li
              className="mx-footer-items"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
            >
              Home
            </motion.li>
          </ul>
        </motion.div>

        <motion.div className="mx-footer-container" variants={fadeUpItem}>
          <h3 className="heading-mx-footer">About</h3>
          <ul className="mx-footer-contain">
            <motion.li
              className="mx-footer-items"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
            >
              Our Services
            </motion.li>
            <motion.li
              className="mx-footer-items"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
            >
              Our Missions
            </motion.li>
            <motion.li
              className="mx-footer-items"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
            >
              For Developers
            </motion.li>
          </ul>
        </motion.div>

        <motion.div className="mx-footer-container" variants={fadeUpItem}>
          <h3 className="heading-mx-footer">Legal</h3>
          <ul className="mx-footer-contain">
            <motion.li
              className="mx-footer-items"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
            >
              Terms
            </motion.li>
            <motion.li
              className="mx-footer-items"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
            >
              Privacy
            </motion.li>
            <motion.li
              className="mx-footer-items"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
            >
              FAQ
            </motion.li>
          </ul>
        </motion.div>

        <motion.div className="mx-footer-container" variants={fadeUpItem}>
          <h3 className="heading-mx-footer">Social</h3>
          <ul className="mx-footer-contain">
            <motion.li
              className="mx-footer-items-social"
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <motion.i
                className="mx-icon-social bx bxl-instagram"
                whileHover={{ rotate: 6 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
              />
              <span className="title-mx-social-footer">Instagram</span>
            </motion.li>
            <motion.li
              className="mx-footer-items-social"
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <motion.i
                className="mx-icon-social bx bxl-facebook"
                whileHover={{ rotate: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
              />
              <span className="title-mx-social-footer">Facebook</span>
            </motion.li>
            <motion.li
              className="mx-footer-items-social"
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <motion.i
                className="mx-icon-social bx bxl-github"
                whileHover={{ rotate: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
              />
              <span className="title-mx-social-footer">Github</span>
            </motion.li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Mobile / Min footer */}
      <div className="min-footer-container">
        {/* Main */}
        <div className="min-footer">
          <div className="min-footer-head-contain">
            <h3 className="heading-mn-footer">main</h3>
            <motion.button
              type="button"
              onClick={HandleMClick}
              className="btn-footer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 500, damping: 26 }}
              aria-expanded={isConOpen}
              aria-controls="mn-main"
            >
              <motion.i
                className="icon-btn-footer bx bx-chevron-down"
                animate={{ rotate: isConOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
              />
            </motion.button>
          </div>

          <AnimatePresence initial={false}>
            {isConOpen && (
              <motion.ul
                key="mn-main"
                id="mn-main"
                className="min-footer-contain"
                variants={listContainerVariants}
                initial="closed"
                animate="open"
                exit="closed"
                style={{ overflow: "hidden" }}
              >
                {["contact", "work with us", "home"].map((txt) => (
                  <motion.li
                    key={txt}
                    className="min-footer-items"
                    variants={listItemVariants}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {txt}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* About */}
        <div className="min-footer">
          <div className="min-footer-head-contain">
            <h3 className="heading-mn-footer">about</h3>
            <motion.button
              type="button"
              onClick={HandleAClick}
              className="btn-footer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 500, damping: 26 }}
              aria-expanded={isAbOpen}
              aria-controls="mn-about"
            >
              <motion.i
                className="icon-btn-footer bx bx-chevron-down"
                animate={{ rotate: isAbOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
              />
            </motion.button>
          </div>

          <AnimatePresence initial={false}>
            {isAbOpen && (
              <motion.ul
                key="mn-about"
                id="mn-about"
                className="min-footer-contain"
                variants={listContainerVariants}
                initial="closed"
                animate="open"
                exit="closed"
                style={{ overflow: "hidden" }}
              >
                {["our services", "our missions", "for developers"].map(
                  (txt) => (
                    <motion.li
                      key={txt}
                      className="min-footer-items"
                      variants={listItemVariants}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {txt}
                    </motion.li>
                  )
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Legal (static) */}
        <div className="min-footer">
          <div className="min-footer-head-contain">
            <h3 className="heading-mn-footer">legal</h3>
          </div>
          <ul className="min-footer-contain">
            <motion.li
              className="min-footer-items"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              terms
            </motion.li>
            <motion.li
              className="min-footer-items"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              privacy
            </motion.li>
            <motion.li
              className="min-footer-items"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              FAQ
            </motion.li>
          </ul>
        </div>

        {/* Social */}
        <div className="min-footer">
          <div className="min-footer-head-contain">
            <h3 className="heading-mn-footer">Social</h3>
            <motion.button
              type="button"
              onClick={HandleSClick}
              className="btn-footer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 500, damping: 26 }}
              aria-expanded={isSocOpen}
              aria-controls="mn-social"
            >
              <motion.i
                className="icon-btn-footer bx bx-chevron-down"
                animate={{ rotate: isSocOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
              />
            </motion.button>
          </div>

          <AnimatePresence initial={false}>
            {isSocOpen && (
              <motion.ul
                key="mn-social"
                id="mn-social"
                className="min-footer-contain"
                variants={listContainerVariants}
                initial="closed"
                animate="open"
                exit="closed"
                style={{ overflow: "hidden" }}
              >
                <motion.li
                  className="min-footer-items-social"
                  variants={listItemVariants}
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.i
                    className="bx bxl-instagram"
                    whileHover={{ rotate: 8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 24 }}
                  />
                  <span className="title-icon-social-min-f">instagram</span>
                </motion.li>
                <motion.li
                  className="min-footer-items-social"
                  variants={listItemVariants}
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.i
                    className="bx bxl-facebook"
                    whileHover={{ rotate: -8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 24 }}
                  />
                  <span className="title-icon-social-min-f">facebook</span>
                </motion.li>
                <motion.li
                  className="min-footer-items-social"
                  variants={listItemVariants}
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.i
                    className="bx bxl-github"
                    whileHover={{ rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 24 }}
                  />
                  <span className="title-icon-social-min-f">github</span>
                </motion.li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Footer;
