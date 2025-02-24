import React from "react";
import GridLayout from "./grid-layout";
import MainText from "./main-text";
import Tag from "./tag";
import CustomCursor from "./custom-cursor";

const Hero = () => {
  return (
    <div className="relative w-full cursor-none h-screen flex items-center overflow-hidden bg-white">
      <GridLayout />
      <MainText />
      <CustomCursor />

      {/* Tags with absolute positioning */}
      <Tag text="Class Management" color="primary" position={{ top: "10%", left: "10%" }} />
      <Tag text="Quiz Management" color="secondary" position={{ top: "30%", left: "70%" }} />
      <Tag text="Easy Quiz Creation" color="primary" position={{ top: "50%", left: "50%" }} />
      <Tag text="Interactive Learning" color="secondary" position={{ top: "70%", left: "60%" }} />
    </div>
  );
};

export default Hero;
