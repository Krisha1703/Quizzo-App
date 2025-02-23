import React from 'react';
import formatTime from './timer';

const Menus = ({ timer, isFlickering, score, attempts }) => {
  return (
    <div className="flex justify-center md:space-x-5">
      <div className="p-2 my-5 font-semibold text-xl text-center border md:w-2/12 w-1/2 cursor-pointer bg-primary text-white rounded-md">Score: {score}</div>
      <div className="p-2 my-5 font-semibold text-xl text-center border md:w-2/12 w-1/2 cursor-pointer bg-primary text-white rounded-md">Attempt: {attempts}</div>
      <div className={`p-2 my-5 font-semibold text-xl text-center border md:w-2/12 w-1/2 cursor-pointer bg-primary text-white rounded-md ${isFlickering ? 'animate-pulse' : ''}`}>
        Time: {formatTime(timer)}
      </div>
    </div>
  );
};

export default Menus;
