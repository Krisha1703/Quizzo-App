import React from 'react';
import SectionHeader from './section-header';
import DynamicList from './dynamic-list';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ContentSection = ({ headingText, items, flip = false, image, backgroundimage, imageResize, subheading }) => {
  return (
    <div className="w-11/12 my-5 mx-auto">
      <div className={`flex justify-between items-center gap-10 ${flip ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Text Section */}
        <div className="flex-1">
          <SectionHeader headingText={headingText} />
          <DynamicList
            items={[...items]}
            subheading={subheading}
          />
        </div>

        {/* Image Section */}
        <div className="relative w-[400px] h-[400px] flex items-center justify-center flex-1">
          {/* Background with animation */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotateZ: [0, 10, 0, -10, 0],
              rotateX: [0, 8, 0, -8, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Image
              src={backgroundimage}
              alt="background"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Foreground Mission Image */}
          <div className="relative z-10">
            <Image
              src={image}
              alt="mission"
              width={400}
              height={300}
              className={`object-contain ${imageResize ? 'scale-75' : 'scale-100'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
