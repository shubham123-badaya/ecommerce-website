import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../../admin/auth/Login";

import React, { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaUser,
  FaShoppingBag,
  FaTimes,
  FaPlus,
  FaMinus,
  FaTrash,
  FaSearch,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function NavbarWithCart() {
  const navigate = useNavigate?.() || (() => {});

  const [openMenu, setOpenMenu] = useState(null);
   const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();
  const [openCart, setOpenCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false); // 👈 dropdown state

  const handleLoginClick = () => {
    setIsLoginOpen(true);                  
    
  };
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

  return (
    <div className="w-full fixed top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className=" max-w-7xl mx-auto text-sm flex justify-between items-center px-4 lg:px-16 py-2 ">
        <div className="flex items-center space-x-4">
          <span className="bg-black rounded-full w-5 h-5 flex justify-center items-center">
            <FaPhoneAlt className="text-white text-xs " />
          </span>
          <span className="font-bold">91 8424 888 555</span>
          <span>|</span>
          <span className="font-bold">91 22 4127 8855</span>
        </div>
        <div className="text-[#8b3f1c] font-bold text-xs sm:text-sm md:text-sm text-center">
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

      {/* Main Navbar */}
      <div className="flex justify-between items-center max-w-7xl mx-auto py-4 px-4 lg:px-16   relative">
        {/* Logo + Tagline */}
        <Link to="/">
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="w-12 h-12 flex justify-center items-center font-bold text-white rounded-full bg-red-500">
                <h1>shop</h1>
              </div>
            </div>
            <span className="text-sm italic text-[#8b3f1c]">Nourishing life</span>
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart_v1");
      return raw
        ? JSON.parse(raw)
        : [
            { id: 1, name: "Sunflower Seeds", price: 199, qty: 1, img: seedsCategories[3].img },
            { id: 2, name: "Chia Seeds", price: 149, qty: 2, img: seedsCategories[5].img },
          ];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart_v1", JSON.stringify(cart));
  }, [cart]);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0);

  function increaseQty(id) {
    setCart((c) => c.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it)));
  }
  function decreaseQty(id) {
    setCart((c) => c.map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it)));
  }
  function removeItem(id) {
    setCart((c) => c.filter((it) => it.id !== id));
  }
  function clearCart() {
    setCart([]);
  }

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
    }
  };

  // Close on Esc or outside click
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenCart(false);
        setShowSearch(false);
      }
    };
    document.addEventListener("keydown", onKey);
    const onClick = (e) => {
      if (!e.target.closest(".search-bar-area") && !e.target.closest(".search-toggle-btn")) {
        setShowSearch(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  function goToCartPage() {
    setOpenCart(false);
    try {
      navigate("/cart");
    } catch (e) {}
  }

  return (
    <>
      <div className="w-full fixed top-0 z-40 bg-white shadow-md">
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
          {/* Logo */}
          <Link to="/">
            <div className="flex flex-col">
              <div className="flex items-center">
                <div className="w-12 h-12 flex justify-center items-center font-bold text-white rounded-full bg-red-500">
                  <h1>shop</h1>
                </div>
              </div>
              <span className="text-sm italic text-[#8b3f1c]">Nourishing life</span>
            </div>
          </Link>

          {/* Seeds with Mega Menu - wrapped properly */}
          {/* Nav Links */}
          <div className="hidden md:flex space-x-8 font-semibold text-black text-lg">
            <Link to="/dryfruit">DRY FRUITS</Link>
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

          {/* Search + Login + Cart */}
          <div className="flex items-center space-x-6 text-black">
            {/* 🔍 Search Toggle Button */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="search-toggle-btn flex items-center gap-1 hover:text-[#8b3f1c] transition"
            >
              <FaSearch size={18} />
            </button>

            {/* 👤 Login */}
            <div className="flex items-center space-x-1 cursor-pointer">
              <FaUser />
              <span>Login</span>
            </div>

            {/* 🛍 Cart */}
            <div className="relative cursor-pointer" onClick={() => setOpenCart(true)}>
              <FaShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-[#8b3f1c] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            </div>
          </div>
        </div>

        {/* 🌟 Search Dropdown with Smooth Transition */}
        <div
          className={`search-bar-area w-full bg-[#f9f9f9] border-t border-gray-200 flex justify-center overflow-hidden transition-all duration-500 ease-in-out ${
            showSearch ? "max-h-40 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
          }`}
        >
          <div
            className={`flex w-2/3 max-w-2xl border border-gray-300 rounded-md overflow-hidden bg-white transform transition-all duration-500 ease-in-out ${
              showSearch ? "scale-100" : "scale-95"
            }`}
          >
            <input
              type="text"
              placeholder="Search for products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 text-sm focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-[#8b3f1c] text-white px-6 font-semibold hover:bg-[#6c4327] transition"
            >
              SEARCH
            </button>

            {openMenu === "seeds" && (
              <div className="absolute left-1/2 -translate-x-1/2 top-[100%] 
                              w-[90vw] lg:w-[100vw] bg-[#fef7f7] rounded-lg 
                              py-6 px-10 grid grid-cols-2 sm:grid-cols-3 
                              lg:grid-cols-4 gap-6 z-40">
                {seedsCategories.map((cat, i) => (
                  <Link
                    to={`/product/${encodeURIComponent(cat.name)}`}
                    key={i}
                    className="flex gap-3 mx-auto items-center hover:scale-105 transition"
                    onClick={() => setOpenMenu(null)} // close on click
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
        </div>

        {/* 🌱 Seeds Mega Menu */}
        {openMenu === "seeds" && (
          <div className="absolute left-1/2 -translate-x-1/2 top-[100%] w-[90vw] lg:w-[100vw] bg-[#fef7f7] rounded-lg py-6 px-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 z-40">
            {seedsCategories.map((cat, i) => (
              <Link
                to={`/product/${encodeURIComponent(cat.name)}`}
                key={i}
                className="flex gap-3 mx-auto items-center hover:scale-105 transition"
                onClick={() => setOpenMenu(null)}
              >
                <img src={cat.img} alt={cat.name} className="w-12 h-12 object-contain" />
                <p className="mt-2 text-sm font-medium text-gray-700 text-center">{cat.name}</p>
              </Link>
            ))}
          </div>
        <div>
      <div
  className="flex items-center space-x-1 cursor-pointer"
  onClick={() => setIsLoginOpen(true)}
>
  <FaUser />
  <span>Login</span>
</div>
<Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />


      {/* Login Sidebar */}
      <Login
        isOpen={isLoginOpen}
        onClose={() => {
          setIsLoginOpen(false);
          navigate(-1); // Optional: Close sidebar & go back in history
        }}
      />
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
        )}
      </div>

      {/* 🛒 Cart Drawer */}
      <div className={`fixed inset-0 z-50 ${openCart ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!openCart}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 transition-opacity ${openCart ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpenCart(false)}
        >
          <div className="w-full h-full bg-black/40" />
        </div>

        {/* Drawer */}
        <aside
          role="dialog"
          aria-modal="true"
          className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ${
            openCart ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4 flex items-center justify-between border-b">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <div className="flex items-center gap-2">
              <button onClick={clearCart} className="text-sm text-red-500">
                Clear
              </button>
              <button onClick={() => setOpenCart(false)}>
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 160px)" }}>
            {cart.length === 0 ? (
              <div className="text-center py-20 text-gray-600">Your cart is empty.</div>
            ) : (
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <img src={item.img} alt={item.name} className="w-16 h-16 object-contain rounded" />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">₹{item.price}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <button onClick={() => decreaseQty(item.id)} className="p-1 border rounded">
                          <FaMinus />
                        </button>
                        <div className="px-3">{item.qty}</div>
                        <button onClick={() => increaseQty(item.id)} className="p-1 border rounded">
                          <FaPlus />
                        </button>
                        <button onClick={() => removeItem(item.id)} className="ml-auto text-red-500">
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex justify-between items-center font-semibold">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={goToCartPage} className="w-full text-center p-2 border rounded">
                View Cart
              </button>
              <button className="w-full bg-[#8b3f1c] text-white p-2 rounded">Checkout</button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
