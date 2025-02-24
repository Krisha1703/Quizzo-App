import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const words = ["Master Quizzes", "Elevate Learning", "Track Progress"];

const TypeWritting = () => {

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const nextText = words[currentWordIndex].substring(0, displayedText.length + (isDeleting ? -1 : 1));
    const timeout = setTimeout(() => {
      setDisplayedText(nextText);
      if (!isDeleting && nextText === words[currentWordIndex]) {
        setTimeout(() => setIsDeleting(true), 3000); // Wait before starting to delete
      } else if (isDeleting && nextText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex]);

  useEffect(() => {
    const cursorBlink = setInterval(() => setCursor((v) => !v), 500);
    return () => clearInterval(cursorBlink);
  }, []);

  return (
    <motion.div className="text-primary flex items-center justify-start font-semibold text-3xl relative group mt-5">
      <div className="relative">
        {displayedText}
        {cursor && '|'}
      </div>

      {/* Arrow Appears Below on Hover */}
      <motion.div
          initial={{ x: 10 }}
          whileHover={{ x: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Image src="/Assets/arrow.png" width={100} height={100} alt="arrow" className='cursor-pointer' />
        </motion.div>

    </motion.div>
  );
}

export default TypeWritting;
