import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";

const API_URL = "http://localhost:5000/api/coupons/";

const CouponListPage = () => {
  const [coupons, setCoupons] = useState([]);

  const fetchCoupons = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setCoupons(res.data);
    } catch (err) {
      console.error("Error fetching coupons:", err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });
      fetchCoupons();
    } catch (err) {
      console.error("Error deleting coupon:", err);
    }
  };

  return (
    <div className="w-full min-h-screen  p-6">
      <div className="flex justify-between items-center mb-15">
        <h1 className="text-3xl font-bold">Coupons</h1>
        <Link
          to="/admin/coupons_add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Coupon
        </Link>
      </div>

      <table className="w-full  rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 ">Code</th>
            <th className="p-2 ">Discount</th>
            <th className="p-2 ">Expiry</th>
            <th className="p-2 ">Active</th>
            <th className="p-2 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id} className="text-center  border-t">
              <td className="p-2">{coupon.code}</td>
              <td className="p-2">
                {coupon.discountType} - {coupon.discountValue}
              </td>
              <td className="p-2">
                {new Date(coupon.expiryDate).toLocaleDateString()}
              </td>
              <td className="p-2">{coupon.isActive ? "✅" : "❌"}</td>
              <td className="p-2 flex gap-2 text-lg justify-center">
                <Link
                  to={`/admin/coupons_update/${coupon._id}`}
                  className="text-blue-500  p-2 rounded-lg"
                >
                  <RiEdit2Line />
                </Link>
                <button
                  onClick={() => handleDelete(coupon._id)}
                  className="text-red-600  p-2 rounded-lg"
                >
                  <MdOutlineDeleteSweep />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CouponListPage;
