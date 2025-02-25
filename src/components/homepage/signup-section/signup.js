"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/Navbar/button";
import TypeWritting from "./typwritting";
import Review from "./review";
import Subtext from "./subtext";
import { Modal, Box } from "@mui/material";
import Signup from "@/components/homepage/modal/signup"; 

const SignupSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-center items-center mx-10">
      <div className="flex flex-col gap-4">
        <TypeWritting />
        <Subtext />
        <Review />

        <div className="flex justify-start space-x-4">
          <Button text={"Join as Teacher"} />
          <Button text={"Join as Student"} onClick={() => setOpen(true)} />
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

     {/* Modal for Signup */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",            
            maxWidth: 900,           
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            height: "auto",
          }}
        >
          <Signup onClose={() => setOpen(false)} /> 
        </Box>
      </Modal>

    </div>
  );
};

export default SignupSection;
