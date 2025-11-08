// src/components/WhatsAppButton.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "7375833508"; // <-- replace with your WhatsApp number (with country code, no +)

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className="fixed right-1 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-all duration-300 z-50"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </div>
  );
}
