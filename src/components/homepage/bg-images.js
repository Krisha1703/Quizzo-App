import React from 'react';
import Image from 'next/image';

const Images = ({ signup }) => {
  return (
    <>
      {/* Top image: Stays at the top */}
      <Image 
        src="/Assets/top-bar.png" 
        width={1000} 
        height={1000} 
        alt="heading" 
        className="absolute left-0 top-0 w-full h-[12vh]"
      />

      {/* Brain Teaser Image */}
      <Image 
        src="/Assets/brain.png" 
        width={75} 
        height={75} 
        alt="heading" 
        className="absolute left-10 top-1"
      />

      {/* Globe Image */}
      {!signup && (
        <Image 
          src="/Assets/globe.png" 
          width={100} 
          height={100} 
          alt="heading" 
          className="absolute right-10 top-40 z-10 md:block hidden"
        />
      )}

      {/* Puzzle Image */}
      {!signup && (
        <Image 
          src="/Assets/puzzle.png" 
          width={100} 
          height={100} 
          alt="heading" 
          className="absolute left-10 bottom-40 z-10 md:block hidden"
        />
      )}

      {/* Trophy Image */}
      <Image 
        src="/Assets/trophy.png" 
        width={75} 
        height={75} 
        alt="heading" 
        className="absolute right-10 bottom-5 z-10"
      />

      {/* Bottom image: Stays fixed at the bottom */}
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
