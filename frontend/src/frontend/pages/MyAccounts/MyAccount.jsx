import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyAccount() {
  const navigate = useNavigate();

  // --- State Management ---
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "http://localhost:5000/api/user";

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/user/dashboard");
    }
  }, [navigate]);

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!loginData.email || !loginData.password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, loginData);

      // Save token + user
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setSuccess(response.data.message);

      setTimeout(() => {
        navigate("/user/dashboard");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen mt-20">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-xs sm:text-base">Home 👉 Login</p>
          <h1 className="text-2xl sm:text-2xl font-semibold text-[#92553d]">
            Login
          </h1>
        </div>
      </div>

      {/* --- Login Form --- */}
      <div className="max-w-xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="rounded-md p-6 space-y-5 flex flex-col justify-center border border-gray-400"
        >
          <div>
            <label>
              Email <span className="text-red-600">*</span>
            </label>
            <br />
            <input
              className="border w-full p-4 rounded-md"
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>
              Password <span className="text-red-600">*</span>
            </label>
            <br />
            <input
              className="border w-full p-4 rounded-md"
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between">
            <div>
              <input className="text-xl" type="checkbox" id="remember-me" />
              <label className="ml-3" htmlFor="remember-me">
                Remember me
              </label>
            </div>
            <div
              className="underline cursor-pointer"
              onClick={() => navigate("/forget/reset")}
            >
              forgot password?
            </div>
          </div>

          {/* --- Feedback Messages --- */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm text-center">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-amber-700 text-white rounded-md disabled:bg-gray-400"
          >
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>
      </div>

      <div className="flex flex-col mt-10 justify-center space-y-4 items-center">
        <h1>Don't Have an Account?</h1>
        <button
          onClick={() => navigate("/register")}
          className="px-4 py-2 bg-amber-700 text-white rounded-md"
        >
          CREATE ACCOUNT
        </button>
      </div>
    </div>
  );
}

export default MyAccount;
