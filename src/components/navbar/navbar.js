import React, { useState } from "react";
import Image from "next/image";
import MenuItem from "./menu-item";
import SearchBar from "./search-bar";
import { Drawer, IconButton, Modal, Box } from "@mui/material";
import Button from "./button";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import Login from "../homepage/modal/login";
import Signup from "../homepage/modal/signup"; 
import useUserData from "../../../hooks/use-user-data";
import Link from "next/link";

const Navbar = ({home, menupage}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const openLoginModal = () => setActiveModal("login"); 
  const openSignupModal = () => setActiveModal("signup");
  const closeModal = () => setActiveModal(null);

  return (
    <div className="relative">
      {/* Navbar stays fixed at top */}
      <div className="flex items-center justify-between p-4 py-1 mx-5 z-50 bg-white">
        {/* Logo */}
        <Link href="/">
        <Image
          src="/Assets/hovered-logo.png"
          width={120}
          height={120}
          alt="logo"
          className="cursor-pointer"
        />
        </Link>

        {/* Navbar Menu for Desktop */}
        <div
          className={`hidden lg:flex ml-10 flex-1 ${
            home ? "space-x-6" : " justify-evenly"
          }`}
        >

          <MenuItem title="About" link={"/about-us"} menupage={menupage}/>
          <MenuItem title="Quizzes" create link={"/quizzes"}menupage={menupage}/>
          <MenuItem title="How It Works" link={"/how-it-works"} menupage={menupage}/>
          <MenuItem title="Contact" create link={"/contact-us"} menupage={menupage}/>

        </div>

        {/* Search Bar for Desktop */}
        <div className={` ${home ? 'hidden lg:flex flex-1' : ' hidden' }  max-w-sm`}>
          <SearchBar />
        </div>

        {/* Create Button */}
        <div className="hidden lg:block space-x-2">
          <Button text={"Sign Up"} signup onClick={openSignupModal} />
          <Button text={"Log in"} onClick={openLoginModal} />
        </div>
     
        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden">
          <IconButton onClick={toggleMenu} color="primary">
            <MenuIcon />
          </IconButton>
        </div>
      </div>

      {/* Drawer (Slider Menu) for Mobile */}
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
          <IconButton onClick={toggleMenu}>
            <CloseIcon />
          </IconButton>
        </div>

        {/* Menu Items in Column Format */}
        <MenuItem title="About" link={"/about-us"}/>
        <MenuItem title="Quizzes" create link={"/quizzes"}/>
        <MenuItem title="How It Works" link={"/how-it-works"}/>
        <MenuItem title="Contact" create link={"/contact-us"}/>
        {/* <MenuItem title="+ Create" create /> */}
        <Button text={"Sign Up"} onClick={openSignupModal} />
        <Button text={"Log in"} onClick={openLoginModal} />
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
            <Signup onClose={closeModal} onSwitchToLogin={() => setActiveModal("login")} />
          ) : (
            <Login onClose={closeModal} onSwitchToSignup={() => setActiveModal("signup")} />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Navbar;
