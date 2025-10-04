import React, { useState } from "react";
import blogs from "./BlogsData";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const AllBlogsPage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 md:px-8">
      {/* Mobile Header with Hamburger on Right */}
      <div className="flex justify-between items-center mb-4 md:hidden">
        <button
          onClick={() => navigate(-1)}
          className="text-[#70512e] font-semibold hover:underline"
        >
          ← Back
        </button>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-[#70512e] text-xl flex items-center gap-2 font-semibold"
        >
          Filters <FaBars />
        </button>
      </div>

      <div className="flex md:grid md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 md:relative md:translate-x-0 md:col-span-1 p-6 overflow-y-auto
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Close Button for Mobile */}
          <div className="flex justify-end md:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-700 text-xl"
            >
              <FaTimes />
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">SEARCH</h3>
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#70512e]"
            />
          </div>

          {/* Recent Post */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">RECENT POST</h3>
            <ul className="space-y-2 text-sm text-[#70512e] font-medium">
              {blogs.slice(0, 3).map((post) => (
                <li
                  key={post.id}
                  className="flex items-center gap-2 border-b pb-2"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-20 h-auto rounded"
                  />
                  <a href="#" className="hover:underline text-sm sm:text-base">
                    {post.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Archive */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">ARCHIVE</h3>
            <ul className="text-sm space-y-1">
              <li>September 2025</li>
              <li>August 2025</li>
              <li>July 2025</li>
              <li>June 2024</li>
              <li>February 2024</li>
            </ul>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold mb-2">TAGS</h3>
            <span className="inline-block bg-[#70512e] text-white px-3 py-1 text-sm rounded">
              Blog Tag
            </span>
          </div>
        </aside>

        {/* Blog Grid */}
        <main className="md:col-span-3 space-y-10 w-full">
          {/* Desktop Back button */}
          <div className="hidden md:block mb-4">
            <button
              onClick={() => navigate(-1)}
              className="text-[#70512e] hover:underline"
            >
              ← Back
            </button>
          </div>

          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center border rounded-2xl p-4 w-full"
            >
              {index % 2 === 0 ? (
                <>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full hover:scale-105 duration-700 h-48 sm:h-52 object-cover rounded-md"
                  />
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 mb-3 text-sm sm:text-base">
                      {blog.desc}
                    </p>
                    <Link
                      to={`/blogs/${blog.id}`}
                      className="text-[#70512e] font-semibold hover:underline text-sm sm:text-base"
                    >
                      READ MORE →
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 mb-3 text-sm sm:text-base">
                      {blog.desc}
                    </p>
                    <Link
                      to={`/blogs/${blog.id}`}
                      className="text-[#70512e] font-semibold hover:underline text-sm sm:text-base"
                    >
                      READ MORE →
                    </Link>
                  </div>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full hover:scale-105 duration-700 h-48 sm:h-52 object-cover rounded-md"
                  />
                </>
              )}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default AllBlogsPage;
