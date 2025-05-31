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
      }
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const openLoginModal = () => setActiveModal("login");
  const openSignupModal = () => setActiveModal("signup");
  const closeModal = () => setActiveModal(null);

  return (
    <div className="relative z-50 bg-white">
      {/* Desktop Navbar */}
      <div className="hidden lg:flex items-center justify-between p-4 py-1 mx-5">
        {/* Logo */}
        <Image
          src="/Assets/hovered-logo.png"
          width={120}
          height={120}
          alt="logo"
          className="cursor-pointer"
        />

        {/* Menu Items */}
  
          <MenuItem title="Classes" create />
          <MenuItem title="Quizzes" create />
          

        {/* Search Bar */}
        <div className="flex-1 max-w-sm">
          <SearchBar />
        </div>

        <MenuItem title="+ Create" create onClick={openSignupModal}/>
          <MenuItem title="FAQs" create />

        {/* User Initials or Login Button */}
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
        {/* Logo */}
        <Image
          src="/Assets/hovered-logo.png"
          width={100}
          height={100}
          alt="logo"
          className="cursor-pointer"
        />

        {/* Hamburger Icon */}
        <IconButton onClick={toggleMenu} color="primary" aria-label="menu">
          <MenuIcon />
        </IconButton>
      </div>

      {/* Drawer for Mobile Menu */}
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
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <IconButton onClick={toggleMenu} aria-label="close menu">
            <CloseIcon />
          </IconButton>
        </div>

        {/* Drawer Menu Items */}
        <MenuItem title="Classes" create />
        <MenuItem title="Quizzes" create />
        <MenuItem title="+ Create" create />
        <MenuItem title="FAQs" create />

        {/* User Name or Login Button */}
        {first || last ? (
          <div className="bg-secondary text-white rounded-md w-40 h-10 flex items-center mx-5 px-7 font-bold">
            {first} {last}
          </div>
        ) : (
          <Button text="Log in" onClick={openLoginModal} />
        )}
      </Drawer>

      {/* Modal for Login or Signup */}
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
          ) : (
            <Login
              onClose={closeModal}
              onSwitchToSignup={() => setActiveModal("signup")}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Navbar;
