import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL,IMG_URL } from "../../config";

export default function AddBlogPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const token = localStorage.getItem("token");

      await axios.post(`${API_URL}/blog/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Blog created successfully!");
      navigate("/admin/blog_list");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Error creating blog");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12  p-12 ">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        ✍️ Add New Blog
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Blog Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            placeholder="Write your blog content here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-40 resize-none focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Upload Blog Image
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
              className="block w-full text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
              />
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={() => navigate("/admin/blog_list")}
            className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition"
          >
            ➕ Add Blog
          </button>
        </div>
      </form>
    </div>
  );
}
