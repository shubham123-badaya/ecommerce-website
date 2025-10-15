import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "../../user/auth/LoginUser";
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
  FaPlus,
  FaMinus,
  FaTrash,
} from "react-icons/fa";
import LoginUser from "../../user/auth/LoginUser";

export default function NavbarWithCart() {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

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

  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart_v1");
      return raw
        ? JSON.parse(raw)
        : [
            {
              id: 1,
              name: "Sunflower Seeds",
              price: 199,
              qty: 1,
              img: seedsCategories[3].img,
            },
            {
              id: 2,
              name: "Chia Seeds",
              price: 149,
              qty: 2,
              img: seedsCategories[5].img,
            },
          ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart_v1", JSON.stringify(cart));
  }, [cart]);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0);

  const increaseQty = (id) =>
    setCart((c) =>
      c.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it))
    );
  const decreaseQty = (id) =>
    setCart((c) =>
      c.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it
      )
    );
  const removeItem = (id) => setCart((c) => c.filter((it) => it.id !== id));
  const clearCart = () => setCart([]);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
    }
  };

  // Close on ESC or outside click
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenCart(false);
        setShowSearch(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const goToCartPage = () => {
    setOpenCart(false);
    navigate("/cart");
  };

  return (
    <>
      {/* Navbar */}
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
            <span className="text-sm italic text-[#8b3f1c]">
              Nourishing life
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 px-6 text-black text-md">
            <Link to="/dryfruit" className="hover:text-[#8b3f1c]">
              DRY FRUITS
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setOpenMenu("seeds")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link to="/seeds" className="hover:text-[#8b3f1c]">
                SEEDS
              </Link>
              {openMenu === "seeds" && (
                <div className="absolute left-1/2 -translate-x-1/2 top-[110%] w-[90vw] lg:w-[110vw] bg-[#fef7f7] rounded-lg py-6 px-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 shadow-lg ">
                  {seedsCategories.map((cat, i) => (
                    <Link
                      key={i}
                      to={`/product/${encodeURIComponent(cat.name)}`}
                      className="flex flex-col items-center gap-2 hover:scale-105 transition"
                    >
                      <img
                        src={cat.img}
                        alt={cat.name}
                        className="w-12 h-12 object-contain"
                      />
                      <p className="text-sm font-medium text-gray-700 text-center">
                        {cat.name}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/dates" className="hover:text-[#8b3f1c]">
              DATES
            </Link>
            <Link to="/nuts_berries" className="hover:text-[#8b3f1c]">
              NUTS & BERRIES
            </Link>

            {/* Icons */}
            <div className="flex items-center space-x-8">
              <div
                onClick={() => setShowSearch(!showSearch)}
                className="flex items-center space-x-1 cursor-pointer"
              >
                <FaSearch /> <span>Search</span>
              </div>
              <div>
                <div
                  className="flex items-center space-x-1 cursor-pointer"
                  onClick={() => setIsLoginOpen(true)}
                >
                  <FaUser />
                  <span>Login</span>
                </div>
                <LoginUser
                  isOpen={isLoginOpen}
                  onClose={() => setIsLoginOpen(false)}
                />

                {/* Login Sidebar */}
              </div>
              <div
                className="relative cursor-pointer"
                onClick={() => setOpenCart(true)}
              >
                <FaShoppingBag size={20} />
                <span className="absolute -top-2 -right-2 bg-[#8b3f1c] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FaTimes size={20} /> : <FaBars size={20} />}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden bg-white w-full shadow-lg">
            <div className="flex flex-col px-4 py-4 space-y-3">
              <Link to="/dryfruit" className="hover:text-[#8b3f1c]">
                DRY FRUITS
              </Link>

              {/* Mobile Seeds Dropdown */}
              <div className="flex flex-col">
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === "seeds" ? null : "seeds")
                  }
                  className="flex justify-between items-center w-full hover:text-[#8b3f1c] font-semibold"
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
                        <img
                          src={cat.img}
                          alt={cat.name}
                          className="w-12 h-12 object-contain"
                        />
                        <p className="text-xs text-center">{cat.name}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/dates" className="hover:text-[#8b3f1c]">
                DATES
              </Link>
              <Link to="/nuts_berries" className="hover:text-[#8b3f1c]">
                NUTS & BERRIES
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Search Bar */}
      {showSearch && (
        <div className="fixed top-[128px]  duration-500 left-0  w-full bg-[#f9f9f9] border-t border-gray-200 flex justify-center z-50 py-4">
          <div className="flex w-2/3 max-w-2xl border border-gray-300 rounded-md overflow-hidden bg-white">
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
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed inset-0 z-50 ${
          openCart ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 transition-opacity ${
            openCart ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpenCart(false)}
        >
          <div className="w-full h-full bg-black/40" />
        </div>

        <aside
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

          <div
            className="p-4 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 160px)" }}
          >
            {cart.length === 0 ? (
              <div className="text-center py-20 text-gray-600">
                Your cart is empty.
              </div>
            ) : (
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">₹{item.price}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="p-1 border rounded"
                        >
                          <FaMinus />
                        </button>
                        <div className="px-3">{item.qty}</div>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="p-1 border rounded"
                        >
                          <FaPlus />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-red-500"
                        >
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
              <button
                onClick={goToCartPage}
                className="w-full text-center p-2 border rounded"
              >
                View Cart
              </button>
              <button className="w-full bg-[#8b3f1c] text-white p-2 rounded">
                Checkout
              </button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
