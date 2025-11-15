import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById, fetchBlogs } from "../../redux/blogSlice";
import { IMG_URL } from "../../../admin/config";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singleBlog, blogs, loading } = useSelector((state) => state.blog);

  // ✅ Fetch single blog and recent posts
  useEffect(() => {
    dispatch(fetchBlogById(id)); // get one blog
    if (!blogs.length) {
      dispatch(fetchBlogs()); // for recent posts sidebar
    }
  }, [dispatch, id]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  if (!singleBlog) {
    return <h2 className="text-center mt-20">Blog not found!</h2>;
  }

  const blog = singleBlog.blog || singleBlog; // handle API returning { blog: {...} } or direct object

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

        {/* Recent Posts */}
        <div>
          <h3 className="text-lg font-semibold mb-2">RECENT POSTS</h3>
          <ul className="space-y-2 text-sm text-[#70512e] font-medium">
            {blogs.slice(0, 3).map((post) => (
              <li key={post._id} className="flex border-b items-center gap-2 pb-2">
                <img
                  src={`${IMG_URL}/blog/${post.image}`}
                  alt={post.title}
                  className="w-20 h-auto rounded"
                />
                <button
                  onClick={() => navigate(`/blog/${post._id}`)}
                  className="hover:underline text-left"
                >
                  {post.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Blog Content */}
      <main className="md:col-span-3">
        <button
          onClick={() => navigate(-1)}
          className="text-[#70512e] hover:underline mb-4"
        >
          ← Back
        </button>

        <h1 className="text-2xl md:text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-500 text-sm mb-4">
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        <img
          src={`${IMG_URL}/blog/${blog.image}`}
          alt={blog.title}
          className="w-full h-72 object-cover rounded-md mb-6"
        />

        <p className="text-gray-700 leading-relaxed">{blog.description}</p>

        {/* Share Section */}
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
