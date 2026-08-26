import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Logo from "../assets/rent.png";
import { NavLink } from "react-router-dom";
import { IoIosContact, IoIosHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { LuSettings2 } from "react-icons/lu";

import { RiMotorbikeFill } from "react-icons/ri";
import { RiEBikeFill } from "react-icons/ri";

import { FaServicestack } from "react-icons/fa";
import { MdOutlineRoundaboutLeft } from "react-icons/md";

const Navbar = () => {
  const [isMenuOpen, setIsMenuopen] = useState(false);

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-white px-4 shadow-md md:px-10">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <img
          className="w-[100px] h-[80px]  hover:cursor-pointer object-contain"
          src={Logo}
          alt="image"
        />

        <ul className=" hidden md:flex  gap-10 ">
          {/* Home */}
          <NavLink to="/">
            <div className="flex items-center gap-1 cursor-pointer text-[black]">
              <IoIosHome /> <p>Home</p>
            </div>
          </NavLink>
          {/* Bike */}
          <NavLink to="/bike">
            <div className="flex items-center gap-1 cursor-pointer text-[black]">
              <RiMotorbikeFill />

              <p>Bike</p>
            </div>
          </NavLink>
          {/* Sccoter */}
          <NavLink to="/sccoter">
            <div className="flex items-center gap-1 cursor-pointer text-[black]">
              <RiEBikeFill />
              <p>Sccoter</p>
            </div>
          </NavLink>
          {/*How it works  */}
          <NavLink to="/howitworks">
            <div className="flex items-center gap-1 cursor-pointer text-[black]">
              <LuSettings2 />

              <p>How it works</p>
            </div>
          </NavLink>
          {/* About us  */}
          <NavLink to="/about">
            <div className="flex items-center gap-1 cursor-pointer text-[black]">
              <FaUsers />
              <p>About Us</p>
            </div>
          </NavLink>
          {/* contact us  */}
          <NavLink to="/contact">
            <div className="flex items-center gap-1 cursor-pointer text-[black]">
              <FaPhoneVolume />
              <p>Contact</p>
            </div>
          </NavLink>
          <div className="flex  gap-3">
            <NavLink
              to="/login"
              className="px-5 py-2 cursor-pointer rounded-lg border border-orange-500 
               text-orange-500 font-semibold hover:bg-orange-50 
               transition duration-300"
            >
              Login
            </NavLink>
            <NavLink
              to="/booknow"
              className="px-5 py-2 cursor-pointer rounded-lg bg-orange-500 
  >
  login
   
  </NavLink>
   <NavLink to="/booknow"
    className="px-5 py-2 cursor-pointer rounded-lg bg-orange-500 
               text-white font-semibold hover:bg-orange-600 
               transition duration-300"
            >
              Book Now
            </NavLink>
          </div>
        </ul>
      </div>

      {/* Mobile Navigation */}

      {isMenuOpen && (
        <ul className="flex flex-col md:hidden items-center space-y-3 pb-4">
          <li>Home</li>
          <li>About </li>
          <li>Services </li>
          <li>Contact Us</li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
