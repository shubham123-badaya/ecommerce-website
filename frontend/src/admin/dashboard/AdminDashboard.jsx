import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between  mb-5">
        <h1>DASHBOARD</h1>
        <input type="text"  placeholder=" search" className="border rounded-lg" />
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-gray-500">Total Sales</h3>
          <p className="text-2xl font-bold">$45,230</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-gray-500">Orders</h3>
          <p className="text-2xl font-bold">1,245</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-gray-500">Customers</h3>
          <p className="text-2xl font-bold">845</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">Order ID</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Status</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">#1234</td>
              <td className="p-2">John Doe</td>
              <td className="p-2 text-green-600">Completed</td>
              <td className="p-2">$120</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">#1235</td>
              <td className="p-2">Jane Smith</td>
              <td className="p-2 text-yellow-600">Pending</td>
              <td className="p-2">$89</td>
            </tr>
            <tr>
              <td className="p-2">#1236</td>
              <td className="p-2">Alex Johnson</td>
              <td className="p-2 text-red-600">Cancelled</td>
              <td className="p-2">$45</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
