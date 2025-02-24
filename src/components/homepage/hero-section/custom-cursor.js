"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const CustomCursor = ({ image }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const moveCursor = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener("mousemove", moveCursor);
      return () => window.removeEventListener("mousemove", moveCursor);
    }
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "tween", ease: "linear", duration: 0.1 }}
    >
      {image && (
        <Image
          src={image}
          alt="cursor"
          width={30}
          height={30}
          quality={100}
          className="-rotate-[30deg]"
        />
      )}
    </motion.div>
  );
};

export default CustomCursor;
