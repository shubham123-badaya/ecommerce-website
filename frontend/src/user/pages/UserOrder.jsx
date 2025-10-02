// src/pages/UserOrder.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';// Ensure this path is correct

const UserOrder = () => {
  // DEFINED: The 'orders' array. In a real app, you would fetch this data.
  const orders = []; 

  return (
    // FIXED: Changed py-25 to a valid Tailwind class like py-8
    <div className="container mx-auto px-4 py-25">
      <div className="mb-6 text-sm text-gray-500">
        Home &gt; My Account &gt; My Orders
      </div>
      <div className="text-2xl font-bold text-[#8b3f1c]">Orders</div>

      {/* ADDED: Two-column layout wrapper */}
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar />

        {/* ADDED: Main content area wrapper for proper spacing */}
        <main className="w-full md:w-3/4">
          <h2 className="text-2xl font-bold text-[#8b3f1c] mb-6">My Orders</h2>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              {/* <h3 className="font-bold text-lg text-[#8b3f1c]">Order History</h3> */}
              {/* Optional: You can remove the "View All" link if you're already on the main orders page */}
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-4 py-2 text-left text-lg font-bold text-gray-900">Order ID</th>
                    <th className="px-4 py-2 text-left text-lg font-bold text-gray-900">Date</th>
                    <th className="px-4 py-2 text-left text-lg font-bold text-gray-900">Total</th>
                    <th className="px-4 py-2 text-left text-lg font-bold text-gray-900">Status</th>
                    <th className="px-4 py-2 text-left text-lg font-bold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-gray-900 text-center text-lg font-bold py-8">No Order Found!</td>
                    </tr>
                  ) : (
                    <></> // You would map over your actual orders here
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserOrder;