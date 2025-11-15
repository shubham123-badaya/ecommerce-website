import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../../redux/blogSlice";
import { API_URL, IMG_URL } from "../../../admin/config";

const LatestBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, loading } = useSelector((state) => state.blog);
  const [index, setIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    const updateCards = () => {
      setCardsToShow(window.innerWidth < 768 ? 1 : 3);
    };
    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
  }, []);

  const prevSlide = () =>
    setIndex(index === 0 ? blogs.length - cardsToShow : index - 1);
  const nextSlide = () =>
    setIndex(index === blogs.length - cardsToShow ? 0 : index + 1);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 relative">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        LATEST BLOG
      </h2>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs available</p>
      ) : (
        <div className="relative flex items-center">
          <button
            onClick={prevSlide}
            className="absolute left-0 bg-white shadow rounded-full p-2 hover:bg-gray-100 z-10"
          >
            <FaChevronLeft className="text-[#70512e]" size={20} />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 w-full mx-auto overflow-hidden">
            {blogs.slice(index, index + cardsToShow).map((blog) => (
              <div
                key={blog._id}
                className="rounded-md shadow hover:shadow-lg transition bg-white"
              >
                {blog.image && (
                  <img
                    src={`${IMG_URL}/blog/${blog.image}`}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-t-md"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-3">
                    {blog.description?.slice(0, 80)}...
                  </p>
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="text-[#70512e] font-semibold hover:underline"
                  >
                    READ MORE →

                  </Link>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 bg-white shadow rounded-full p-2 hover:bg-gray-100 z-10"
          >
            <FaChevronRight className="text-[#70512e]" size={20} />
          </button>
        </div>
      )}

      <div className="flex justify-center mt-10 font-bold text-lg text-[#70512e]">
        <button onClick={() => navigate("/blogs")}>VIEW ALL</button>
      </div>
    </div>
  );
};

export default LatestBlog;
