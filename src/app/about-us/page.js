"use client";

import Navbar from "@/components/navbar/navbar";
import HeroSection from "@/components/menu-page/hero-section";
import Statistics from "@/components/menu-page/statistics";
import ContentSection from "@/components/menu-page/content-section";

export default function AboutPage() {
  return (
    <div className="w-full mx-auto my-5 ">
      <Navbar home={false} menupage={true}/>

      <HeroSection
        title="About Quizzo"
        content="At Quizzo, we believe education should be engaging, accessible, and data-driven. Our platform bridges the gap 
        between teachers and students by making it easy to create, share, and track quizzes, assignments, and 
        resources—all in one place. With real-time insights and collaborative tools, Quizzo transforms learning"
        btntext1="Join as Teacher"
        btntext2="Join as Student"
        btnlink1="/quizzes"
        btnlink2="/learn"
        image="/Assets/about-us.png"
      />

      <Statistics />

      <ContentSection
        headingText="Our Mission"
        image={"/Assets/mission.png"}
        subheading={"Our mission is to provide simple, interactive, and fun ways for teachers and students to connect, learn, and grow together."}
        backgroundimage={"/Assets/background.svg"}
        items={[
            "Deliver engaging quizzes and learning activities for students of all ages.",
            "Support teachers with smart, easy-to-use tools.",
            "Foster collaboration between students and teachers.",
        ]}
      />

       <ContentSection
        headingText="Our Vision"
        image={"/Assets/vission.png"}
        subheading={"Our vision is to transform learning into an engaging, inclusive, and enjoyable experience where students feel motivated to explore, grow, and succeed."}
        backgroundimage={"/Assets/background-2.svg"}
        items={[
            "Provide equal learning opportunities for all students.",
            "Empower students with confidence and a love for learning.",
            "Create a connected learning community.",
        ]}
        flip={true}
        imageResize={true}
      />

    </div>
  );
}
