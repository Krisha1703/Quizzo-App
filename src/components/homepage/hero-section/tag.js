import React from "react";

const Tag = ({ text, color, position }) => {
  return (
    <div
      className={`absolute rounded-full bg-${color} text-white text-xl px-6 p-2 z-10`}
      style={{ top: position.top, left: position.left, position: "absolute" }}
    >
      {text}
    </div>
  );
};

export default Tag;
