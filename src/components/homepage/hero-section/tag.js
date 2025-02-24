import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const Tag = ({ text, color, positionSmall, positionLarge, setCursorImage, cursorImage, hide }) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  const [dragConstraints, setDragConstraints] = useState({ top: 0, left: 0, right: 0, bottom: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDragConstraints({
        top: 0,
        left: 0,
        right: window.innerWidth,
        bottom: window.innerHeight,
      });
    }
  }, []); 

  return (
    <motion.div
      className={`absolute px-6 py-2 md:text-xl text-sm rounded-full text-white bg-${color} 
        ${hide ? "hidden md:flex" : "flex"}`}
      style={isSmallScreen ? positionSmall : positionLarge}
      onMouseEnter={() => setCursorImage(cursorImage)}
      onMouseLeave={() => setCursorImage(null)}
      whileHover={{
        rotate: [0, 2, -2, 2, 0],
        transition: { repeat: Infinity, duration: 0.5 },
      }}
      drag
      dragConstraints={dragConstraints}
    >
      {text}
    </motion.div>
  );
};

export default Tag;
