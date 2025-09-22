import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/products/";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(`${API_URL}delete/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          to="/admin/products_add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={`http://localhost:5000/uploads/product/${prod.images[0]}`}
                    alt={prod.name}
                    className="w-20 h-14 object-cover rounded cursor-pointer hover:opacity-80"
                    onClick={() =>
                      setPreviewImage(
                        `http://localhost:5000/uploads/product/${prod.images[0]}`
                      )
                    }
                  />
                </td>
                <td className="p-3 font-medium">{prod.name}</td>
                <td className="p-3">{prod.category?.title || "N/A"}</td>
                <td className="p-3">₹{prod.price}</td>
                <td className="p-3">{prod.stock}</td>
                <td className="p-3 flex gap-3">
                  <Link
                    to={`/admin/product_update/${prod._id}`}
                    className="bg-yellow-500 px-3 py-1 rounded-lg text-white"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(prod._id)}
                    className="bg-red-600 px-3 py-1 rounded-lg text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
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

export default ProductListPage;
