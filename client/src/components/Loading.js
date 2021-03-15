import React from "react";
import { motion } from "framer-motion";

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
};

const loadingCircleTransition = {
  duration: 0.4,
  yoyo: Infinity,
  ease: "easeInOut",
};

const Loading = () => {
  return (
    <motion.div
      className="loading-container"
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <motion.img
        className="loading-circle"
        src="client/src/images/favorite.png"
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
        alt=""
      />
      <motion.img
        className="loading-circle"
        src="client/src/images/favorite.png"
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
        alt=""
      />
      <motion.img
        className="loading-circle"
        src="client/src/images/favorite.png"
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
        alt=""
      />
    </motion.div>
  );
};

export default Loading;
