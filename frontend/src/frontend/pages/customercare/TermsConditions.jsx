import axios from "axios";
import React, { useEffect, useState } from "react";
import {API_URL} from "../../../admin/config"


function TermsConditions() {
  const [terms, setTerms] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await axios.get(`${API_URL}/setting`);
        setTerms(res.data.setting?.termsCondition || "No terms available.");
      } catch (err) {
        console.error("Error fetching terms:", err);
        setTerms("Error loading Terms & Conditions.");
      } finally {
        setLoading(false);
      }
    };
    fetchTerms();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  }
  return (
    <div className="w-full min-h-screen">
      {/* Header Section */}
      <div
        className="w-full h-60 flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://www.dryfruitbasket.in/themes/storefront/public/images/terms-condition-header.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto p-6 text-sm text-gray-800">
        <div>Home &gt; Terms Conditions</div>
        <div className="text-2xl font-bold text-[#92553d] mt-2">
          Terms Conditions
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto p-6 space-y-8 text-gray-700 leading-relaxed">
        {/* Section 1 */}
        <div className="bg-[#fdfdf6] p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold text-[#92553d] mb-2">
            Dryfruit Basket Customer Agreement
          </h2>

          {/* Dynamic Terms Content */}
          <div className="max-w-6xl mx-auto p-6 bg-[#fdfdf6] rounded-md shadow-sm text-gray-700 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: terms }} />
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-[#fdfdf6] p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold text-[#92553d] mb-2">
            Dryfruit Basket Service
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Pricing: All prices displayed on Dryfruit Basket will be valid
              unless otherwise specified.
            </li>
            <li>
              Cancellation Policy: You may cancel your order if it has not been
              processed yet.
            </li>
            <li>
              Returns & Refunds: If you receive a defective product, you can
              request a replacement or refund.
            </li>
            <li>
              Product Quality: We ensure every product is packed fresh and
              delivered within 1–5 days.
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="bg-[#fdfdf6] p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold text-[#92553d] mb-2">
            Property Rights
          </h2>
          <p>
            All content on Dryfruit Basket (design, text, graphics, logos,
            icons, images, audio clips, downloads, data compilations, and
            software) is the property of Dryfruit Basket. Unauthorized use or
            reproduction is strictly prohibited.
          </p>
        </div>

        {/* Section 4 */}
        <div className="bg-[#fdfdf6] p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold text-[#92553d] mb-2">
            Your Account
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and password. You agree to accept responsibility for all
            activities under your account.
          </p>
        </div>

        {/* Section 5 */}
        <div className="bg-[#fdfdf6] p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold text-[#92553d] mb-2">
            Reviews, Comments, and Communications
          </h2>
          <p>
            Visitors may post reviews, comments, and other content as long as it
            is not illegal, obscene, threatening, defamatory, invasive of
            privacy, infringing of intellectual property rights, or otherwise
            injurious. Dryfruit Basket reserves the right to remove or edit such
            content.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsConditions;
