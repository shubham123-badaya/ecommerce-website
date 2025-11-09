import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, IMG_URL } from "../../config";

function AboutForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch existing About Us
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/about`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data.aboutUs;
        if (data) {
          setTitle(data.title);
          setDescription(data.description);
          if (data.image) {
            setPreview(`${IMG_URL}/about/${data.image}`);
          }
        }
      } catch (err) {
        console.log("Error fetching About Us:", err);
      }
    };
    fetchAbout();
  }, []);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit form (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) formData.append("image", image);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/about`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // ✅ Include your JWT
          },
        }
      );

      setMessage(res.data.message);
    } catch (err) {
      console.error("Error saving About Us:", err);
      setMessage("Failed to save data");
    }
  };

  return (
    <div className="flex flex-col items-center  min-h-screen  p-4">
      <div className="w-full   rounded-2xl p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold  mb-4">About Us Management</h1>

          {message && (
            <div className="mb-4 text-2xl text-center text-green-600 font-medium">
              {message}
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex max-w-4xl mt-20 flex-col gap-4"
        >
          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg p-2 h-32 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter description"
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-1">Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            />
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="flex justify-center mt-3">
              <img
                src={preview}
                alt="Preview"
                className="h-48 w-auto object-cover rounded-xl border"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Save About Us
          </button>
        </form>
      </div>
    </div>
  );
}

export default AboutForm;
