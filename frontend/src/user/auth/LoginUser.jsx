import React, { useState } from "react";
import axios from "axios"; // Make sure to install axios
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const LoginUser = ({ isOpen, onClose, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("create");

  // --- STATE MANAGEMENT ---
  // State for the registration form
  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for the login form
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // State for handling errors from the API
  const [error, setError] = useState(null);
  // State for success messages
  const [success, setSuccess] = useState(null);

  // --- API URL ---
  const API_BASE_URL = "http://localhost:5000/api/user"; // Adjust if your port is different

  // --- HANDLERS ---
  // Generic handler to update state for registration form
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  // Generic handler to update state for login form
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for registration form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(null);

    // Basic validation to check if passwords match
    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/register`,
        registerData
      );
      setSuccess(response.data.message);
      // Optionally, switch to sign-in tab after a short delay
      setTimeout(() => {
        setActiveTab("signin");
        setSuccess(null);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  // Handler for login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, loginData);
      
      console.log("Login successful:", response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast.success('User Logged In Successfully!');
      if (onLoginSuccess) {
        onLoginSuccess(response.data.user);
      }
      
      setSuccess(response.data.message);
      
      setTimeout(() => {
        onClose();
        navigate("/");
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
      toast.error(errorMessage);
    }
  };

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
            onClick={() => {
              setActiveTab("signin");
              setError(null);
              setSuccess(null);
            }}
          >
            SIGN IN
          </button>
          <button
            className={`flex-1 py-2 font-medium ${
              activeTab === "create"
                ? "border-b-2 border-[#8b3f1c] text-[#8b3f1c]"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("create");
              setError(null);
              setSuccess(null);
            }}
          >
            CREATE ACCOUNT
          </button>
        </div>

        {/* --- API Messages --- */}
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center mb-4">{success}</p>}

        {/* Sign In Form */}
        {activeTab === "signin" && (
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleLoginSubmit}
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Username/email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border p-2 rounded"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full border p-2 rounded"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="text-sm">
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              className="bg-[#8b3f1c] text-white py-2 rounded font-medium"
            >
              SIGN IN
            </button>

            <a href="#" className="text-[#8b3f1c] text-sm font-medium mt-2">
              Forgot Password?
            </a>
          </form>
        )}

        {/* Create Account Form */}
        {activeTab === "create" && (
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleRegisterSubmit}
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstname"
                className="w-full border p-2 rounded"
                value={registerData.firstname}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastname"
                className="w-full border p-2 rounded"
                value={registerData.lastname}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Mobile <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="mobile"
                className="w-full border p-2 rounded"
                value={registerData.mobile}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="w-full border p-2 rounded"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                className="w-full border p-2 rounded"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full border p-2 rounded"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="privacy-policy" required />
              <label htmlFor="privacy-policy" className="text-sm">
                I agree to the{" "}
                <a href="#" className="underline font-medium text-gray-700">
                  Privacy Policy
                </a>
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

export default LoginUser;