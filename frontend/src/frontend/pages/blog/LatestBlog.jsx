import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import blogs from "./BlogsData";

const LatestBlog = () => {
  const [index, setIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const navigate = useNavigate();

  // Detect screen size
  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1); // Mobile
      } else {
        setCardsToShow(3); // Laptop/Desktop
      }
    };

    updateCards();
    window.addEventListener("resize", updateCards);

    return () => window.removeEventListener("resize", updateCards);
  }, []);

  const prevSlide = () => {
    setIndex(index === 0 ? blogs.length - cardsToShow : index - 1);
  };

  const nextSlide = () => {
    setIndex(index === blogs.length - cardsToShow ? 0 : index + 1);
  };
  

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 relative">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        LATEST BLOG
      </h2>

      <div className="relative flex items-center">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-0 bg-white shadow rounded-full p-2 hover:bg-gray-100 z-10"
        >
          <FaChevronLeft className="text-[#70512e]" size={20} />
        </button>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 w-full mx-auto overflow-hidden">
          {blogs.slice(index, index + cardsToShow).map((blog) => (
            <div
              key={blog.id}
              className="rounded-md shadow hover:shadow-lg transition"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-t-md"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-3">{blog.desc}</p>
                <Link
                  to={`/blogs/${blog.id}`}
                  className="text-[#70512e] font-semibold hover:underline"
                >
                  READ MORE →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-0 bg-white shadow rounded-full p-2 hover:bg-gray-100 z-10"
        >
          <FaChevronRight className="text-[#70512e]" size={20} />
        </button>
      </div>

      <div className="flex justify-center mt-10 font-bold text-lg text-[#70512e]">
        <button onClick={() => navigate("/blogs")}>VIEW ALL</button>
      </div>
    </div>
  );
};

export default LatestBlog;
