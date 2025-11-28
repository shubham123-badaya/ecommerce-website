import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL, IMG_URL } from "../../../admin/config";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [variant, setVariant] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  useEffect(() => {
    if (product?.images?.length > 1) {
      const interval = setInterval(() => {
        setMainImageIndex((prevIndex) =>
          prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // 3 seconds per image

      return () => clearInterval(interval); // cleanup on unmount
    }
  }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  // Set default variant
  useEffect(() => {
    if (product?.variants?.length > 0) {
      setVariant(product.variants[0]);
    }
  }, [product]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-8 mt-12 font-serif">
        {/* <h1 className="text-3xl lg:text-4xl text-[#8a6745] font-extrabold tracking-wide text-center pb-10 underline">
          Product Details
        </h1> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex justify-center gap-4">
            <div className="flex gap-2 mt-3 justify-center">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={`${IMG_URL}/product/${img}`}
                  alt={`Thumbnail ${i}`}
                  className={`w-20 h-20 object-cover rounded border cursor-pointer ${
                    mainImageIndex === i
                      ? "border-2 border-[#8a6745]"
                      : "border-gray-300"
                  }`}
                  onClick={() => setMainImageIndex(i)} // user click overrides auto slide temporarily
                />
              ))}
            </div>

            <div className="bg-white border rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300">
              <img
                src={`${IMG_URL}/product/${product.images[mainImageIndex]}`}
                alt={product.name}
                className="w-72 md:w-90 rounded-xl object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl text-[#8a6745] font-bold">
              {product.name}
            </h1>

            <p className="text-lg text-gray-700">
              <span className="font-semibold">Category:</span>{" "}
              {product.category?.title}
            </p>

            <p className="text-lg text-gray-700">
              <span className="font-semibold">Stock:</span>{" "}
              {product.stock > 0
                ? `${product.stock} Available`
                : "Out of Stock"}
            </p>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-[#8b3f1c]">
                ₹{variant?.price || product.price}
              </span>
              {variant?.mrp && (
                <span className="text-gray-400 line-through text-lg">
                  ₹{variant.mrp}
                </span>
              )}
            </div>

            {/* Variants */}
            {product.variants?.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-[#8a6745] mb-2">
                  Select Variant:
                </h3>

                <div className="flex gap-3 flex-wrap">
                  {product.variants.map((v, index) => (
                    <button
                      key={index}
                      onClick={() => setVariant(v)}
                      className={`px-3 py-1 rounded-full text-sm border ${
                        variant?.name === v.name
                          ? "bg-[#8a6745] text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Status Tags */}
            <div className="flex gap-3 flex-wrap">
              {product.is_featured === 1 && (
                <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm">
                  Featured
                </span>
              )}
              {product.isBestSelling === 1 && (
                <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">
                  Best Selling
                </span>
              )}
              {product.isNewArrival === 1 && (
                <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">
                  New Arrival
                </span>
              )}
              {product.isTopRated === 1 && (
                <span className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm">
                  Top Rated
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gray-800 hover:bg-black text-white px-6 py-3 rounded-xl shadow-lg font-medium transition w-full sm:w-auto">
                Add to Cart
              </button>

              <button className="bg-[#8a6745] hover:bg-[#6b4f34] text-white px-6 py-3 rounded-xl shadow-lg font-medium transition w-full sm:w-auto">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-10" />
    </>
  );
};

export default ProductDetail;
