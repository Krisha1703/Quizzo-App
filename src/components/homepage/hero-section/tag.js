import React from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const Tag = ({ text, color, positionSmall, positionLarge, setCursorImage, cursorImage, hide }) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 768 }); // Detects small screens

  return (
    <motion.div
      className={`absolute px-6 py-2 md:text-xl text-sm rounded-full text-white bg-${color} 
        ${hide ? "hidden md:flex" : "flex"}`} // Hide on small screens if 'hide' is true
      style={isSmallScreen ? positionSmall : positionLarge} // Different positions for small & large screens
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
