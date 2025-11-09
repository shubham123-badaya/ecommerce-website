import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL, IMG_URL } from "../../config";

export default function BlogCard({ blog, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const token = localStorage.getItem("token"); // 👈 get token from storage
        await axios.delete(
          `${API_URL}/blog/delete/${blog._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // 👈 send token to backend
            },
          }
        );
        onDelete(blog._id);
      } catch (error) {
        console.error("Delete failed:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Unauthorized or server error");
      }
    }
  };

  return (
    <div className="border   rounded-lg bg-white shadow-md overflow-hidden">
      {blog.image && (
        <img
          src={`${IMG_URL}/blog/${blog.image}`}
          alt={blog.title}
          className="h-30 w-full object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold">{blog.title}</h3>
        <p className="text-gray-600 mt-2 line-clamp-3">{blog.description}</p>
        <div className="flex gap-3 mt-4">
          <Link
            to={`/admin/blog_update/${blog._id}`}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
