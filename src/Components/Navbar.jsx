import { useState } from "react";

import Logo from "../assets/rent.png";

import { NavLink, useNavigate } from "react-router-dom";

import { IoIosHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { LuSettings2 } from "react-icons/lu";

import { RiMotorbikeFill } from "react-icons/ri";
import { RiEBikeFill } from "react-icons/ri";

import { RxCross2 } from "react-icons/rx";
import { FiMenu } from "react-icons/fi";

import { toast } from "react-toastify";

const Navbar = () => {

  const [isMenuOpen, setIsMenuopen] = useState(false);

  const navigate = useNavigate();

  // Check login status
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  // Logout function
  const handleLogout = () => {

    // Remove login status
    localStorage.removeItem("isLoggedIn");

    // Show message
    toast.success("Logged out successfully!");

    // Close mobile menu
    setIsMenuopen(false);

    // Go to home
    navigate("/");
  };

  return (

    <div className="fixed top-0 left-0 z-50 w-full bg-white px-4 shadow-md md:px-10">

      {/* ================= NAVBAR ================= */}

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">

        {/* LOGO */}

        <img
          className="h-[80px] w-[100px] cursor-pointer object-contain"
          src={Logo}
          alt="EasyRental"
          onClick={() => navigate("/")}
        />

        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          className="text-2xl md:hidden"
          onClick={() =>
            setIsMenuopen((isOpen) => !isOpen)
          }
          aria-label={
            isMenuOpen
              ? "Close menu"
              : "Open menu"
          }
        >

          {isMenuOpen ? (
            <RxCross2 />
          ) : (
            <FiMenu />
          )}

        </button>

        {/* ================= DESKTOP MENU ================= */}

        <ul className="hidden items-center gap-10 md:flex">

          {/* HOME */}

          <NavLink to="/">

            <div className="flex cursor-pointer items-center gap-1 text-black">

              <IoIosHome />

              <p>Home</p>

            </div>

          </NavLink>


          {/* BIKE */}

          <NavLink to="/bike">

            <div className="flex cursor-pointer items-center gap-1 text-black">

              <RiMotorbikeFill />

              <p>Bike</p>

            </div>

          </NavLink>


          {/* SCOOTER */}

          <NavLink to="/sccoter">

            <div className="flex cursor-pointer items-center gap-1 text-black">

              <RiEBikeFill />

              <p>Sccoter</p>

            </div>

          </NavLink>


          {/* HOW IT WORKS */}

          <NavLink to="/howitworks">

            <div className="flex cursor-pointer items-center gap-1 text-black">

              <LuSettings2 />

              <p>How it works</p>

            </div>

          </NavLink>


          {/* ABOUT */}

          <NavLink to="/about">

            <div className="flex cursor-pointer items-center gap-1 text-black">

              <FaUsers />

              <p>About Us</p>

            </div>

          </NavLink>


          {/* CONTACT */}

          <NavLink to="/contact">

            <div className="flex cursor-pointer items-center gap-1 text-black">

              <FaPhoneVolume />

              <p>Contact</p>

            </div>

          </NavLink>


          {/* ================= LOGIN / LOGOUT ================= */}

          <div className="flex gap-3">

            {isLoggedIn ? (

              // LOGOUT
              <button
                type="button"
                onClick={handleLogout}
                className="cursor-pointer rounded-lg border border-orange-500 px-5 py-2 font-semibold text-orange-500 transition duration-300 hover:bg-orange-50"
              >
                Logout
              </button>

            ) : (

              // LOGIN
              <NavLink
                to="/login"
                className="cursor-pointer rounded-lg border border-orange-500 px-5 py-2 font-semibold text-orange-500 transition duration-300 hover:bg-orange-50"
              >
                Login
              </NavLink>

            )}


            {/* BOOK NOW */}

            <NavLink
              to="/booknow"
              className="cursor-pointer rounded-lg bg-orange-500 px-5 py-2 font-semibold text-white transition duration-300 hover:bg-orange-600"
            >
              Book Now
            </NavLink>

          </div>

        </ul>

      </div>


      {/* ================= MOBILE MENU ================= */}

      {isMenuOpen && (

        <ul className="flex flex-col items-center space-y-3 pb-4 md:hidden">

          {/* HOME */}

          <li>

            <NavLink
              to="/"
              onClick={() =>
                setIsMenuopen(false)
              }
            >
              Home
            </NavLink>

          </li>


          {/* BIKE */}

          <li>

            <NavLink
              to="/bike"
              onClick={() =>
                setIsMenuopen(false)
              }
            >
              Bike
            </NavLink>

          </li>


          {/* SCOOTER */}

          <li>

            <NavLink
              to="/sccoter"
              onClick={() =>
                setIsMenuopen(false)
              }
            >
              Sccoter
            </NavLink>

          </li>


          {/* HOW IT WORKS */}

          <li>

            <NavLink
              to="/howitworks"
              onClick={() =>
                setIsMenuopen(false)
              }
            >
              How it works
            </NavLink>

          </li>


          {/* ABOUT */}

          <li>

            <NavLink
              to="/about"
              onClick={() =>
                setIsMenuopen(false)
              }
            >
              About Us
            </NavLink>

          </li>


          {/* CONTACT */}

          <li>

            <NavLink
              to="/contact"
              onClick={() =>
                setIsMenuopen(false)
              }
            >
              Contact
            </NavLink>

          </li>


          {/* LOGIN / LOGOUT */}

          <li>

            {isLoggedIn ? (

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-orange-500 px-5 py-2 font-semibold text-orange-500"
              >
                Logout
              </button>

            ) : (

              <NavLink
                to="/login"
                onClick={() =>
                  setIsMenuopen(false)
                }
                className="rounded-lg border border-orange-500 px-5 py-2 font-semibold text-orange-500"
              >
                Login
              </NavLink>

            )}

          </li>


          {/* BOOK NOW */}

          <li>

            <NavLink
              to="/booknow"
              onClick={() =>
                setIsMenuopen(false)
              }
              className="rounded-lg bg-orange-500 px-5 py-2 font-semibold text-white"
            >
              Book Now
            </NavLink>

          </li>

        </ul>

      )}

    </div>
  );
};

export default Navbar;