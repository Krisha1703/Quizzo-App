"use client";

import Navbar from "@/components/navbar/navbar";
import HeroSection from "@/components/menu-page/hero-section";
import SectionHeader from "@/components/menu-page/section-header";
import Image from "next/image";
import ContactForm from "@/components/menu-page/contact-form";

export default function ContactPage() {
  return (
    <div className="w-full mx-auto my-5 ">
      <Navbar home={false} menupage={true}/>

      <HeroSection
        title="Contact Us"
        content="At Quizzo, we value every question, idea, and piece of feedback from our learners, teachers, and community. 
        Whether you need support, want to collaborate, or just say hello — we’re here to listen and help."
        btntext1="Get in Touch"
        btnlink1="/contact-us"
        image="/Assets/contact-us.png"
      />

      <div className="mx-10 mt-10">
        <SectionHeader headingText="Let’s Connect" />
        <p className="text-xl my-3 max-w-2xl">We’re here to answer questions, hear your ideas, and support your learning journey. Reach out anytime — we’d love to connect!</p>
        <div className="flex justify-between mx-20">
          <Image src="/Assets/connect.png" width={400} height={400} alt="Email" />
          <ContactForm />
        </div>

      </div>

    </div>
  );
}
