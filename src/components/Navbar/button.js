import React from 'react';
import {motion} from "framer-motion";

const Button = ({text, onClick, type}) => {
  return (
    <motion.button 
        className='bg-primary hover:bg-secondary p-2 px-6 text-xl text-white font-semibold rounded-md text-center'
        initial={{y: 0}}
        whileHover={{y: -5}}
        onClick={onClick}
        type={type}
        transition={{duration: 0.5, ease: "easeInOut"}}
    >
        {text}
    </motion.button>
  )
}

export default Button