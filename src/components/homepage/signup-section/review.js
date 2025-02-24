import React from 'react';
import { Rating } from "@mui/material";

const Review = () => {
  return (
    <p className='flex flex-col italic '>
        <span className='flex md:flex-row flex-col md:items-center text-xl'>
            <Rating
                name="rating"
                value={4} 
                precision={0.5}
                size="large"
                sx={{ color: "#F59E0B" }}
            />
            <span className='font-semibold mx-2 md:block hidden'>-</span>
            <span className='font-semibold text-secondary'>Shreya Mehra (Teacher)</span>
        </span>

        <span className='text-lg'>
            “Quizzo makes creating, organizing, and grading quizzes a breeze. 
            The platform is incredibly user-friendly, allowing you to set up quizzes quickly and manage them effortlessly – highly recommend!” 
        </span>
    </p>
  )
}

export default Review