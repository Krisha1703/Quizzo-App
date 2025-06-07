import React from 'react';
import Image from 'next/image';

const Images = ({ signup, footer }) => {
  return (
    <>
      {/* Top and decorative images only when footer is not true */}
      {!footer && (
        <>
          {/* Top Bar */}
          <Image 
            src="/Assets/top-bar.png" 
            width={1000} 
            height={1000} 
            alt="heading" 
            className="absolute left-0 top-0 w-full h-[12vh]"
          />

          {/* Brain Teaser */}
          <Image 
            src="/Assets/brain.png" 
            width={75} 
            height={75} 
            alt="heading" 
            className="absolute left-10 top-1"
          />

          {/* Globe */}
          {!signup && (
            <Image 
              src="/Assets/globe.png" 
              width={100} 
              height={100} 
              alt="heading" 
              className="absolute right-10 top-40 z-10 md:block hidden"
            />
          )}

          {/* Puzzle */}
          {!signup && (
            <Image 
              src="/Assets/puzzle.png" 
              width={100} 
              height={100} 
              alt="heading" 
              className="absolute left-10 bottom-40 z-10 md:block hidden"
            />
          )}
        </>
      )}

      {/* Trophy only when footer is true */}
      {footer && (
        <Image 
          src="/Assets/trophy.png" 
          width={75} 
          height={75} 
          alt="heading" 
          className="absolute right-10 bottom-5 z-10"
        />
      )}

      {/* Bottom Bar: Always show */}
      <Image 
        src="/Assets/bottom-bar.png" 
        width={1000} 
        height={1000} 
        alt="heading" 
        className="absolute left-0 bottom-0 w-full h-[12vh]"
      />
    </>
  );
};

export default Images;
