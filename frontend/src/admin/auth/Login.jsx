// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";
// import { useAuth } from "../context/AuthContext";

// import { API_URL } from "../config";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // /const { setUser } = useAuth();

//   const navigate = useNavigate();
// // sign_in.jsx (login handler)
// const handleLogin = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await fetch(`${API_URL}/admin/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       // ✅ Save token & user in localStorage
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       toast.success("Login successful!");

//       // ✅ Navigate to dashboard
//       navigate("/admin/dashboard");
//     } else {
//       toast.error(data.message || "Invalid credentials");
//     }
//   } catch (err) {
//     toast.error("Something went wrong.");
//     console.error(err);
//   }
// };


//   return (
//     <div>
//       {/* <ToastContainer /> */}
//       <div className="w-full h-min-screen mx-auto bg-gradient-to-r from-blue-600 to-blue-800 flex min-h-screen">
//         <div className="w-full lg:w-1/2 bg-neutral-900 text-white flex flex-col lg:items-end justify-center lg:rounded-l-xs rounded-4xl sm:mx-18 mx-8 my-15 lg:m-0">
//           <div className="container px-2 bg-neutral-900 lg:pl-33 w-full mx-0 sm:py-32 py-2 rounded-4xl">
//             <div className="px-1 container mx-auto">
//               <div className="mx-10 text-[#c0bcbc] text-2xl font-bold rounded-md pt-4">
//                 <h1>E-Commerce</h1>
//               </div>

//               <div className="pt-5">
//                 <h1 className="text-xl mx-10 font-bold justify-start">
//                   Sign In
//                 </h1>
//               </div>
//             </div>

//             <form className="container px-10 mx-auto" onSubmit={handleLogin}>
//               <div>
//                 <label className="block text-sm mb-1 text-slate-600 pt-5">
//                   Email*
//                 </label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="johnny.depp@left4code.com"
//                   className="w-full px-4 py-2 bg-neutral-800 text-white border ml-1 border-neutral-700 rounded-md"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm mb-1 text-slate-600 pt-5">
//                   Password*
//                 </label>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="*********"
//                   className="bg-neutral-800 w-full px-4 py-2 rounded-md ml-1 border border-neutral-700 text-white"
//                 />
//               </div>

//               <div className="flex justify-between pt-2">
//                 <label className="flex items-center">
//                   <input type="checkbox" className="accent-blue-500" />
//                   <p className="text-sm text-gray-400 ml-2 shrink-0">
//                     Remember Me
//                   </p>
//                 </label>
//                 <p className="text-gray-400 text-sm">Forgot Password?</p>
//               </div>

//               <div className="pt-4 items-center text-sm">
//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" className="accent-blue-500" />
//                   <p className="text-gray-400">
//                     I agree to the Envato{" "}
//                     <a href="#" className="text-white">
//                       Privacy Policy
//                     </a>
//                   </p>
//                 </label>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-blue-600 to-blue-800 py-2 rounded-full border-1 font-semibold mt-4 hover:opacity-90 mb-4"
//               >
//                 Sign In
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-r from-blue-800 to-blue-200 text-white p-12 flex-col justify-center">
//           <h1 className="text-4xl font-bold leading-tight mb-4">
//             Innovate your imagination <br /> into Reality
//           </h1>
//           <p className="text-lg max-w-md text-blue-100">
//             Unlock the potential of Tailwise. Build stunning, structured
//             dashboards using Tailwind & React.
//           </p>
//           <div className="mt-6 flex items-center gap-3">
//             <div className="flex -space-x-2">
//               <img
//                 className="w-8 h-8 rounded-full border-2 border-white"
//                 src="https://randomuser.me/api/portraits/women/1.jpg"
//               />
//               <img
//                 className="w-8 h-8 rounded-full border-2 border-white"
//                 src="https://randomuser.me/api/portraits/women/2.jpg"
//               />
//               <img
//                 className="w-8 h-8 rounded-full border-2 border-white"
//                 src="https://randomuser.me/api/portraits/men/1.jpg"
//               />
//             </div>
//             <p className="text-sm">Over 7k+ strong and growing!</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#7a3a2e] to-[#b1907e]">
      <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden w-[90%] md:w-[70%] lg:w-[60%] max-w-5xl">
        {/* Left Section (Image / Branding) */}
        <div className="hidden md:flex md:w-1/2 bg-[url('https://www.theabsolutenuts.in/cdn/shop/files/dry-fruits.webp?v=1725916565')] bg-cover bg-center relative">
          <div className="absolute  bg-[#00000066] backdrop-blur-md"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="text-sm text-gray-100 mt-1">
              Taste the freshness. Shop premium dry fruits with us.
            </p>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#f5edea]">
          <h1 className="text-3xl font-bold text-[#7a3a2e] mb-1 text-center">
            Sign In
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Continue to your account
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@dryfruit.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-[#fffdf9] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#b18248]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-[#fffdf9] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#b18248]"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#b18248]" />
                Remember Me
              </label>
              <a href="#" className="text-[#b18248] hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#7a3a2e] to-[#b07b44] text-white font-semibold py-3 rounded-full shadow-md hover:opacity-90 transition-all"
            >
              Sign In
            </button>

            <div className="text-center text-sm text-gray-600 pt-2">
              Don’t have an account?{" "}
              <a href="/signup" className="text-[#b18248] font-semibold hover:underline">
                Create One
              </a>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              By signing in, you agree to our{" "}
              <a href="#" className="text-[#b18248] hover:underline">
                Privacy Policy
              </a>{" "}
              &{" "}
              <a href="#" className="text-[#b18248] hover:underline">
                Terms of Use
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
