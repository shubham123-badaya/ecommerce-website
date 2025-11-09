import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const AddCouponPage = () => {
  // ✅ Make sure these useState hooks exist
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // ✅ All variables exist here
      const formData = {
        code,
        discountType,
        discountValue: Number(discountValue),
        expiryDate: new Date(expiryDate),
      };

      await axios.post(`${API_URL}/coupons/create`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Coupon created successfully!");
      navigate("/admin/coupons_list");
    } catch (err) {
      console.error("Error adding coupon:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6">Add New Coupon</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Coupon Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Discount Type</label>
          <select
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Discount Value</label>
          <input
            type="number"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Expiry Date</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Coupon
        </button>
      </form>
    </div>
  );
};

export default AddCouponPage;
