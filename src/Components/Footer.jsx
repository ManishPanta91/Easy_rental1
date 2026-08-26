import Logo from "../assets/rent.png";
import { FaPhoneVolume } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.12)]  p-3 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-2 md:grid-cols-4">
        <div className="flex flex-col items-center md:items-start">
          <img
            className="h-[80px] w-[100px] object-contain"
            src={Logo}
            alt="EasyRental logo"
          />
          <p className="font-semibold text-black">Ride Explore Enjoy</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <h1 className="mb-5 text-2xl font-semibold text-black ">
            Quick Links
          </h1>

          <div>
            <div className="text-black">
              <h2>Home</h2>
              <h2>Bike</h2>
              <h2>Sccoter</h2>
              <h2>How it works</h2>
              <h2>About Us </h2>
              <h2>Contact </h2>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center text-black md:items-start">
          <h1 className="mb-5 font-semibold text-2xl">Contact Us</h1>
          <div>
            <div className=" items-center gap-1">
              <div className="flex items-center cursor-pointer   gap-1 ">
                <FaPhoneVolume />
                <p>+977 9800000000</p>
              </div>
              <div className="flex items-center cursor-pointer gap-1">
                <IoMail />
                <p>info@easyrental.com</p>
              </div>
              <div className="flex items-center cursor-pointer gap-1">
                <FaLocationDot />

                <p>Kathmandu,Nepal</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-black items-center md:items-start">
          <h1 className="mb-3 font-semibold text-2xl">
            Subscribe to Our Newsletter
          </h1>
          <p>Get the latest offers and travel tips </p>
          <div className="flex gap-3 items-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className=" px-6 py-3  rounded-lg border border-gray-300 cursor-pointer
               focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <button
              type="button"
              className="px-4 py-3 bg-[#f45116] text-white font-medium 
               rounded-lg hover:bg-[#ff7043] cursor-pointer transition duration-300"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
