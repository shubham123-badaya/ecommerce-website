import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  // --- State for API Feedback ---
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:5000/api/user"; // Ensure this matches your backend port

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // --- Handle Form Submission with API Call ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // --- Client-side validation ---
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!formData.agree) {
      setError("You must agree to the Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      // --- Prepare data for the backend ---
      // Note: Backend expects 'firstname', 'lastname', 'mobile'
      const payload = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        mobile: formData.phone,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      // --- API Call ---
      const response = await axios.post(`${API_BASE_URL}/register`, payload);

      setSuccess(response.data.message);
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/login"); // Assuming you have a '/login' route
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white p-6 sm:p-8 md:p-12 ">
        <p className="text-sm text-gray-500 mb-2">Home &gt; Register</p>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#92553D] mb-6">
          Register
        </h2>

        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 border border-gray-300 rounded-lg shadow-md p-6 sm:p-8"
          >
            {/* ... (Your input fields for names, email, phone, passwords remain the same) ... */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-400"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-400"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-400"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="h-4 w-4 text-amber-600 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-amber-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            
            {/* --- API Feedback Messages --- */}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {success && <p className="text-green-600 text-sm text-center">{success}</p>}

            <div className="flex gap-2 ">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#92553D] hover:bg-transparent text-white py-2 rounded-md hover:text-gray-600 duration-500 transition disabled:bg-gray-400"
              >
                {loading ? "Creating Account..." : "CREATE ACCOUNT"}
              </button>
              <button
                type="button" // Use type="button" to prevent form submission
                onClick={() => navigate(-1)}
                className="w-full bg-[#92553D] text-white py-2 rounded-md hover:bg-amber-800 transition"
              >
                BACK
              </button>
            </div>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">Already Have an Account?</p>
          <button 
            onClick={() => navigate('/myaccount')} // Navigate to login page
            className="mt-2 bg-[#92553D] text-white px-6 py-2 rounded-md hover:bg-amber-700 transition"
          >
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;