"use client";

import Button from "@/components/navbar/button";
import Image from "next/image";
import Link from "next/link";
import {motion} from "framer-motion";

export default function AboutPage() {
  return (
    <div className="w-10/12 mx-auto ">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-5 items-center my-5 mt-10">
        {/* Left Column - Text */}
        <div>
          
          <div className="relative mb-10 text-center">
            <h1 className="text-3xl font-bold text-primary inline-block relative">
              About Quizzo
              <Image
                src="/Assets/Vector.svg"
                width={120}
                height={100}
                alt="vector"
                className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2"
              />
            </h1>
          </div>



          <p className="text-xl leading-relaxed mb-4">
            At Quizzo, we believe education should be engaging, accessible, and data-driven. Our platform bridges the gap 
            between teachers and students by making it easy to create, share, and track quizzes, assignments, and 
            resources—all in one place. With real-time insights and collaborative tools, Quizzo transforms learning 
            into a fun and interactive journey.
          </p>


          {/* CTA Buttons */}
          <div className="flex space-x-4">
            <Link href="/quizzes">
              <Button text={"Join as Teacher"} />
            </Link>
            <Link href="/learn">
              <Button text={"Join as Student"} />
            </Link>
          </div>
        </div>

        {/* Right Column - Hero Image */}
        <motion.div
          className="flex justify-center"
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }} // moves up then back down
          transition={{
            duration: 3, // speed of one full cycle
            repeat: Infinity, // infinite loop
            repeatType: "loop", // smooth continuous loop
            ease: "easeInOut", // smooth easing
          }}
        >
          <Image
            src="/Assets/about-us.png"
            alt="About Quizzo"
            width={400}
            height={400}
            className="object-contain"
          />
        </motion.div>


      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-center my-10">
    <div>
      <h2 className="text-4xl font-bold text-primary">10+</h2>
      <h2 className="text-3xl font-bold text-primary">Teachers</h2>
    </div>
    <div>
       <h2 className="text-4xl font-bold text-primary">5+</h2>
      <h2 className="text-3xl font-bold text-primary">Classes</h2>
    </div>
    <div>
       <h2 className="text-4xl font-bold text-primary">50+</h2>
      <h2 className="text-3xl font-bold text-primary">Students</h2>
    </div>
    <div>
       <h2 className="text-4xl font-bold text-primary">30+</h2>
      <h2 className="text-3xl font-bold text-primary">Quizzes</h2>
    </div>
  </div>

    </div>
  );
}
