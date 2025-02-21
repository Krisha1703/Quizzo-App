import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const Card = ({ title, src, href }) => {
  return (
    <div className="rounded-md overflow-hidden md:w-1/3 w-5/6 h-full shadow-lg my-10">
      {/* Title Section */}
      <div className="bg-primary text-white text-center py-2 text-lg font-semibold">
        {title}
      </div>

      {/* Image Section with Button Overlay */}
      <div className="relative">
        <Image
          src={src}
          width={400} // Adjust size as needed
          height={250}
          alt="card"
          className="w-full h-auto"
        />
        
        {/* Start Quiz Button with Primary Background */}
        <Link href={href}>
            <motion.button 
                initial={{y: 0}}
                whileHover={{y: -5}}
                transition={{duration: 0.5}}
                className="absolute cursor-pointer hover:bg-secondary bottom-4 left-1/3 bg-primary text-white font-bold py-2 px-6 rounded-md">
            Start Quiz
            </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
