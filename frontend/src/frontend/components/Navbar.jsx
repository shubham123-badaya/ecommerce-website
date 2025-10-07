import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaSearch,
  FaUser,
  FaShoppingBag,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const seedsCategories = [
  { name: "Watermelon Seeds", img: "https://www.dryfruitbasket.in/storage/media/yscvD5TGkp2HV6G4ZNRjBZ5OUPQny3gCcMpmAd3w.png" },
  { name: "Pumpkin Seeds", img: "https://www.dryfruitbasket.in/storage/media/yscvD5TGkp2HV6G4ZNRjBZ5OUPQny3gCcMpmAd3w.png" },
  { name: "Oats Seeds", img: "https://www.dryfruitbasket.in/storage/media/yscvD5TGkp2HV6G4ZNRjBZ5OUPQny3gCcMpmAd3w.png" },
  { name: "Sunflower Seeds", img: "https://www.dryfruitbasket.in/storage/media/yscvD5TGkp2HV6G4ZNRjBZ5OUPQny3gCcMpmAd3w.png" },
  { name: "Flax Seeds", img: "https://www.dryfruitbasket.in/storage/media/yscvD5TGkp2HV6G4ZNRjBZ5OUPQny3gCcMpmAd3w.png" },
  { name: "Chia Seeds", img: "https://www.dryfruitbasket.in/storage/media/yscvD5TGkp2HV6G4ZNRjBZ5OUPQny3gCcMpmAd3w.png" },
  { name: "Millets Seeds", img: "https://www.dryfruitbasket.in/storage/media/yscvD5TGkp2HV6G4ZNRjBZ5OUPQny3gCcMpmAd3w.png" },
  { name: "Jowar Seeds", img: "https://www.dryfruitbasket.in/storage/media/yscvD5TGkp2HV6G4ZNRjBZ5OUPQny3gCcMpmAd3w.png" },
];

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="w-full fixed top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-[#f2f2df]">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 lg:px-10 py-2 text-xs sm:text-sm">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="bg-black rounded-full w-5 h-5 flex justify-center items-center">
              <FaPhoneAlt className="text-white text-xs" />
            </span>
            <span className="font-bold">91 8424 888 555</span>
            <span>|</span>
            <span className="font-bold">91 22 4127 8855</span>
          </div>
          <div className="text-[#8b3f1c] hidden sm:block font-semibold text-center">
            ₹ 1 From every pack sold will be donated to SKRM Foundation
          </div>
          <div className="flex space-x-3 text-black">
            <span className="bg-black rounded-full w-5 h-5 flex justify-center items-center">
              <FaFacebookF className="text-white" />
            </span>
            <span className="bg-black rounded-full w-5 h-5 flex justify-center items-center">
              <FaTwitter className="text-white" />
            </span>
            <span className="bg-black rounded-full w-5 h-5 flex justify-center items-center">
              <FaInstagram className="text-white" />
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 lg:px-10 py-4">
        {/* Logo */}
        <Link to="/" className="flex flex-col items-center">
          <div className="w-10 h-10 flex justify-center items-center font-bold text-white rounded-full bg-red-500">
            shop
          </div>
          <span className="text-sm italic text-[#8b3f1c]">Nourishing life</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10 px-6 font-sens text-black text-md">
          <Link to="/dryfruit" className="hover:text-[#8b3f1c]">DRY FRUITS</Link>

          {/* Seeds Dropdown */}
          <div className="relative "
            onMouseEnter={() => setOpenMenu("seeds")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <Link to="/seeds" className="hover:text-[#8b3f1c]">SEEDS</Link>
            {openMenu === "seeds" && (
              <div className="absolute left-1/2 -translate-x-1/2 top-[110%] w-[90vw] lg:w-[100vw] bg-[#fef7f7] rounded-lg py-6 px-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 shadow-lg transition-all duration-300">
                {seedsCategories.map((cat, i) => (
                  <Link
                    key={i}
                    to={`/product/${encodeURIComponent(cat.name)}`}
                    className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <img src={cat.img} alt={cat.name} className="w-12 h-12 object-contain"/>
                    <p className="text-sm font-medium text-gray-700 text-center">{cat.name}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/dates" className="hover:text-[#8b3f1c]">DATES</Link>
          <Link to="/nuts_berries" className="hover:text-[#8b3f1c]">NUTS & BERRIES</Link>

          {/* Icons */}
          <div className="flex  items-center space-x-8">
            <div className="flex items-center space-x-1 cursor-pointer">
              <FaSearch />
              <span className="hidden lg:block">Search</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer">
              <FaUser />
              <span className="hidden lg:block">Login</span>
            </div>
            <div className="relative cursor-pointer">
              <FaShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-[#8b3f1c] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">1</span>
            </div>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden cursor-pointer" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <FaTimes size={20} /> : <FaBars size={20} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white w-full shadow-lg">
          <div className="flex flex-col px-4 py-4 space-y-3">
            <Link to="/dryfruit" className="hover:text-[#8b3f1c]">DRY FRUITS</Link>

            {/* Mobile Seeds Dropdown */}
            <div className="flex flex-col">
              <button
                onClick={() => setOpenMenu(openMenu === "seeds" ? null : "seeds")}
                className="flex justify-between items-center w-full hover:text-[#8b3f1c] font-semibold"
                aria-expanded={openMenu === "seeds"}
              >
                SEEDS
              </button>
              {openMenu === "seeds" && (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {seedsCategories.map((cat, i) => (
                    <Link
                      key={i}
                      to={`/product/${encodeURIComponent(cat.name)}`}
                      className="flex flex-col items-center gap-1"
                      onClick={() => setMobileMenu(false)}
                    >
                      <img src={cat.img} alt={cat.name} className="w-12 h-12 object-contain"/>
                      <p className="text-xs text-center">{cat.name}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/dates" className="hover:text-[#8b3f1c]">DATES</Link>
            <Link to="/nuts_berries" className="hover:text-[#8b3f1c]">NUTS & BERRIES</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
