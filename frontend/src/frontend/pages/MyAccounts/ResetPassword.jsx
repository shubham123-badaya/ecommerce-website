import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    // here you would call API for sending reset link
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full px-4 py-10">
      <div className="mx-auto max-w-lg  p-6 sm:p-8 md:p-10 rounded-lg ">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-amber-800">
          Reset Your Password
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 text-center mt-2 mb-6 text-sm md:text-base">
          Enter your account email to receive a link allowing you to reset your
          password.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 border border-gray-300 p-6"
        >
          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-400"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            {" "}
            <button
              type="submit"
              className="w-full bg-amber-700 text-white py-2 rounded-md hover:bg-amber-800 transition"
            >
              SUBMIT
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-amber-700 text-white py-2 rounded-md hover:bg-amber-800 transition"
            >
              BACK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
