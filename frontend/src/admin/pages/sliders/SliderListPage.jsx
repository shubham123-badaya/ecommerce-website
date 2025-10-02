import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { toast } from "react-toastify";


const API_URL = "http://localhost:5000/api/slider/";

const SliderListPage = () => {
  const [sliders, setSliders] = useState([]);
  const [previewImage, setPreviewImage] = useState(null); // 👈 Preview ke liye state

  const fetchSliders = async () => {
    try {
      const res = await axios.get(API_URL);
      setSliders(res.data);
    } catch (err) {
      console.error("Error fetching sliders:", err);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this slider?")) return;
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Slider deleted successfully!");
      fetchSliders();
    } catch (err) {
      console.error("Error deleting slider:", err);
      toast.error("Failed to delete slider");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Slider List</h1>
        <Link
          to="/admin/slider_add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Slider
        </Link>
      </div>

      {/* Table List */}
      <div className="overflow-x-auto">
        <table className="w-full mt-6 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-left uppercase">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sliders.map((slider) => (
              <tr key={slider._id} className=" border-t hover:bg-gray-50">
                <td className="p-3 ">
                  <img
                    src={`http://localhost:5000/uploads/slider/${slider.image}`}
                    alt="slider"
                    className="w-20 h-14 object-cover rounded cursor-pointer hover:opacity-80"
                    onClick={() =>
                      setPreviewImage(
                        `http://localhost:5000/uploads/slider/${slider.image}`
                      )
                    }
                  />
                </td>
                <td className="p-3 flex  gap-4 text-lg">
                  <button>
                    <Link
                      to={`/admin/slider_update/${slider._id}`}
                      className="text-yellow-500"
                    >
                      <RiEdit2Line />
                    </Link>
                  </button>
                  <button
                    onClick={() => handleDelete(slider._id)}
                    className="text-red-600"
                  >
                    <MdOutlineDeleteSweep />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative">
            <img
              src={previewImage}
              alt="Preview"
              className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg"
            />
            <button
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => setPreviewImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SliderListPage;
