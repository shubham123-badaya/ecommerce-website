import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaSearch,
  FaUser,
  FaShoppingBag,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const seedsCategories = [
    {
      name: "Watermelon Seeds",
      img: "https://www.dryfruitbasket.in/storage/media/yscvD5TGkp2HV6G4ZNRjBZ5OUPQny3gCcMpmAd3w.png",
    },
    {
      name: "Pumpkin Seeds",
      img: "https://www.dryfruitbasket.in/storage/media/yscvD5TGkp2HV6G4ZNRjBZ5OUPQny3gCcMpmAd3w.png",
    },
    {
      name: "Oats Seeds",
      img: "https://www.dryfruitbasket.in/storage/media/yscvD5TGkp2HV6G4ZNRjBZ5OUPQny3gCcMpmAd3w.png",
    },
    {
      name: "Sunflower Seeds",
      img: "https://www.dryfruitbasket.in/storage/media/yscvD5TGkp2HV6G4ZNRjBZ5OUPQny3gCcMpmAd3w.png",
    },
    {
      name: "Flax Seeds",
      img: "https://www.dryfruitbasket.in/storage/media/yscvD5TGkp2HV6G4ZNRjBZ5OUPQny3gCcMpmAd3w.png",
    },
    {
      name: "Chia Seeds",
      img: "https://www.dryfruitbasket.in/storage/media/yscvD5TGkp2HV6G4ZNRjBZ5OUPQny3gCcMpmAd3w.png",
    },
    {
      name: "Millets Seeds",
      img: "https://www.dryfruitbasket.in/storage/media/yscvD5TGkp2HV6G4ZNRjBZ5OUPQny3gCcMpmAd3w.png",
    },
    {
      name: "Jowar Seeds",
      img: "https://www.dryfruitbasket.in/storage/media/yscvD5TGkp2HV6G4ZNRjBZ5OUPQny3gCcMpmAd3w.png",
    },
  ];

  return (
    <div className="w-full fixed top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-gray-50 text-sm flex justify-between items-center px-4 lg:px-16 py-2 border-b">
        <div className="flex items-center space-x-4">
          <span className="bg-black rounded-full w-7 h-7 flex justify-center items-center">
            <FaPhoneAlt className="text-white text-sm" />
          </span>
          <span className="font-bold">91 8424 888 555</span>
          <span>|</span>
          <span className="font-bold">91 22 4127 8855</span>
        </div>
        <div className="text-[#8b3f1c] font-bold text-xs sm:text-sm md:text-md text-center">
          ₹ 1 From every pack sold will be donated to SKRM Foundation
        </div>
        <div className="flex space-x-3 text-black">
          <span className="bg-black rounded-full w-8 h-8 flex justify-center items-center">
            <FaFacebookF className="text-white" />
          </span>
          <span className="bg-black rounded-full w-8 h-8 flex justify-center items-center">
            <FaTwitter className="text-white" />
          </span>
          <span className="bg-black rounded-full w-8 h-8 flex justify-center items-center">
            <FaInstagram className="text-white" />
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex justify-between items-center py-4 px-4 lg:px-16 bg-white shadow-sm relative">
        {/* Logo + Tagline */}
        <Link to="/">
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="w-12 h-12 flex justify-center items-center font-bold text-white rounded-full bg-red-500">
                <h1>shop</h1>
              </div>
            </div>
            <span className="text-sm italic text-[#8b3f1c]">
              Nourishing life
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-8 font-semibold text-black text-lg">
          <Link to="/dryfruit">DRY FRUITS</Link>

          {/* Seeds with Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("seeds")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="hover:text-[#8b3f1c]">
              <Link to="/seeds">SEEDS</Link>
            </button>
          </div>

          <Link to="/dates">DATES</Link>
          <Link to="/nuts_berries">NUTS & BERRIES</Link>
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

      {openMenu === "seeds" && (
        <div className="absolute left-1/2 -translate-x-1/2 top-[100%]  w-[90vw] lg:w-[100vw]   bg-[#fef7f7] rounded-lg py-6 px-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 z-40">
          {seedsCategories.map((cat, i) => (
            <Link
              to={`/product/${encodeURIComponent(cat.name)}`}
              key={i}
              className="flex gap-3 mx-auto items-center hover:scale-105 transition"
              onClick={() => setOpenMenu(null)} // Optional: close the menu on click
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-12 h-12 object-contain"
              />
              <p className="mt-2 text-sm font-medium text-gray-700 text-center">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
