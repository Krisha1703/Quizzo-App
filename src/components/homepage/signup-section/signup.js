"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/navbar/button";
import TypeWritting from "./typwritting";
import Review from "./review";
import Subtext from "./subtext";
import { Modal, Box } from "@mui/material";
import Signup from "@/components/homepage/modal/signup";
import Login from "@/components/homepage/modal/login"; 

const SignupSection = () => {
  const [activeModal, setActiveModal] = useState(null); 

  return (
    <div className="flex md:flex-row flex-col-reverse justify-center items-center mx-10">
      <div className="flex flex-col gap-4">
        <TypeWritting />
        <Subtext />
        <Review />

        <div className="flex justify-start space-x-4">
          <Button text={"Join as Teacher"} onClick={() => setActiveModal("signup")}/>
          <Button text={"Join as Student"} onClick={() => setActiveModal("signup")} />
        </div>
      </div>

      <Image
        src="/Assets/hero.png"
        width={300}
        height={300}
        alt="hero"
        quality={100}
        className="w-full"
      />

      {/* Modal for Signup or Login */}
      <Modal open={!!activeModal} onClose={() => setActiveModal(null)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: activeModal === "signup" ? "90%" : "70%", 
          maxWidth: activeModal === "signup" ? 900 : 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          height: "auto",
        }}
      >
        {activeModal === "signup" ? (
          <Signup onClose={() => setActiveModal(null)} onSwitchToLogin={() => setActiveModal("login")} />
        ) : (
          <Login onClose={() => setActiveModal(null)} onSwitchToSignup={() => setActiveModal("signup")} />
        )}
      </Box>

      </Modal>
    </div>
  );
};

export default SignupSection;
