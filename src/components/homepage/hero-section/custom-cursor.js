"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 cursor-none z-50"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "tween", ease: "linear", duration: 0.1 }}
    >
      <Image src="/Assets/multi-pointer.png" alt="cursor" width={20} height={20} quality={100} className="-rotate-[30deg]"/>
    </motion.div>
  );
};

export default CustomCursor;
