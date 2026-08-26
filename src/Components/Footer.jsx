import Logo from "../assets/rent.png";
import { FaPhoneVolume } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className=" w-full bg-white border-t border-gray-200 pt-10 pb-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-4 md:gap-6">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <img
            className="h-[70px] w-[90px] object-contain"
            src={Logo}
            alt="EasyRental logo"
          />
          <p className="mt-2 font-semibold text-black">Ride Explore Enjoy</p>
        </div>

        <div className="text-center font-semibold md:text-left">
          <h3 className="mb-3 text-lg font-semibold text-black">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Home</li>
            <li>Bike</li>
            <li>Scooter</li>
            <li>How it works</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h3 className="mb-3 text-lg font-semibold text-black">Contact Us</h3>
          <div className="space-y-3 text-sm font-semibold text-gray-600">
            <div className="flex items-center justify-center gap-2 md:justify-start">
             <FaPhoneVolume className="text-orange-500" />
             <span>+977 9800000000</span>
            </div>
            <div className="flex items-center justify-center gap-2 md:justify-start">
             <IoMail className="text-orange-500" />
             <span>info@easyrental.com</span>
            </div>
            <div className="flex items-center justify-center gap-2 md:justify-start">
             <FaLocationDot className="text-orange-500" />
             <span>Kathmandu, Nepal</span>
            </div>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h3 className="mb-3 text-lg font-semibold text-black">Newsletter</h3>
          <p className="mb-3 text-sm font-semibold text-gray-600">Get the latest offers and travel tips.</p>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <input
             type="email"
             placeholder="Enter your email"
             className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
             type="button"
             className="rounded-lg bg-[#f45116] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#ff7043]"
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
