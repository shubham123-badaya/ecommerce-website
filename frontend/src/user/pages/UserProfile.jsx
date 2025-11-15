// import React, { useState } from 'react';
// import Sidebar from './Sidebar'; // Adjust the import path if needed

// const UserProfile = () => {
//   // Use state to manage the form inputs
//   const [formData, setFormData] = useState({
//     firstName: 'Rahul',
//     lastName: 'Kumar',
//     email: 'rahul247@gmail.com',
//     phone: '9786543210',
//     password: '',
//     confirmPassword: '',
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would typically send the data to your backend API
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     console.log('Form data submitted:', formData);
//     alert('Profile saved successfully!');
//   };

//   return (
//     <div className="container mx-auto px-4 py-25">
//       {/* Breadcrumb */}
//       <div className="mb-6 text-sm text-gray-500">
//         Home &gt; My Account &gt; Profile
//       </div>
//       <div className="text-2xl font-bold text-[#8b3f1c]">Profile</div>

//       <div className="flex flex-col md:flex-row gap-8">
//         <Sidebar />

//         {/* --- Account Settings Form --- */}
//         <main className="w-full md:w-3/4 bg-white p-8 rounded-lg shadow-md">
//           <h2 className="text-4xl font-bold text-[#8b3f1c] mb-6 lg:px-22 ">Account Settings</h2>
          
//           <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
//             <div className="flex-shrink-0 lg:w-1/3 flex flex-col items-center space-y-4">
//               <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-6xl">
//                 👤
//               </div>
//               <label htmlFor="imageUpload" className="cursor-pointer bg-[#8b3f1c] text-white text-sm font-semibold py-2 px-6 rounded-md hover:bg-white hover:text-[#8b3f1c] border border-[#8b3f1c] transition">
//                 CHOOSE IMAGE
//               </label>
//               <input type="file" id="imageUpload" className="hidden" />
//             </div>
//             {/* Left side: Form fields */}
//             <div className="flex-grow space-y-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-700 flex">First Name <p className='text-red-600'>*</p></label>
//                 <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
//               </div>
//               <div>
//                 <label className=" text-sm font-medium text-gray-700 flex">Last Name <p className='text-red-600'>*</p></label>
//                 <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
//               </div>
//               <div>
//                 <label className="flex text-sm font-medium text-gray-700">Email <p className='text-red-600'>*</p></label>
//                 <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 " readOnly />
//               </div>
//               <div>
//                 <label className="flex text-sm font-medium text-gray-700">Phone <p className='text-red-600'>*</p></label>
//                 <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Password</label>
//                 <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
//                 <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
//               </div>
//               <div className="mt-8 ">
//             <button type="submit" form="profileForm" onClick={handleSubmit} className="cursor-pointer bg-[#8b3f1c] text-white text-sm font-semibold py-2 px-6 rounded-md hover:bg-white hover:text-[#8b3f1c] border border-[#8b3f1c] transition shrink-0">
//               SAVE CHANGES
//             </button>
//           </div>
//             </div>

//             {/* Right side: Profile picture */}
             
//           </form>

//           {/* Save Changes Button */}
         
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;



import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const UserProfile = () => {
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // ✅ LocalStorage se user ka data fetch karna
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const user = JSON.parse(savedUser);
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || ""
      }));
    }
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Profile Saved Successfully!");
  };


  return (
    <div className="container mx-auto px-4 py-25">
      <div className="mb-6 text-sm text-gray-500">
        Home &gt; My Account &gt; Profile
      </div>
      <div className="text-2xl font-bold text-[#8b3f1c]">Profile</div>

      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar />

        <main className="w-full md:w-3/4 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold text-[#8b3f1c] mb-6 lg:px-22 ">Account Settings</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
            
            {/* Profile Image Section */}
            <div className="flex-shrink-0 lg:w-1/3 flex flex-col items-center space-y-4">
              <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-6xl">
                👤
              </div>
              <label htmlFor="imageUpload" className="cursor-pointer bg-[#8b3f1c] text-white text-sm font-semibold py-2 px-6 rounded-md hover:bg-white hover:text-[#8b3f1c] border border-[#8b3f1c] transition">
                CHOOSE IMAGE
              </label>
              <input type="file" id="imageUpload" className="hidden" />
            </div>

            {/* Form Inputs */}
            <div className="flex-grow space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 flex">First Name <p className='text-red-600'>*</p></label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
              </div>

              <div>
                <label className=" text-sm font-medium text-gray-700 flex">Last Name <p className='text-red-600'>*</p></label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
              </div>

              <div>
                <label className="flex text-sm font-medium text-gray-700">Email <p className='text-red-600'>*</p></label>
                <input type="email" name="email" value={formData.email} readOnly
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>

              <div>
                <label className="flex text-sm font-medium text-gray-700">Phone <p className='text-red-600'>*</p></label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>

              <div className="mt-8 ">
                <button type="submit"
                  className="cursor-pointer bg-[#8b3f1c] text-white text-sm font-semibold py-2 px-6 rounded-md hover:bg-white hover:text-[#8b3f1c] border border-[#8b3f1c] transition shrink-0">
                  SAVE CHANGES
                </button>
              </div>

            </div>

          </form>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
