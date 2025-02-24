import React from 'react';
import { motion } from 'framer-motion';

const Subtext = () => {
  return (
    <h2 className="font-semibold text-xl flex flex-wrap gap-1">
      {"Create, manage, and track quizzes effortlessly with a seamless quiz-building experience, real-time progress tracking, and easy class management."
        .split(" ")
        .map((word, index) => (
          <motion.span
            key={index}
            className="cursor-pointer inline-block"
            whileHover={{ 
              y: -5, 
              backgroundColor: "#1E3A8A", 
              color: "white", 
              fontWeight: 700,
              padding: "4px 8px",
              borderRadius: "0.3vw"
            }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }} // Smoother & slower
          >
            {word} 
          </motion.span>
        ))
      }
    </h2>
  );
};

export default Subtext;
