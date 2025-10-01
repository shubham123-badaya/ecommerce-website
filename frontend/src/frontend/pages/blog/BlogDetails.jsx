import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import blogs from "./BlogsData";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogs.find((b) => String(b.id) === id);

  if (!blog) {
    return <h2 className="text-center mt-20">Blog not found!</h2>;
  }

  return (
    <div className="max-w-7xl mx-auto py-30 px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
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

      {/* Blog Content */}
      <main className="md:col-span-3">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="text-[#70512e] hover:underline mb-4"
        >
          ← Back
        </button>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-500 text-sm mb-4">13 Aug, 2025</p>

        {/* Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-72 object-cover rounded-md mb-6"
        />

        {/* Blog Content */}
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <h2 className="font-semibold text-lg">History and origin</h2>
          <p>
            Indigenous Australians were the first to consume macadamias, calling
            them names like bauple, gyndl, or jindilli.
          </p>
          <ul className="list-disc pl-5">
            <li>
              Commercial cultivation began in Australia in the late 1800s.
            </li>
            <li>
              Hawaii became a major producer in the 20th century after
              Australian trees were planted there in the 1880s.
            </li>
            <li>
              Today, major producers: Australia, South Africa, Kenya, China, and
              Hawaii.
            </li>
          </ul>

          <h2 className="font-semibold text-lg">Storage and Shelf life</h2>
          <ul className="list-disc pl-5">
            <li>
              Keep in an airtight container in the fridge (up to 6 months) or
              freezer (up to 1 year).
            </li>
            <li>Avoid warm pantry storage for long periods.</li>
          </ul>

          <h2 className="font-semibold text-lg">Health Benefits</h2>
          <ul className="list-disc pl-5">
            <li>Blood sugar control</li>
            <li>Weight Management</li>
            <li>Brain Support</li>
            <li>Gut Health</li>
            <li>Bone and Joint health</li>
            <li>Skin Health</li>
          </ul>
        </div>

        {/* Share */}
        <div className="flex items-center justify-end gap-2 mt-8">
          <span>Share:</span>
          <a href="#" className="hover:underline">
            <img
              src="https://www.dryfruitbasket.in/themes/storefront/public/images/icons/facebook.svg?v=2.1.1"
              alt="fb"
              
            />
          </a>
          <a href="#" className="hover:underline">
            <img
              src="https://www.dryfruitbasket.in/themes/storefront/public/images/icons/twitter.svg?v=2.1.1"
              alt="tw"
            />
          </a>
          <a href="#" className="hover:underline">
            <img
              src="https://www.dryfruitbasket.in/themes/storefront/public/images/icons/instagram.svg?v=2.1.1"
              alt="IG"
            />
          </a>
        </div>

        {/* Prev / Next */}
        <div className="flex justify-between mt-10 text-sm text-gray-700">
          <button className="hover:underline">← Prev Post</button>
          <button className="hover:underline">Next Post →</button>
        </div>
      </main>
    </div>
  );
};

export default BlogDetails;
