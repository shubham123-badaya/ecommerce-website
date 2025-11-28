import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../../admin/config";
import { useDispatch, useSelector } from "react-redux";
import { fetchSetting } from "../../redux/settingSlice";
function Contact() {
  const dispatch = useDispatch();
  const { setting, loading } = useSelector((state) => state.setting);

  useEffect(() => {
    dispatch(fetchSetting());
  }, [dispatch]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/contact/create`, formData);
      console.log(res.data);

      if (res.data.success) {
        toast.success("Message Sent Successfully 🎉");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      toast.error("Something went wrong ❌");
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen">
      {/* Header Section */}
      <div
        className="w-full h-60 flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://www.dryfruitbasket.in/themes/storefront/public/images/contact-us-header.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto p-6 text-sm text-gray-800">
        <div>Home &gt; Contact Us</div>
        <div className="text-2xl font-bold text-[#92553d] mt-2">
          Get in Touch
        </div>
      </div>

      {/* Contact Form */}
      <div
        className="py-10"
        style={{
          backgroundImage:
            "url('https://www.dryfruitbasket.in/themes/storefront/public/images/contact-us-responsive-img.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-8">
          <div className="shadow-xl rounded-lg p-6 flex-1 bg-white/90">
            <h2 className="text-xl font-semibold mb-4 text-[#92553d]">
              Send us a Message
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full border px-3 py-2 rounded-md"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full border px-3 py-2 rounded-md"
              />

              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                className="w-full border px-3 py-2 rounded-md"
              />

              <button
                type="submit"
                className="bg-[#92553d] text-white px-6 py-2 rounded-md hover:bg-[#7a4532] transition"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="shadow-xl rounded-lg p-6 flex-1 bg-white/90">
            <h2 className="text-xl font-semibold mb-4 text-[#92553d]">
              Contact Information
            </h2>

            {setting ? (
              <>
                <p className="mb-2">📍 Address: Jaipur, Rajasthan, India</p>
                <p className="mb-2">📞 Phone: +91 {setting.contactno}</p>
                <p className="mb-2">✉️ Email: {setting.email}</p>
              </>
            ) : (
              <span className="font-bold">Loading...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
