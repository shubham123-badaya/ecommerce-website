import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]); // <-- THIS IS THE FIX

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // In the future, you would also fetch order data here
    // and use setOrders() to update the state.
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-25">
      <div className="mb-6 text-sm text-gray-500">
        Home &gt; My Account &gt; Dashboard
      </div>
      <div className="text-2xl font-bold text-[#8b3f1c]">Dashboard</div>

      <div className="flex flex-col md:flex-row gap-8">
        
        <Sidebar />

        <main className="w-full md:w-3/4">
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Profile Card */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300  hover:border border-gray-200 flex items-center space-x-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 text-4xl">👤</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{`${user.firstname} ${user.lastname}`}</h3>
                  <Link to='/user/profile' className="text-[#8b3f1c] hover:underline text-sm mt-1 inline-block">
                    <FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit Profile
                  </Link>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300  hover:border border-gray-200">
                <h3 className="font-bold text-lg mb-2 text-[#8b3f1c] uppercase">Address</h3>
                <p className="text-gray-800 font-bold text-md">{`${user.firstname} ${user.lastname}`}</p>
                <p className="text-gray-700">{user.email}</p>
                <p className="text-gray-700">{user.mobile}</p>
                <Link to='/user/bill' className="text-[#8b3f1c] hover:underline text-sm mt-2 inline-block">
                  <FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit Address
                </Link>
              </div>
            </div>

            {/* Recent Order History */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-[#8b3f1c]">Recent Order History</h3>
                <Link to="/user/order" className="text-[#8b3f1c] hover:underline text-sm">View All</Link>
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
                      <></> // Map over actual orders here
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;