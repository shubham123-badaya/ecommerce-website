import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryTabs from "./CategoryTabs";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShareAlt } from "react-icons/fa";

const ShopByCategories = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const navigate = useNavigate();

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/frontend/categories");
        const data = res.data.categories || [];
        setCategories(data);
        if (data.length > 0) setActiveCategory(data[0]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // ✅ Fetch products for active category
  useEffect(() => {
    const fetchProducts = async () => {
      if (!activeCategory) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/frontend/category/products/${activeCategory.id}`
        );
        const productData = res.data.products || [];

        // initialize selected variants
        const variantInit = {};
        productData.forEach((p) => {
          if (p.variants?.length > 0) {
            variantInit[p._id] = p.variants[0];
          } else {
            variantInit[p._id] = { name: "", price: p.price, mrp: p.price + 50 };
          }
        });

        setProducts(productData);
        setSelectedVariants(variantInit);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [activeCategory]);

  // ✅ handle variant change
  const handleVariantChange = (productId, variantName) => {
    setSelectedVariants((prev) => {
      const product = products.find((p) => p._id === productId);
      const variant = product?.variants?.find((v) => v.name === variantName);
      return {
        ...prev,
        [productId]: variant || prev[productId],
      };
    });
  };

  return (
    <div className="w-full px-6 py-12 text-center">
      <h2 className="text-3xl font-semibold">SHOP BY CATEGORIES</h2>

      {/* Category Tabs */}
      <CategoryTabs
        activeCategory={activeCategory?.title}
        onCategoryChange={(title) => {
          const cat = categories.find((c) => c.title === title);
          if (cat) setActiveCategory(cat);
        }}
        categories={categories}
      />

      {/* Description */}
      <p className="max-w-6xl mx-auto text-gray-600 text-md font-medium mb-10">
        Explore our world of delectable dry fruits at Dry Fruit Basket.
        Conveniently buy dry fruits online, and experience swift and secure
        delivery right to your doorstep. Our selection boasts a variety of
        almonds, cashews, and mixed dry fruits, all handpicked for quality.
      </p>

      {/* ✅ Product Grid */}
      <div className="grid max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {products.length > 0 ? (
          products.map((product) => {
            const variant = selectedVariants[product._id];

            return (
              <div
                key={product._id}
                className="w-[250px] bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="w-full h-[200px] flex items-center justify-center overflow-hidden rounded-t-2xl bg-gray-50">
                  <img
                    src={`http://localhost:5000/uploads/product/${product.images?.[0]}`}
                    alt={product.name}
                    className="object-contain h-full w-full"
                  />
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col items-center text-center space-y-2">
                  <h3 className="font-medium text-lg">{product.name}</h3>

                  {/* Variant Dropdown */}
                  {product.variants?.length > 0 && (
                    <select
                      value={variant?.name || ""}
                      onChange={(e) =>
                        handleVariantChange(product._id, e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none"
                    >
                      {product.variants.map((v, idx) => (
                        <option key={idx} value={v.name}>
                          {v.name} g
                        </option>
                      ))}
                    </select>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#8b3f1c] text-lg">
                      ₹{variant?.price || product.price}
                    </span>
                    {variant?.mrp && (
                      <span className="text-gray-400 line-through text-sm">
                        ₹{variant.mrp}
                      </span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-center gap-3 mt-2">
                    <button className="p-2 rounded-full border border-[#8b3f1c] text-[#8b3f1c] hover:bg-[#8b3f1c] hover:text-white transition">
                      <FaHeart />
                    </button>
                    <button className="px-4 py-2 bg-white border border-[#8b3f1c] text-[#8b3f1c] rounded-full hover:bg-[#8b3f1c] hover:text-white transition">
                      Add to Cart
                    </button>
                    <button className="p-2 rounded-full border border-[#8b3f1c] text-[#8b3f1c] hover:bg-[#8b3f1c] hover:text-white transition">
                      <FaShareAlt/>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-xl font-semibold col-span-full">
            coming soon...
          </p>
        )}
      </div>

      {/* View All Button */}
      <div className="mt-10">
        <button
          onClick={() => navigate("/dryfruit")}
          className="border border-[#8b3f1c] text-[#8b3f1c] px-6 py-2 rounded hover:bg-[#8b3f1c] hover:text-white transition"
        >
          VIEW ALL
        </button>
      </div>
    </div>
  );
};

export default ShopByCategories;
