"use client";
import React from "react";
import CardSlider from "@/components/homepage/card-slider";
import Navbar from "@/components/Navbar/navbar";
import SignUp from "@/components/homepage/signup-section/signup";
import Hero from "@/components/homepage/hero-section/hero";

export default function Home() {
  const cards = [
    { title: "General Knowledge", src: "/Assets/general-knowledge.png", href: "/instruction" },
    { title: "Science & Nature", src: "/Assets/science-nature.png", href: "/instruction" },
    { title: "History", src: "/Assets/history.png", href: "/instruction" },
    { title: "Geography", src: "/Assets/geography.png", href: "/instruction" },
    { title: "Technology", src: "/Assets/technology.png", href: "/instruction" },
    { title: "Art", src: "/Assets/art.png", href: "/instruction" },
  ];

  return (
    <div className="w-full mx-auto my-5">
      <Navbar />
      <Hero />
      <SignUp />
      <CardSlider cards={cards} />
    </div>
  );
}
