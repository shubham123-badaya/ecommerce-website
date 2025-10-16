import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  // ✅ Fetch blog details when component loads
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/blog/blog_detail/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTitle(res.data.title);
        setDescription(res.data.description);
        setOldImage(res.data.image);
      } catch (error) {
        console.error("Error fetching blog:", error);
        alert("Failed to fetch blog details");
      }
    };

    fetchBlog();
  }, [id]);

  // ✅ Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image); // new image (if chosen)

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/blog/update/${id}`, // 👈 confirm your backend route
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Blog updated successfully!");
      navigate("/admin/blog_list");
    } catch (err) {
      console.error("Error updating blog:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error updating blog");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded h-32"
        />

        {/* Old Image */}
        {oldImage && (
          <div>
            <p className="text-gray-700 mb-1">Current Image:</p>
            <img
              src={`http://localhost:5000/uploads/blog/${oldImage}`}
              alt="Old"
              className="h-40 object-cover rounded"
            />
          </div>
        )}

        {/* Upload New Image */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}
