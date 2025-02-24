import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const MainText = ({ setCursorImage }) => {
  const [hoveredLetter, setHoveredLetter] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="z-10 md:mx-10 mx-5 flex flex-col "
      onMouseEnter={() => {
        setCursorImage("/Assets/brain.png");
      }}
      onMouseLeave={() => {
        setCursorImage(null); 
      }}
    >
      <h1 className="lg:text-[7rem] md:text-[5rem] text-[4rem] font-bold text-primary tracking-[0.1rem]">
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
                width={75}
                height={75}
                alt="question"
                quality={100}
                className="inline-block"
              />
            ) : hoveredLetter === "U" && letter === "U" ? (
              <Image
                src="/Assets/puzzle.svg"
                width={50}
                height={50}
                alt="puzzle"
                quality={100}
                className="inline-block"
              />
            )  : hoveredLetter === "I" && letter === "I" ? (
              <Image
                src="/Assets/bulb.svg"
                width={75}
                height={75}
                alt="bulb"
                quality={100}
                className="inline-block"
              />
            ) : hoveredLetter === "Z" && (index === 3 || index === 4) ? (
              <Image
                src="/Assets/pencil.svg"
                width={75}
                height={75}
                alt="pencil"
                quality={100}
                className="inline-block"
              />
            ) : hoveredLetter === "O" && letter === "O" ? (
              <Image
                src="/Assets/check.svg"
                width={75}
                height={75}
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
        className="md:text-[1.6rem] text-md font-semibold bg-secondary p-2 px-6 rounded-md text-white"
        whileHover={{ backgroundColor: "#1E3A8A" }}
      >
        Streamline Quizzes, Simplify Learning!
      </motion.p>
    </motion.div>
  );
};

export default MainText;
