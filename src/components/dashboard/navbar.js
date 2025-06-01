"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import MenuItem from "@/components/Navbar/menu-item";
import SearchBar from "@/components/Navbar/search-bar";
import { Drawer, IconButton, Modal, Box } from "@mui/material";
import Button from "@/components/Navbar/button";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import Login from "../homepage/modal/login";
import Signup from "@/components/dashboard/create-class"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [initials, setInitials] = useState(null);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [joinCode, setJoinCode] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const firstName = user.firstName || "";
        const lastName = user.lastName || "";
        const userInitials = (firstName[0] || "") + (lastName[0] || "");
        setInitials(userInitials.toUpperCase());
        setFirst(firstName);
        setLast(lastName);
        setUserRole(user.role);
      }
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const openLoginModal = () => setActiveModal("login");
  const openSignupModal = () => setActiveModal("signup");
  const closeModal = () => setActiveModal(null);

  const handleJoinClass = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch("/api/class/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classCode: joinCode, studentId: user.userId }),
      });
      const result = await response.json();
      alert(result.message || result.error);
      setJoinCode("");
      closeModal();
    } catch (error) {
      alert("Failed to join class.");
    }
  };

  return (
    <div className="relative z-50 bg-white">
      {/* Desktop Navbar */}
      <div className="hidden lg:flex items-center justify-between p-4 py-1 mx-5">
        <Image
          src="/Assets/hovered-logo.png"
          width={120}
          height={120}
          alt="logo"
          className="cursor-pointer"
        />

        <MenuItem title="Classes" create />
        <MenuItem title="Quizzes" create />

        <div className="flex-1 max-w-sm">
          <SearchBar />
        </div>

        {userRole === "Teacher" ? (
          <MenuItem title="+ Create" create onClick={openSignupModal} />
        ) : (
          <MenuItem title="Join Class" create onClick={() => setActiveModal("join")} />
        )}

        <MenuItem title="FAQs" create />

        {initials ? (
          <div className="bg-secondary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
            {initials}
          </div>
        ) : (
          <Button text={"Log in"} onClick={openLoginModal} />
        )}
      </div>

      {/* Mobile Navbar */}
      <div className="flex lg:hidden items-center justify-between p-4 mx-5">
        <Image
          src="/Assets/hovered-logo.png"
          width={100}
          height={100}
          alt="logo"
          className="cursor-pointer"
        />
        <IconButton onClick={toggleMenu} color="primary" aria-label="menu">
          <MenuIcon />
        </IconButton>
      </div>

      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={toggleMenu}
        sx={{
          width: "250px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "250px",
            padding: "20px",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          },
        }}
      >
        <div className="flex justify-end mb-4">
          <IconButton onClick={toggleMenu} aria-label="close menu">
            <CloseIcon />
          </IconButton>
        </div>

        <MenuItem title="Classes" create />
        <MenuItem title="Quizzes" create />

        {userRole === "Teacher" ? (
          <MenuItem title="+ Create" create onClick={openSignupModal} />
        ) : (
          <MenuItem title="Join Class" create onClick={() => setActiveModal("join")} />
        )}

        <MenuItem title="FAQs" create />

        {first || last ? (
          <div className="bg-secondary text-white rounded-md w-40 h-10 flex items-center mx-5 px-7 font-bold">
            {first} {last}
          </div>
        ) : (
          <Button text="Log in" onClick={openLoginModal} />
        )}
      </Drawer>

      <Modal open={!!activeModal} onClose={closeModal}>
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
            <Signup
              onClose={closeModal}
              onSwitchToLogin={() => setActiveModal("login")}
            />
          ) : activeModal === "login" ? (
            <Login
              onClose={closeModal}
              onSwitchToSignup={() => setActiveModal("signup")}
            />
          ) : (
            <Box sx={{ p: 4 }}>
              <h2>Join a Class</h2>
              <input
                type="text"
                placeholder="Enter Class Code"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                className="border p-2 w-full my-4"
              />
              <button
                onClick={handleJoinClass}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Join
              </button>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Navbar;
