import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api/products/";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          to="/admin/products_add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Product
        </Link>
      </div>

      <table className="w-full  mt-15 ">
        <thead className="">
          <tr className="bg-gray-100  uppercase">
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t text-center">
              <td className=" p-2">
                {p.images?.length > 0 && (
                  <img
                    src={`http://localhost:5000/uploads/product/${p.images[0]}`}
                    alt={p.name}
                    className="w-16 h-16 object-auto mx-auto"
                  />
                )}
              </td>
              <td className=" p-2">{p.name}</td>
              <td className=" p-2">₹{p.price}</td>
              <td className=" p-2">{p.stock}</td>
              <td className=" p-2 space-x-2">
                <Link
                  to={`/admin/products_update/${p._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListPage;
