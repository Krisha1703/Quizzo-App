import React from "react";
import { motion } from "framer-motion";

const Tag = ({ text, color, position, setCursorImage, cursorImage }) => {
  return (
    <motion.div
      className={`absolute px-4 py-2 rounded-full text-white bg-${color}`}
      style={{ top: position.top, left: position.left }}
      onMouseEnter={() => setCursorImage(cursorImage)}
      onMouseLeave={() => setCursorImage(null)}
      whileHover={{
        rotate: [0, 2, -2, 2, 0],
        transition: { repeat: Infinity, duration: 0.5 },
      }}
      drag
      dragConstraints={{ top: 0, left: 0, right: window.innerWidth, bottom: window.innerHeight }}
    >
      {text}
    </motion.div>
  );
};

export default Tag;
