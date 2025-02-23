import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IconButton } from "@mui/material";
import Card from "@/components/homepage/quiz-card";

const CardSlider = ({ cards }) => {
  const [hoveredPrev, setHoveredPrev] = useState(false);
  const [hoveredNext, setHoveredNext] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSmallScreen(window.innerWidth < 768);
    }
  }, []);

  const cardsPerPage = isSmallScreen ? 1 : 4;

  const displayedCards = cards.slice(currentIndex, currentIndex + cardsPerPage);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - cardsPerPage);
    }
  };

  const handleNext = () => {
    if (currentIndex + cardsPerPage < cards.length) {
      setCurrentIndex(currentIndex + cardsPerPage);
    }
  };

  return (
    <div className="w-full mx-auto my-5">
      <div className="flex flex-row justify-center items-center md:gap-4 m-5">
        {/* Prev Button */}
        <IconButton
          sx={{
            backgroundColor: "#1E3A8A",
            borderRadius: "50%",
            padding: 1,
            "&:hover": {
              backgroundColor: "#10B981",
            },
          }}
          onMouseEnter={() => setHoveredPrev(true)}
          onMouseLeave={() => setHoveredPrev(false)}
          onClick={handlePrev}
        >
          <Image
            src={hoveredPrev ? "/Assets/next-hover.png" : "/Assets/next.png"}
            alt="Prev"
            width={30}
            height={30}
            style={{
              transform: "rotate(180deg)", 
            }}
          />
        </IconButton>

        {/* Cards */}
        <div className="flex overflow-hidden w-full justify-center gap-4">
          {displayedCards.map((card, index) => (
            <Card key={index} title={card.title} src={card.src} href={card.href} />
          ))}
        </div>

        {/* Next Button */}
        <IconButton
          sx={{
            backgroundColor: "#1E3A8A",
            borderRadius: "50%",
            padding: 1,
            "&:hover": {
              backgroundColor: "#10B981",
            },
          }}
          onMouseEnter={() => setHoveredNext(true)}
          onMouseLeave={() => setHoveredNext(false)}
          onClick={handleNext}
        >
          <Image
            src={hoveredNext ? "/Assets/next-hover.png" : "/Assets/next.png"}
            alt="Next"
            width={30}
            height={30}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default CardSlider;
