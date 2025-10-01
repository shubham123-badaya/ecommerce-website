import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function Review() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="bg-[#f6f6ed] min-h-screen w-full px-4 sm:px-8 md:px-16 py-10 md:py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-lg sm:text-xl uppercase font-semibold text-center mb-6">
          Reviews (5)
        </h1>

        <div className="space-y-4">
          <h2 className="border-b pb-2 uppercase text-base sm:text-lg">
            Add a review
          </h2>
          <p className="text-sm sm:text-base">
            Your email address will not be published. Required fields are marked{" "}
            <span className="text-red-500">*</span>
          </p>

          <form className="space-y-6 mt-6">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="border w-full h-10 px-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brown-300"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="border w-full h-10 px-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brown-300"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                className="border w-full h-10 px-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brown-300"
              />
            </div>

            {/* Rating */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                Your Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-1 text-yellow-500 text-xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer transition duration-200 ${
                      (hoverRating || rating) >= star ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                ))}
                {rating > 0 && (
                  <span className="text-sm ml-2 text-gray-700">
                    {rating} / 5
                  </span>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="bg-[#8f6e52] text-white px-6 py-2 rounded hover:bg-brown-800 transition duration-300"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Review;
