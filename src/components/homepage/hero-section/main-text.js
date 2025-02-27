import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const imageMap = {
  Q: "/Assets/question.svg",
  U: "/Assets/puzzle.svg",
  I: "/Assets/bulb.svg",
  Z: "/Assets/pencil.svg",
  O: "/Assets/check.svg",
};

const MainText = ({ setCursorImage }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="z-10 md:mx-10 mx-5 flex flex-col"
      onMouseEnter={() => setCursorImage("/Assets/brain.png")}
      onMouseLeave={() => setCursorImage(null)}
    >
      <h1 className="lg:text-[7rem] md:text-[5rem] text-[4rem] font-bold text-primary tracking-[0.1rem] flex items-center">
        {["Q", "U", "I", "Z", "Z", "O"].map((letter, index) => (
          <motion.span
            key={index}
            className="inline-flex items-center justify-center"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            layout
            style={{
              marginLeft: hoveredIndex === index - 1 ? "0.5rem" : "0",
              marginRight: hoveredIndex === index + 1 ? "0.5rem" : "0",
            }}
          >
            {hoveredIndex === index && imageMap[letter] ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0}}
                transition={{ duration: 0.2 , ease: "easeInOut" }}
                className="inline-flex"
              >
                <Image
                  src={imageMap[letter]}
                  width={65}
                  height={65}
                  alt={letter}
                  quality={100}
                  className="inline-block"
                />
              </motion.div>
            ) : (
              <motion.span layout className="inline-block">
                {letter}
              </motion.span>
            )}
          </motion.span>
        ))}
      </h1>

      <motion.p
        className="md:text-[1.6rem] text-md font-semibold bg-secondary p-2 px-6 rounded-md text-white"
        whileHover={{ backgroundColor: "#1E3A8A" }}
      >
        Streamline Quizzes, Simplify Learning!
      </motion.p>
    </motion.div>
  );
};

export default MainText;
