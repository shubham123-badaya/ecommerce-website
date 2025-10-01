import React from "react";
import blogs from "./BlogsData";
import { Link, useNavigate } from "react-router-dom";

const AllBlogsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto py-35 lg:py-25 px-4  md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 space-y-8">
          {/* Search */}
          <div>
            <h3 className="text-lg font-semibold mb-2">SEARCH</h3>
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#70512e]"
            />
          </div>

          {/* Recent Post */}
          <div>
            <h3 className="text-lg font-semibold mb-2">RECENT POST</h3>
            <ul className="space-y-2 text-sm text-[#70512e]  font-medium">
              {blogs.slice(0, 3).map((post) => (
                <li
                  key={post.id}
                  className="flex border-b space-y-4 items-center gap-2 "
                >
                  <img src={post.image} alt="" className="w-20 h-auto" />
                  <a href="#">{post.title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Archive */}
          <div>
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
        <main className="md:col-span-3 space-y-10">
  <button
    onClick={() => navigate(-1)}
    className="text-[#70512e] hover:underline mb-4"
  >
    ← Back
  </button>

  {blogs.map((blog, index) => (
    <div
      key={blog.id}
      className={`grid grid-cols-1  border rounded-2xl p-4 sm:grid-cols-2 gap-6 items-center`}
    >
      {/* Agar index odd hai to image ko right side pe le jao */}
      {index % 3 === 0 ? (
        <>
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full hover:scale-105 duration-700 h-50  object-cover rounded-md"
          />
          <div>
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-3">{blog.desc}</p>
            <Link
              to={`/blogs/${blog.id}`}
              className="text-[#70512e] font-semibold hover:underline"
            >
              READ MORE →
            </Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-3">{blog.desc}</p>
            <Link
              to={`/blogs/${blog.id}`}
              className="text-[#70512e] font-semibold hover:underline"
            >
              READ MORE →
            </Link>
          </div>
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full hover:scale-105 duration-700 h-48 object-cover rounded-md"
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
