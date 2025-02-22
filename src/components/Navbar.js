import React, { useState } from "react";
import Image from "next/image";
import MenuItem from "./MenuItem";
import SearchBar from "./SearchBar";
import { Drawer, IconButton, Button } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex items-center justify-between p-4 py-1 mx-5">
      {/* Logo */}
      <Image
        src="/Assets/hovered-logo.png"
        width={100}
        height={100}
        alt="logo"
        className="cursor-pointer"
      />

      {/* Navbar Menu for Desktop */}
      <div className="hidden lg:flex space-x-6 ml-10">
        <MenuItem title="About" />
        <MenuItem title="Quizzes" create />
        <MenuItem title="Learn" />
        <MenuItem title="Contact" create />
      </div>

      {/* Search Bar for Desktop */}
      <div className="hidden lg:flex flex-1 max-w-sm">
        <SearchBar />
      </div>

      {/* Create Button */}
      <MenuItem title="+ Create" create />

      {/* Login Button */}
      <Button className="bg-primary text-white text-center p-2 px-6 cursor-pointer font-semibold rounded-md hidden lg:block">
        Log in
      </Button>

      {/* Hamburger Icon for Mobile */}
      <div className="lg:hidden">
        <IconButton onClick={toggleMenu} color="primary">
          <MenuIcon />
        </IconButton>
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
        <MenuItem title="About" />
        <MenuItem title="Quizzes" create />
        <MenuItem title="Learn" />
        <MenuItem title="Contact" create />
        <MenuItem title="+ Create" create />
        <Button
          variant="contained"
          color="primary"
          className="w-full"
          onClick={toggleMenu}
        >
          Log in
        </Button>
      </Drawer>
    </div>
  );
};

export default Navbar;
