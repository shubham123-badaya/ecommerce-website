import React from "react";
import { useNavigate } from "react-router-dom";

function MyAccount() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen mt-20">
      <div className="max-w-6xl mx-auto  flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className=" text-xs sm:text-base">Home 👉 Login</p>
          <h1 className="text-2xl sm:text-2xl font-semibold text-[#92553d]">
            Login
          </h1>
        </div>
      </div>
      <div className="max-w-xl mx-auto ">
        <form className=" rounded-md p-6 space-y-5 flex flex-col justify-center border border-gray-400">
          <div>
            <label>
              Email <span className="text-red-600">*</span>
            </label>
            <br />
            <input className="border w-full p-4 rounded-md" type="email" />
          </div>
          <div>
            <label>
              Password <span className="text-red-600">*</span>
            </label>
            <br />
            <input className="border w-full p-4 rounded-md" type="password" />
          </div>
          <div className="flex justify-between">
            <div>
              <input className="text-xl" type="checkbox" />
              <label className="ml-3">Remember me</label>
            </div>
            <div className="underline" onClick={()=>navigate("/forget/reset")}>forgot password?</div>
          </div>
          <button className="px-4 py-2 bg-amber-700 text-white">SIGN IN</button>
        </form>
      </div>
      <div className="flex flex-col mt-10 justify-center space-y-4 items-center">
        <h1>Don't Have an Account?</h1>
        <button
          onClick={() => navigate("/register")}
          className="px-4 py-2 bg-amber-700 text-white "
        >
          CREATE ACCOUNT
        </button>
      </div>
    </div>
  );
}

export default MyAccount;
