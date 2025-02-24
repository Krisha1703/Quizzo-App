"use client";
import React, { useState } from "react";
import GridLayout from "./grid-layout";
import MainText from "./main-text";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("./custom-cursor"), {ssr: false});
const Tag = dynamic(() => import("./tag"), {ssr: false});

const Hero = () => {
  const [cursorImage, setCursorImage] = useState(null);

  return (
    <div className="relative w-full cursor-none md:h-screen h-[60vh] flex items-center overflow-hidden bg-white">
      <GridLayout setCursorImage={setCursorImage} />
      <MainText setCursorImage={setCursorImage} />
      <CustomCursor image={cursorImage} />

      {/* Tags with absolute positioning */}
      <Tag
        text="Class Management"
        color="primary"
        positionLarge={{ top: "10%", left: "5%" }}
        positionSmall={{ top: "5%", left: "5%" }}
        setCursorImage={setCursorImage}
        cursorImage="/Assets/multi-pointer.svg"
      />
      <Tag
        text="Quiz Management"
        color="secondary"
        positionLarge={{ top: "80%", left: "10%" }}
        positionSmall={{ top: "20%", left: "7%" }}
        setCursorImage={setCursorImage}
        cursorImage="/Assets/pointer.svg"
      />
      <Tag
        text="Easy Quiz Creation"
        color="primary"
        positionLarge={{ top: "80%", left: "40%" }}
        positionSmall={{ top: "20%", left: "55%" }}
        setCursorImage={setCursorImage}
        cursorImage="/Assets/multi-pointer.svg"
      />
      <Tag
        text="Interactive Learning"
        color="secondary"
        positionLarge={{ top: "10%", left: "28%" }}
        positionSmall={{ top: "5%", left: "55%" }}
        setCursorImage={setCursorImage}
        cursorImage="/Assets/pointer.svg"
      />
      <Tag
        text="Timed & Adaptive Quizzes"
        color="primary"
        positionLarge={{ top: "10%", left: "50%" }}
        positionSmall={{ top: "80%", left: "10%" }}
        setCursorImage={setCursorImage}
        cursorImage="/Assets/multi-pointer.svg"
      />
      <Tag
        text="Instant Quiz Feedback"
        color="secondary"
        positionLarge={{ top: "30%", left: "50%" }}
        setCursorImage={setCursorImage}
        cursorImage="/Assets/pointer.svg"
        hide
      />
       <Tag
        text="Gamified Learning Experience"
        color="primary"
        positionLarge={{ top: "60%", left: "50%" }}
        setCursorImage={setCursorImage}
        cursorImage="/Assets/multi-pointer.svg"
        hide
      />
      <Tag
        text="Quiz Analytics"
        color="secondary"
        positionLarge={{ top: "50%", left: "80%" }}
        setCursorImage={setCursorImage}
        cursorImage="/Assets/pointer.svg"
        hide
      />
      <Tag
        text="Mobile Friendly"
        color="secondary"
        positionSmall={{ top: "70%", left: "60%" }} 
        positionLarge={{ top: "10%", left: "80%" }} 
        setCursorImage={setCursorImage}
        cursorImage="/Assets/pointer.svg"
      />
      <Tag
        text="Leaderboard & Scores"
        color="primary"
        positionLarge={{ top: "30%", left: "75%" }}
        setCursorImage={setCursorImage}
        cursorImage="/Assets/multi-pointer.svg"
        hide
      />
      <Tag
        text="Seamless User Experience"
        color="secondary"
        positionLarge={{ top: "75%", left: "70%" }}
        setCursorImage={setCursorImage}
        cursorImage="/Assets/pointer.svg"
        hide
      />
      <Tag
        text="Flexible Question Types"
        color="primary"
        positionLarge={{ top: "23%", left: "15%" }}
        setCursorImage={setCursorImage}
        cursorImage="/Assets/multi-pointer.svg"
        hide
      />

    </div>
  );
};

export default Hero;
