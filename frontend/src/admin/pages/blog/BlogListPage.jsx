import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import axios from "axios";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blog/all_blogs");
      setBlogs(res.data.blogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = (id) => {
    setBlogs((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <div className="max-w-full mx-auto mt-10 p-12 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6  pb-3">
        <h1 className="text-3xl font-bold text-gray-800">📚 Blog List</h1>
        <Link
          to="/admin/blog_add"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          + Add New Blog
        </Link>
      </div>

      {/* Table/List */}
      {blogs.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No blogs available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full ">
            <thead >
              <tr>
                <th className=" px-4 py-2 text-left font-semibold">Image</th>
                <th className=" px-4 py-2 text-left  font-semibold">Title</th>
                <th className=" px-4 py-2 text-left font-semibold">Description</th>
                <th className=" px-4 py-2 text-center  font-semibold ">Actions</th>
              </tr>
            </thead>
            <tbody className="border-t">
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50 transition">
                  <td className=" px-4 py-2">
                    {blog.image ? (
                      <img
                        src={`http://localhost:5000/uploads/blog/${blog.image}`}
                        alt={blog.title}
                        className="w-auto h-16 object-cover rounded-md shadow-sm"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm">
                        No Img
                      </div>
                    )}
                  </td>
                  <td className=" px-4 py-2 font-medium text-gray-800">
                    {blog.title}
                  </td>
                  <td className=" px-4 py-2 text-gray-600">
                    {blog.description?.length > 100
                      ? blog.description.slice(0, 100) + "..."
                      : blog.description}
                  </td>
                  <td className=" px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/admin/blog_update/${blog._id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={async () => {
                          if (window.confirm("Are you sure you want to delete this blog?")) {
                            try {
                              const token = localStorage.getItem("token");
                              await axios.delete(
                                `http://localhost:5000/api/blog/delete/${blog._id}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                }
                              );
                              handleDelete(blog._id);
                            } catch (err) {
                              console.error(err);
                              alert("Failed to delete blog");
                            }
                          }
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
