import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const MainText = ({ setCursorImage }) => {
  const [hoveredLetter, setHoveredLetter] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="z-10 mx-10 flex flex-col "
      onMouseEnter={() => {
        setCursorImage("/Assets/brain.png");
      }}
      onMouseLeave={() => {
        setCursorImage(null); 
      }}
    >
      <h1 className="text-[7rem] font-bold text-primary">
        {["Q", "U", "I", "Z", "Z", "O"].map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block"
            onMouseEnter={() => {
              setHoveredLetter(letter);
            }}
            onMouseLeave={() => {
              setHoveredLetter(null);
            }}
          >
            {hoveredLetter === "Q" && letter === "Q" ? (
              <Image
                src="/Assets/question.svg"
                width={100}
                height={100}
                alt="question"
                quality={100}
                className="inline-block"
              />
            ) : hoveredLetter === "U" && letter === "U" ? (
              <Image
                src="/Assets/puzzle.svg"
                width={75}
                height={75}
                alt="puzzle"
                quality={100}
                className="inline-block"
              />
            )  : hoveredLetter === "I" && letter === "I" ? (
              <Image
                src="/Assets/bulb.svg"
                width={100}
                height={100}
                alt="bulb"
                quality={100}
                className="inline-block"
              />
            ) : hoveredLetter === "Z" && (index === 3 || index === 4) ? (
              <Image
                src="/Assets/pencil.svg"
                width={100}
                height={100}
                alt="pencil"
                quality={100}
                className="inline-block"
              />
            ) : hoveredLetter === "O" && letter === "O" ? (
              <Image
                src="/Assets/check.svg"
                width={100}
                height={100}
                alt="check"
                quality={100}
                className="inline-block"
              />
            ) : (
              letter
            )}
          </motion.span>
        ))}
      </h1>

      <motion.p
        className="text-[1.6rem] font-semibold bg-secondary p-2 px-6 rounded-md text-white"
        whileHover={{ backgroundColor: "#1E3A8A" }}
      >
        Streamline Quizzes, Simplify Learning!
      </motion.p>
    </motion.div>
  );
};

export default MainText;
