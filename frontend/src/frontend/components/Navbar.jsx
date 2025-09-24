import React from "react";
import {
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaSearch,
  FaUser,
  FaShoppingBag,
} from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full fixed top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-gray-50 text-sm flex justify-between items-center px-15 py-2 border-b">
        <div className="flex items-center space-x-4">
          <span className="bg-black rounded-full  w-7 h-7 flex justify-center items-center">
            {" "}
            <FaPhoneAlt className="text-white text-sm  " />
          </span>
          <span className="font-bold">91 8424 888 555</span>
          <span>|</span>
          <span className="font-bold">91 22 4127 8855</span>
        </div>
        <div className="text-[#8b3f1c] font-bold text-md">
          ₹ 1 From every pack sold will be donated to SKRM Foundation
        </div>
        <div className="flex space-x-3 text-black">
          <span className="bg-black rounded-full  w-8 h-8 flex justify-center items-center">
            <FaFacebookF className="text-white  " />
          </span>
          <span className="bg-black rounded-full  w-8 h-8 flex justify-center items-center">
            <FaTwitter className="text-white  " />
          </span>
          <span className="bg-black rounded-full  w-8 h-8 flex justify-center items-center">
            <FaInstagram className="text-white  " />
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex justify-between items-center py-4 px-15 bg-white shadow-sm">
        {/* Logo + Tagline */}
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="w-12 h-12 flex justify-center items-center font-bold text-white rounded-full bg-red-500">
              <h1>shop</h1>
            </div>
            {/* Replace with your logo */}
          </div>
          <span className="text-sm italic text-[#8b3f1c]">Nourishing life</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-8 font-semibold text-black text-lg">
          <a href="#">DRY FRUITS</a>
          <a href="#">SEEDS</a>
          <a href="#">DATES</a>
          <a href="#">NUTS & BERRIES</a>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-black">
          <div className="flex items-center space-x-1 cursor-pointer">
            <FaSearch />
            <span>Search</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <FaUser />
            <span>Login</span>
          </div>
          <div className="relative cursor-pointer">
            <FaShoppingBag size={20} />
            <span className="absolute -top-2 -right-2 bg-[#8b3f1c] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              1
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
