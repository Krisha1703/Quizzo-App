import React from 'react';
import Image from 'next/image';
import Button from '@/components/Navbar/button';
import TypeWritting from './typwritting';
import Review from './review';
import Subtext from './subtext';

const Hero = () => {

  return (
    <div className='flex md:flex-row flex-col-reverse justify-center items-center mx-5'>
        <div className='flex flex-col gap-4'>
            
            <TypeWritting />
            <Subtext />
            <Review />

            <div className='flex justify-start space-x-4'>
                <Button text={"Join as Teacher"} />
                <Button text={"Join as Student"} />
            </div>
            
        </div>

        <Image src="/Assets/hero.png" width={300} height={300} alt='hero' quality={100} className='w-full'/>
    </div>
  )
}

export default Hero