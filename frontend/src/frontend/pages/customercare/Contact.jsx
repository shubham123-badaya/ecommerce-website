import React from "react";

function Contact() {
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
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
          Contact Us
        </h1>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto p-6 text-sm text-gray-800">
        <div>Home &gt; Contact Us</div>
        <div className="text-2xl font-bold text-[#92553d] mt-2">
          Get in Touch
        </div>
      </div>

      {/* Contact Form + Info Section */}
      <div className=""
        style={{
          backgroundImage:
            "url('https://www.dryfruitbasket.in/themes/storefront/public/images/contact-us-responsive-img.jpg')",
          backgroundSize: "cover",
          backgroundPositionx: "30px",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-3xl mx-auto px-6 py-10  gap-8">
          {/* Contact Form */}
          <div className=" shadow-xl rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#92553d]">
              Send us a Message
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-[#92553d]/40"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-[#92553d]/40"
              />
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-[#92553d]/40"
              ></textarea>
              <button
                type="submit"
                className="bg-[#92553d] text-white px-6 py-2 rounded-md hover:bg-[#7a4532] transition"
              >
                Submit
              </button>
            </form>
            <div className=" shadow-xl rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#92553d]">
                Contact Information
              </h2>
              <p className="mb-2">📍 Address: Jaipur, Rajasthan, India</p>
              <p className="mb-2">📞 Phone: +91 9876543210</p>
              <p className="mb-2">✉️ Email: shopecommerce.in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
