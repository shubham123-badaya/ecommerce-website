import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSetting } from "../../frontend/redux/settingSlice";
import { IMG_URL } from "../../admin/config";
import axios from "axios";
import {
  FaPhoneAlt,
  FaFacebookF,
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

  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [categories, setCategories] = useState([]); // Dynamic categories from API

  // NEW: category products panel
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productsPanelOpen, setProductsPanelOpen] = useState(false);

  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state.setting || {});

  // Fetch settings (existing logic)
  useEffect(() => {
    dispatch(fetchSetting());
  }, [dispatch]);

  // Fetch categories dynamically from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/frontend/categories");
        if (res.data?.categories) {
          // normalize keys: your API used id/name or title — handle both
          const normalized = res.data.categories.map((c) => ({
            id: c.id || c._id || c._id?.toString(),
            title: c.name || c.title || c.name,
            raw: c,
          }));
          setCategories(normalized);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Get user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsProfileOpen(false);
    navigate("/");
  };

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoginOpen(false);
  };

  // Cart logic (persisted)
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart_v1");
      return raw ? JSON.parse(raw) : [];
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
    setCart((c) => c.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it)));
  const decreaseQty = (id) =>
    setCart((c) => c.map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it)));
  const removeItem = (id) => setCart((c) => c.filter((it) => it.id !== id));
  const clearCart = () => setCart([]);

  // ===== NEW: addToCart logic (idempotent, merges qty) =====
  const addToCart = (product, variant = null) => {
    // product object must include _id, name, price, images (array)
    const id = product._id || product.id || product._id?.toString();
    const price = variant ? variant.price : product.price || (product.variants && product.variants[0]?.price) || 0;
    const img = product.images && product.images.length > 0 ? product.images[0] : "";
    const name = product.name || product.title || "Product";

    setCart((c) => {
      const exists = c.find((it) => it.id === id && it.variantId === (variant?._id || null));
      if (exists) {
        return c.map((it) =>
          it.id === id && it.variantId === (variant?._id || null)
            ? { ...it, qty: it.qty + 1 }
            : it
        );
      } else {
        const newItem = {
          id,
          name,
          price,
          qty: 1,
          img: img ? `${IMG_URL}/product/${img}` : "",
          variantId: variant?._id || null,
          raw: product,
        };
        return [...c, newItem];
      }
    });
    // Open cart drawer so user sees the result
    setOpenCart(true);
  };

  // handle search navigation
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
    }
  };

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenCart(false);
        setShowSearch(false);
        setProductsPanelOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const goToCartPage = () => {
    setOpenCart(false);
    navigate("/cart");
  };

  // ===== NEW: fetch products for a category and show inline panel =====
  const fetchCategoryProducts = async (catId) => {
    try {
      setLoadingProducts(true);
      setActiveCategoryId(catId);
      // call API that you provided earlier format
      const res = await axios.get(`http://localhost:5000/api/frontend/category/products/${catId}`);
      setActiveCategory(res.data.category || null);
      setCategoryProducts(res.data.products || []);
      setProductsPanelOpen(true);
    } catch (err) {
      console.error("Error fetching category products:", err);
      setActiveCategory(null);
      setCategoryProducts([]);
      setProductsPanelOpen(false);
    } finally {
      setLoadingProducts(false);
    }
  };

  // helper: close panels on outside click
  const productsPanelRef = useRef(null);
  useEffect(() => {
    const handleOutside = (e) => {
      if (productsPanelRef.current && !productsPanelRef.current.contains(e.target)) {
        // don't auto-close if user clicked a category again
        // but for cleanliness, close the panel
        // you can comment this out if you prefer manual close only
        // setProductsPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <>
      <nav className="w-full fixed top-0 z-50 bg-white shadow-md">
        {/* Top Bar */}
        <div className="bg-[#f2f2df]">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 lg:px-10 py-2 text-xs sm:text-sm">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="bg-black rounded-full w-5 h-5 flex justify-center items-center">
                <FaPhoneAlt className="text-white text-xs" />
              </span>
              {setting ? (
                <>
                  <span className="font-bold">{setting.contactno}</span>
                  <span>|</span>
                  <span className="font-bold">{setting.email}</span>
                </>
              ) : (
                <span className="font-bold">Loading...</span>
              )}
            </div>

            <div className="text-[#8b3f1c] hidden sm:block font-semibold text-center">
              ₹ 1 From every pack sold will be donated to SKRM Foundation
            </div>

            <div className="flex space-x-3 text-black">
              {setting?.facebook && (
                <a
                  href={setting.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black rounded-full w-5 h-5 flex justify-center items-center"
                >
                  <FaFacebookF className="text-white" />
                </a>
              )}
              {setting?.instagram && (
                <a
                  href={setting.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black rounded-full w-5 h-5 flex justify-center items-center"
                >
                  <FaInstagram className="text-white" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 lg:px-10 py-4">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center">
            {setting?.logo ? (
              <img
                src={`${IMG_URL}/logo/${setting.logo}`}
                alt="Logo"
                className="w-16 h-16 scale-110 rounded-full object-contain"
              />
            ) : (
              <div className="w-10 h-10 flex justify-center items-center font-bold text-white rounded-full bg-red-500">
                shop
              </div>
            )}
            <span className="text-sm italic text-[#8f1a0f]">Nourishing life</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 px-6 text-black text-md">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => fetchCategoryProducts(cat.id)}
                className="hover:text-[#8b3f1c] uppercase font-medium"
              >
                {cat.title}
              </button>
            ))}

            {/* Icons */}
            <div className="flex items-center space-x-8">
              <div onClick={() => setShowSearch(!showSearch)} className="flex items-center space-x-1 cursor-pointer">
                <FaSearch /> <span>Search</span>
              </div>

              {user ? (
                <div className="relative" ref={profileRef}>
                  <div className="flex items-center space-x-1 cursor-pointer" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                    <FaUser />
                    <span>Welcome, {user.firstname}</span>
                  </div>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                      <Link to="/user/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        My Account
                      </Link>
                      <Link to="/user/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Order History
                      </Link>
                      <Link to="/user/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Wish List
                      </Link>
                      <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex items-center space-x-1 cursor-pointer" onClick={() => setIsLoginOpen(true)}>
                    <FaUser />
                    <span>Login</span>
                  </div>
                  <LoginUser isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
                </div>
              )}

              <div className="relative cursor-pointer" onClick={() => setOpenCart(true)}>
                <FaShoppingBag size={20} />
                <span className="absolute -top-2 -right-2 bg-[#8b3f1c] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
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
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    fetchCategoryProducts(cat.id);
                    setMobileMenu(false);
                  }}
                  className="text-left hover:text-[#8b3f1c] font-medium"
                >
                  {cat.title.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Search Bar */}
      {showSearch && (
        <div className="fixed top-[138px] left-0 w-full bg-[#f9f9f9] border-t border-gray-200 flex justify-center z-50 py-4">
          <div className="flex w-2/3 max-w-2xl border border-gray-300 rounded-md overflow-hidden bg-white">
            <input
              type="text"
              placeholder="Search for products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 text-sm focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
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

      {/* ===== Products Panel (shows when a category clicked) ===== */}
      {productsPanelOpen && (
        <div
          ref={productsPanelRef}
          className="fixed top-[120px] left-0 w-full bg-white border-t z-40 shadow-inner"
        >
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{activeCategory?.name || activeCategory?.title || "Products"}</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => { setProductsPanelOpen(false); setActiveCategory(null); setCategoryProducts([]); }} className="text-sm px-3 py-1 border rounded">Close</button>
              </div>
            </div>

            {loadingProducts ? (
              <div className="py-8 text-center">Loading products…</div>
            ) : categoryProducts.length === 0 ? (
              <div className="py-8 text-center text-gray-600">No products found.</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {categoryProducts.map((p) => (
                  <div key={p._id} className="border rounded p-3 flex flex-col">
                    <div className="w-full h-36 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                      {p.images && p.images[0] ? (
                        <img src={`${IMG_URL}/product/${p.images[0]}`} alt={p.name} className="object-contain h-full" />
                      ) : (
                        <div className="text-sm text-gray-500">No image</div>
                      )}
                    </div>

                    <div className="mt-3 flex-1">
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-sm text-gray-600 mt-1">₹{p.price}</div>

                      {/* variants quick-select if available */}
                      {p.variants && p.variants.length > 0 && (
                        <div className="mt-2 text-xs text-gray-700">
                          <span className="font-medium">Variants: </span>
                          {p.variants.slice(0, 3).map((v) => (
                            <span key={v._id} className="mr-2">{v.name}({v.price})</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => {
                          // if variants exist, prefer first variant by default (you can enhance UI to choose)
                          const variant = p.variants && p.variants.length > 0 ? p.variants[0] : null;
                          addToCart(p, variant);
                        }}
                        className="w-full bg-[#8b3f1c] text-white py-2 rounded text-sm"
                      >
                        Add to Cart
                      </button>

                      <button
                        onClick={() => navigate(`/product/${p._id}`)}
                        className="w-24 border rounded py-2 text-sm"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <div className={`fixed inset-0 z-50 ${openCart ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 transition-opacity ${openCart ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpenCart(false)}
        >
          <div className="w-full h-full bg-black/40" />
        </div>

        <aside
          className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ${openCart ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-4 flex items-center justify-between border-b">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <div className="flex items-center gap-2">
              <button onClick={clearCart} className="text-sm text-red-500">Clear</button>
              <button onClick={() => setOpenCart(false)}><FaTimes /></button>
            </div>
          </div>

          <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 160px)" }}>
            {cart.length === 0 ? (
              <div className="text-center py-20 text-gray-600">Your cart is empty.</div>
            ) : (
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li key={`${item.id}_${item.variantId || "nov"}`} className="flex items-center gap-3">
                    <img src={item.img} alt={item.name} className="w-16 h-16 object-contain rounded" />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">₹{item.price}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <button onClick={() => decreaseQty(item.id)} className="p-1 border rounded"><FaMinus /></button>
                        <div className="px-3">{item.qty}</div>
                        <button onClick={() => increaseQty(item.id)} className="p-1 border rounded"><FaPlus /></button>
                        <button onClick={() => removeItem(item.id)} className="ml-auto text-red-500"><FaTrash /></button>
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
              <button onClick={goToCartPage} className="w-full text-center p-2 border rounded">View Cart</button>
              <button className="w-full bg-[#8b3f1c] text-white p-2 rounded">Checkout</button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
