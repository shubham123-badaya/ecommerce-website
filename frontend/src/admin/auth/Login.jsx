import React, { useState } from "react";

const Login = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("create"); // Defaulted to 'create' to match image

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-700 text-xl"
        onClick={onClose}
      >
        ✕
      </button>

      {/* Sidebar Content */}
      <div className="p-6 mt-6 h-full overflow-y-auto">
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-1">My Dry Fruits Account</h2>
        <p className="text-gray-600 mb-6">Create an account to personalize.</p>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`flex-1 py-2 font-medium ${
              activeTab === "signin"
                ? "border-b-2 border-[#8b3f1c] text-[#8b3f1c]"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("signin")}
          >
            SIGN IN
          </button>
          <button
            className={`flex-1 py-2 font-medium ${
              activeTab === "create"
                ? "border-b-2 border-[#8b3f1c] text-[#8b3f1c]"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("create")}
          >
            CREATE ACCOUNT
          </button>
        </div>

        {/* Sign In Form */}
        {activeTab === "signin" && (
          <form className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Username/email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="text-sm">
                Remember Me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#8b3f1c] text-white py-2 rounded font-medium"
            >
              SIGN IN
            </button>

            {/* Forgot Password */}
            <a href="#" className="text-[#8b3f1c] text-sm font-medium mt-2">
              Forgot Password?
            </a>
          </form>
        )}

        {/* Create Account Form (Updated as per the image) */}
        {activeTab === "create" && (
          <form className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Mobile <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="privacy-policy" />
              <label htmlFor="privacy-policy" className="text-sm">
                I agree to the <a href="#" className="underline font-medium text-gray-700">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              className="bg-[#8b3f1c] text-white py-2 rounded font-medium mt-2"
            >
              CREATE ACCOUNT
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;