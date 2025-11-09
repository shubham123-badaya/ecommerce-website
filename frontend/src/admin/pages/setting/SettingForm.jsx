import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, IMG_URL } from "../../config";

function SettingForm() {
  const [form, setForm] = useState({
    facebook: "",
    instagram: "",
    contactno: "",
    email: "",
    web: "",
    termsCondition: "",
    privacyPolicy: "",
  });

  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch existing setting
  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const token = localStorage.getItem("token"); // if route is protected
        const res = await axios.get(`${API_URL}/setting`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.setting;
        if (data) {
          setForm({
            facebook: data.facebook || "",
            instagram: data.instagram || "",
            contactno: data.contactno || "",
            email: data.email || "",
            web: data.web || "",
            termsCondition: data.termsCondition || "",
            privacyPolicy: data.privacyPolicy || "",
          });
          if (data.logo) {
            setPreview(`${IMG_URL}/logo/${data.logo}`);
          }
        }
      } catch (err) {
        console.error("Error fetching setting:", err);
      }
    };
    fetchSetting();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle logo upload
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // if route requires auth
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (logo) formData.append("logo", logo);

      const res = await axios.post(
        `${API_URL}/setting/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message);
    } catch (err) {
      console.error("Error saving setting:", err);
      setMessage("Failed to save setting");
    }
  };

  return (
    <div className=" max-w-7xl flex items-center justify-center  p-4">
      <div className=" w-full rounded-2xl  p-4">
        <h1 className="text-2xl font-bold  mb-6">Website Settings</h1>

        {message && (
          <p className="text-center text-green-600 font-medium mb-4">
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className=" mt-10 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Facebook */}
          <div>
            <label className="block font-medium mb-1">Facebook</label>
            <input
              type="text"
              name="facebook"
              value={form.facebook}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter Facebook link"
            />
          </div>

          {/* Instagram */}
          <div>
            <label className="block font-medium mb-1">Instagram</label>
            <input
              type="text"
              name="instagram"
              value={form.instagram}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter Instagram link"
            />
          </div>

          {/* Contact No */}
          <div>
            <label className="block font-medium mb-1">Contact No</label>
            <input
              type="text"
              name="contactno"
              value={form.contactno}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter Contact Number"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter Email"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block font-medium mb-1">Website</label>
            <input
              type="text"
              name="web"
              value={form.web}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter Website URL"
            />
          </div>

          {/* Logo */}
          <div>
            <label className="block font-medium mb-1">Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="w-full border rounded-lg p-2"
            />
            {preview && (
              <img
                src={preview}
                alt="Logo Preview"
                className="mt-2 h-24 w-24 object-contain border rounded-lg"
              />
            )}
          </div>

          {/* Terms & Condition */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Terms & Conditions</label>
            <textarea
              name="termsCondition"
              value={form.termsCondition}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 h-24 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter Terms and Conditions"
            ></textarea>
          </div>

          {/* Privacy Policy */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Privacy Policy</label>
            <textarea
              name="privacyPolicy"
              value={form.privacyPolicy}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 h-24 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter Privacy Policy"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingForm;
