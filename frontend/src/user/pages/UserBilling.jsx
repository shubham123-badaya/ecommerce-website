// src/user/pages/BillingInfoPage.jsx

import React, { useState } from "react";
import Sidebar from "./Sidebar"; // Adjust path if needed

const UserBilling = () => {
  // State to manage the billing address form
  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    country: "India",
    state: "",
    postcode: "",
  });

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend API
    console.log("Billing Address Submitted:", billingAddress);
    alert("Billing information saved!");
  };

  return (
    <div className="container mx-auto px-4 py-25">
      <div className="mb-6 text-sm text-gray-500">
        Home &gt; My Account &gt; Addresses
      </div>
       <div className="text-2xl font-bold text-[#8b3f1c]">Address</div>

      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar />

        <main className="w-full md:w-3/4">
         
          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex  font-medium text-gray-700">
                    First Name <p className="text-red-600">*</p>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={billingAddress.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
                <div>
                  <label className="flex font-medium text-gray-700">
                    Last Name <p className="text-red-600">*</p>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={billingAddress.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="flex font-medium text-gray-700">
                  Street Address <p className="text-red-600">*</p>
                </label>
                <input
                  type="text"
                  name="streetAddress1"
                  placeholder="Address Line 1"
                  value={billingAddress.streetAddress1}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
                <input
                  type="text"
                  name="streetAddress2"
                  placeholder="Address Line 2 (optional)"
                  value={billingAddress.streetAddress2}
                  onChange={handleChange}
                  className="mt-4 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label className="flex font-medium text-gray-700">
                  City <p className="text-red-600">*</p>
                </label>
                <input
                  type="text"
                  name="city"
                  value={billingAddress.city}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="flex  font-medium text-gray-700">
                    Country <p className="text-red-600">*</p>
                  </label>
                  <select
                    name="country"
                    value={billingAddress.country}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
                <div>
                  <label className="flex font-medium text-gray-700">
                    State / Province <p className="text-red-600">*</p>
                  </label>
                  <select
                    name="state"
                    value={billingAddress.state}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
                    required
                  >
                    <option value="" disabled>
                      Please Select
                    </option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>
                <div>
                  <label className="flex font-medium text-gray-700">
                    Postcode / ZIP <p className="text-red-600">*</p>
                  </label>
                  <input
                    type="text"
                    name="postcode"
                    value={billingAddress.postcode}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="cursor-pointer bg-[#8b3f1c] text-white text-sm font-semibold py-2 px-6 rounded-md hover:bg-white hover:text-[#8b3f1c] border border-[#8b3f1c] transition"
                >
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserBilling;
