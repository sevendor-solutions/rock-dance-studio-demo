import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 15
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -15
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.4
};

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="pt-24 pb-16 min-h-[calc(100vh-80px)] flex flex-col"
    >
      {children}
    </motion.div>
  );
};
