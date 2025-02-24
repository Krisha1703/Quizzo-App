"use client";
import React, { useState } from "react";
import GridLayout from "./grid-layout";
import MainText from "./main-text";
import Tag from "./tag";
import CustomCursor from "./custom-cursor";

const Hero = () => {
  const [cursorImage, setCursorImage] = useState(null);

  return (
    <div className="relative w-full cursor-none h-screen flex items-center overflow-hidden bg-white">
      <GridLayout setCursorImage={setCursorImage} />
      <MainText setCursorImage={setCursorImage} />
      <CustomCursor image={cursorImage} />

      {/* Tags with absolute positioning */}
      <Tag
        text="Class Management"
        color="primary"
        position={{ top: "10%", left: "10%" }}
        setCursorImage={setCursorImage}
        cursorImage="/Assets/multi-pointer.svg"
      />
      <Tag
        text="Quiz Management"
        color="secondary"
        position={{ top: "30%", left: "70%" }}
        setCursorImage={setCursorImage}
        cursorImage="/Assets/pointer.svg"
      />
      <Tag
        text="Easy Quiz Creation"
        color="primary"
        position={{ top: "50%", left: "50%" }}
        setCursorImage={setCursorImage}
        cursorImage="/Assets/multi-pointer.svg"
      />
      <Tag
        text="Interactive Learning"
        color="secondary"
        position={{ top: "70%", left: "60%" }}
        setCursorImage={setCursorImage}
        cursorImage="/Assets/pointer.svg"
      />
    </div>
  );
};

export default Hero;
