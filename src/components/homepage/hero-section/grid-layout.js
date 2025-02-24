import React from 'react'

const GridLayout = ({setCursorImage}) => {
  return (
     <div className="absolute inset-0 grid grid-cols-12 grid-rows-12" onMouseEnter={() => setCursorImage("/Assets/quiz-cursor.png")}
     onMouseLeave={() => setCursorImage(null)}>
     {[...Array(12)].map((_, rowIndex) => (
       <div
         key={rowIndex}
         className="absolute top-0 left-0 w-full h-px bg-gray-200"
         style={{ top: `${(rowIndex + 1) * 8.33}%` }}
       />
     ))}
     {[...Array(24)].map((_, colIndex) => (
       <div
         key={colIndex}
         className="absolute top-0 left-0 h-full w-px bg-gray-200"
         style={{ left: `${(colIndex + 1) * 4.33}%` }}
       />
     ))}
   </div>
  )
}

export default GridLayout