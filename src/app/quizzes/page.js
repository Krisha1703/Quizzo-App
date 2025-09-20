"use client";

import Navbar from "@/components/navbar/navbar";
import SectionHeader from "@/components/menu-page/section-header";
import Image from "next/image";
import Card from "@/components/homepage/quiz-card";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Search } from "@mui/icons-material";

export default function QuizPage() {
   const cards = [
    { title: "General Knowledge", src: "/Assets/general-knowledge.png", href: "/instruction" },
    { title: "Science & Nature", src: "/Assets/science-nature.png", href: "/instruction" },
    { title: "History", src: "/Assets/history.png", href: "/instruction" },
    { title: "Geography", src: "/Assets/geography.png", href: "/instruction" },
    { title: "General Knowledge", src: "/Assets/general-knowledge.png", href: "/instruction" },
    { title: "Science & Nature", src: "/Assets/science-nature.png", href: "/instruction" },
    { title: "History", src: "/Assets/history.png", href: "/instruction" },
    { title: "Geography", src: "/Assets/geography.png", href: "/instruction" },
  ];
  
  return (
    <div className="w-full mx-auto my-5 ">
      <Navbar home={false} menupage={true}/>

      <div className="mx-10 mt-10">
        <SectionHeader headingText="Explore Quizzes" />
        <p className="text-xl my-3 max-w-2xl">Choose from a wide range of quizzes to challenge yourself and learn.</p>

        <div className="flex items-center justify-between gap-4 w-full">
      {/* Left side buttons */}
      <div className="flex items-center gap-3">
        {/* Category Button */}
        <button className="flex items-center gap-1 px-10 py-2 rounded-md bg-primary text-white transition">
          <span>Category</span>
          <ExpandMoreIcon size={16} />
        </button>

        {/* Facility Button */}
        <button className="flex items-center gap-1 px-10 py-2 rounded-md bg-primary text-white transition">
          <span>Difficult</span>
          <ExpandMoreIcon size={16} />
        </button>
      </div>

      {/* Right side search */}
     <div className="relative flex-1 max-w-sm w-full">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="text-white w-5 h-5" />
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Search..."
          className="w-11/12 pl-10 pr-4 py-2 rounded-md bg-primary text-white placeholder-white 
                    focus:outline-none focus:ring-0"
        />
    </div>

    </div>

        <div className="flex flex-wrap overflow-hidden w-full justify-start gap-4 gap-y-0">
          {cards.map((card, index) => (
            <Card key={index} title={card.title} src={card.src} href={card.href} quizpage={true}/>
          ))}
        </div>

      </div>

    </div>
  );
}
