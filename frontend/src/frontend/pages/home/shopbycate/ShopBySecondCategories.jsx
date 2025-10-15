import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaShareAlt } from "react-icons/fa";

// Categories
const categories = [
  { label: "BEST SELLING", type: "best" },
  { label: "NEW ARRIVAL", type: "new" },
  { label: "TOP RATED", type: "top" },
];

const ShopBySecondCategories = () => {
  const [activeCategory, setActiveCategory] = useState("BEST SELLING");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = "YOUR_TOKEN_HERE";

  const fetchProducts = async (type) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/frontend/products/by-type?type=${type}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Add a default selectedVariant field for each product
      const productsWithVariant = (res.data.products || []).map((p) => ({
        ...p,
        selectedVariant:
          p.variants?.length > 0 ? p.variants[0] : null,
      }));
      setProducts(productsWithVariant);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const selectedType =
      categories.find((c) => c.label === activeCategory)?.type || "best";
    fetchProducts(selectedType);
  }, [activeCategory]);

  // Handle variant change
  const handleVariantChange = (productIndex, variantIndex) => {
    setProducts((prev) =>
      prev.map((p, i) =>
        i === productIndex
          ? { ...p, selectedVariant: p.variants[variantIndex] }
          : p
      )
    );
  };

  return (
    <div className="w-full bg-[#f6f6ed] py-8 px-4 sm:px-6 lg:px-12 lg:pt-20 lg:pb-20">
      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto overflow-x-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="inline-flex space-x-4 sm:space-x-8 md:space-x-12 justify-center w-full min-w-max">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => setActiveCategory(cat.label)}
              className={`cursor-pointer pb-2 border-b-2 transition duration-300 whitespace-nowrap flex-shrink-0 ${
                activeCategory === cat.label
                  ? "border-[#8b3f1c] text-[#8b3f1c] font-bold"
                  : "border-transparent text-gray-700 hover:text-[#8b3f1c]"
              }`}
            >
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Loading / Empty States */}
      {loading ? (
        <div className="text-center text-lg font-semibold text-gray-500 py-20">
          Loading {activeCategory.toLowerCase()}...
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-lg font-semibold text-gray-500 py-20">
          No products found.
        </div>
      ) : (
        <div className="grid max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {products.map((product, productIndex) => {
            const imagePath = product.images?.[0]
              ? `http://localhost:5000/uploads/product/${product.images[0]}`
              : "https://via.placeholder.com/200?text=No+Image";

            const options =
              product.variants?.length > 0
                ? product.variants
                : [{ name: "50", price: product.price, mrp: product.originalPrice }];

            const selectedPrice = product.selectedVariant
              ? product.selectedVariant.price
              : product.price;
            const selectedMrp = product.selectedVariant
              ? product.selectedVariant.mrp
              : product.originalPrice;
              
            return (
              <div
                key={productIndex}
                className="hover:shadow-md space-y-5 duration-300 text-center px-4 py-10 rounded-md bg-white"
              >
                <img
                  src={imagePath}
                  alt={product.name}
                  className="mx-auto h-[200px] object-cover rounded-md"
                />

                <h3 className="mt-3 font-semibold text-sm capitalize">
                  {product.name}
                </h3>

                {/* Variant Selector */}
                <select
                  className="mt-2 border rounded px-3 py-1 text-sm w-full"
                  value={product.selectedVariant?.name || "100"}
                  onChange={(e) =>
                    handleVariantChange(
                      productIndex,
                      e.target.selectedIndex
                    )
                  }
                >
                  {options.map((v, i) => (
                    <option key={i} value={v.name}>
                      {v.name}
                    </option>
                  ))}
                </select>

                {/* Price Section */}
                <div className="mt-2 space-x-3 text-md">
                  <span className="font-semibold text-gray-900">
                    ₹{selectedPrice}
                  </span>
                  {selectedMrp && (
                    <>
                      <span>|</span>
                      <span className="line-through text-gray-400">
                        ₹{selectedMrp}
                      </span>
                    </>
                  )}
                </div>

                {/* Buttons */}
                <div className="mt-3 flex justify-center gap-2">
                  <button className="border rounded-full p-2 text-[#8b3f1c] hover:text-red-500">
                    <FaHeart />
                  </button>
                  <button className="bg-[#fff] shadow-md text-[#8b3f1c] text-md px-4 py-1 rounded-full hover:bg-[#6f3014] hover:text-white">
                    Add to Cart
                  </button>
                  <button className="border rounded-full p-2 text-[#8b3f1c] hover:text-blue-500">
                    <FaShareAlt />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShopBySecondCategories;
