import React from "react";
import { Link, useParams } from "react-router-dom";
import servicesDetails from "./ServicesData";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } }
};

const item = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
});

const ServicesDetails = () => {
  const { id } = useParams();
  const service = servicesDetails[id];
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      {service ? (
        <motion.div
          key={id}
          className="services-d-container"
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
        >
          <div className="heading-contain-sr-d">
            <motion.h3 className="heading-sr-d" variants={item(reduce)} initial="hidden" animate="show">
              {service.title}
            </motion.h3>
            <motion.p className="subtitle-sr-d" variants={item(reduce)} initial="hidden" animate="show">
              {service.shortDesc}
            </motion.p>
          </div>

          <motion.p className="desc-sr-d" variants={item(reduce)} initial="hidden" animate="show">
            {service.description}
          </motion.p>

          <motion.div className="sr-d-f-contain" variants={container} initial="hidden" animate="show">
            {service.features.map((feat) => (
              <motion.ul key={feat} className="sr-d-list" variants={item(reduce)}>
                <motion.li className="sr-d-item" variants={item(reduce)}>
                  {feat}
                </motion.li>
              </motion.ul>
            ))}
          </motion.div>

          <motion.div className="sr-d-p-contain" variants={container} initial="hidden" animate="show">
            <motion.h3 className="heading-sr-d-p" variants={item(reduce)}>Price:</motion.h3>
            <motion.p className="text-p-sr-d" variants={item(reduce)}>{service.price}</motion.p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <button className="btn-sr-d-d">
              <Link to={service.link} className="btn-sr-d">{service.cta}</Link>
            </button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="sr-404"
          className="service-err"
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : -20 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="heading-err">Services Not Found!</h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServicesDetails;
