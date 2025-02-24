import React from 'react';
import {motion} from 'framer-motion';

const MainText = () => {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 mx-10"
      >
        <h1 className="text-[7rem] font-bold text-primary">QUIZZO</h1>
        <motion.p className="text-[1.6rem] font-semibold -mt-5 ml-2 bg-secondary p-2  rounded-md text-white" whileHover={{backgroundColor: "#1E3A8A"}}>Streamline Quizzes, Simplify Learning!</motion.p>
      </motion.div>
  )
}

export default MainText