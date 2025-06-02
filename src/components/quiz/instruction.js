import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Instruction = () => {
  return (
    <div className="md:w-2/3 w-5/6 mx-auto p-6 bg-white shadow-lg rounded-md">
        <div className="flex justify-between">
            <h2 className="md:text-xl text-md font-bold text-primary mb-4">Quiz Instructions</h2>
            <Link href={"/"}>
                <Image src="/Assets/home.png" width={50} height={50} alt="home" className="cursor-pointer"/>
            </Link>
        </div>
      <ul className="list-disc md:text-lg text-sm list-inside text-gray-700 space-y-2">
      <li>For multiple-choice questions, select the one best answer (A, B, C, or D).</li>
        <li>For integer-type questions, write your numerical answer clearly.</li>
        <li>No calculators unless specified.</li>
        <li>You have <strong>30 seconds</strong> per question.</li>
        <li>There is only <strong>one correct answer</strong> for each question.</li>
        <li>You <strong>cannot go back</strong> to previous questions once answered.</li>
        <li>Each correct answer awards <strong>+10 points</strong>.</li>
        <li>If the timer finishes, your quiz will be <strong>saved and submitted automatically</strong>.</li>
        <li>A detailed solution and explanation will be provided at the end of each question.</li>
        <li>Ensure a <strong>stable internet connection</strong> for the best experience.</li>
        <li>Click the <strong>Start Quiz</strong> button to begin.</li>
      </ul>

       {/* Start Quiz Button with Primary Background */}
       <Link href={"/quiz"}>
        <motion.button 
                initial={{y: 0}}
                whileHover={{y: -5}}
                transition={{duration: 0.5}}
                className=" cursor-pointer my-5 hover:bg-secondary bg-primary text-white font-bold py-2 px-6 rounded-md">
            Start Quiz
            </motion.button>
        </Link>

    </div>
  );
};

export default Instruction;
