import React, { useState } from "react";
import blogs from "./BlogsData";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const AllBlogsPage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 md:px-8 relative">
      {/* Mobile Header */}
      <div className="flex justify-between items-center mb-6 md:hidden">
        <button
          onClick={() => navigate(-1)}
          className="text-[#70512e] font-semibold hover:underline"
        >
          ← Back
        </button>
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-[#70512e] text-xl flex items-center gap-2 font-semibold"
        >
          Filters <FaBars />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside
          className={`
    h-full w-64 bg-white p-6 overflow-y-auto
    md:relative md:w-1/4 md:translate-x-0 md:z-auto
    fixed top-0 right-0 z-50 transform transition-transform duration-300
    md:flex-shrink-0
    ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
  `}
        >
          {/* Close Button for Mobile */}
          <div className="flex justify-end md:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-700 text-2xl"
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

          {/* Recent Posts */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">RECENT POSTS</h3>
            <ul className="space-y-2 text-sm text-[#70512e] font-medium">
              {blogs.slice(0, 3).map((post) => (
                <li key={post.id} className="flex items-center gap-2 border-b pb-2">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <span className="text-sm sm:text-base">{post.title}</span>
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
            <div className="flex flex-wrap gap-2">
              <span className="inline-block bg-[#70512e] text-white px-3 py-1 text-sm rounded">
                Blog Tag
              </span>
              <span className="inline-block bg-[#70512e] text-white px-3 py-1 text-sm rounded">
                Tutorial
              </span>
              <span className="inline-block bg-[#70512e] text-white px-3 py-1 text-sm rounded">
                Tips
              </span>
            </div>
          </div>
        </aside>

        {/* Blog Grid */}
        <main className="flex-1 space-y-8 md:space-y-10">
          {/* Desktop Back Button */}
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
              className={`grid grid-cols-1 sm:grid-cols-2 gap-6 items-center border rounded-2xl p-4 w-full transition-transform hover:shadow-lg`}
            >
              {index % 2 === 0 ? (
                <>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 sm:h-52 object-cover rounded-md hover:scale-105 duration-500"
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
                    className="w-full h-48 sm:h-52 object-cover rounded-md hover:scale-105 duration-500"
                  />
                </>
              )}
            </div>
          ))}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
        />
      )}
    </div>
  );
};

export default AllBlogsPage;
