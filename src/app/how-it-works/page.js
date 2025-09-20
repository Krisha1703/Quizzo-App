"use client";

import Navbar from "@/components/navbar/navbar";
import HeroSection from "@/components/menu-page/hero-section";
import ContentSection from "@/components/menu-page/content-section";

export default function HowItWorksPage() {
  return (
    <div className="w-full mx-auto my-5 ">
      <Navbar home={false} menupage={true}/>

      <HeroSection
        title="How It Works"
        content="Whether you’re a student or a teacher, Quizzo helps you create, manage, and take quizzes seamlessly. Track progress, 
        get instant results, and stay organized—all in one platform."
        btntext1="For Teacher"
        btntext2="For Student"
        btnlink1="/how-it-works"
        btnlink2="/how-it-works"
        image="/Assets/how-it-works.png"
      />

      <ContentSection
        headingText="For Teachers"
        image={"/Assets/mission.png"}
        subheading={"Quizzo helps teachers create, manage, and track quizzes effortlessly."}
        backgroundimage={"/Assets/background.svg"}
        items={[
            "Create classes quickly and invite students.",
            "Upload class materials and create assignments.",
            "Track student’s assignment submissions.",
            "Review and grade the assignments."
        ]}
      />

       <ContentSection
        headingText="For Students"
        image={"/Assets/vission.png"}
        subheading={"Quizzo makes studying engaging and easy. Track your progress, take quizzes, and review results instantly."}
        backgroundimage={"/Assets/background-2.svg"}
        items={[
            "Find your classes or join with a code.",
            "Learn and play various quizzes.",
            "Upload your work and track submission status.",
            "See scores, stats, and areas to improve."
        ]}
        flip={true}
        imageResize={true}
      />

    </div>
  );
}
