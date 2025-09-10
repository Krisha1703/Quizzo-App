import Image from "next/image";
import Button from "../navbar/button";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = ({title, content, btntext1, btntext2, btnlink1, btnlink2, image}) => {
  return (
      <div className="grid md:grid-cols-2 items-center m-5">

        {/* Left Column - Text */}
        <div className="w-10/12 mx-auto">
          
          <div className="relative mb-10 text-center ">
            <h1 className="text-3xl font-bold text-primary inline-block relative">
              {title}
              <Image
                src="/Assets/Vector.svg"
                width={120}
                height={100}
                alt="vector"
                className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2"
              />
            </h1>
          </div>

            <p className="text-xl leading-relaxed mb-4 ">
                {content}
            </p>


            {/* CTA Buttons */}
            <div className="flex space-x-4">
                <Link href={btnlink1}>
                    <Button text={btntext1} />
                </Link>
                
                <Link href={btnlink2}>
                    <Button text={btntext2} />
                </Link>
            </div>

        </div>

        {/* Right Column - Hero Image */}
        <motion.div
          className="flex justify-center"
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }} 
          transition={{
            duration: 3, 
            repeat: Infinity, 
            repeatType: "loop", 
            ease: "easeInOut", 
          }}
        >
          <Image
            src={image}
            alt="Hero Image"
            width={400}
            height={400}
            className="object-contain"
          />
        </motion.div>


      </div>
  )
}

export default HeroSection