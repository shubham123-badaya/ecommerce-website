import React from "react";

function PrivacyPolicy() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header with Icon */}
      <div
        className="w-full h-60 flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://www.dryfruitbasket.in/themes/storefront/public/images/privacy-policy-header.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto p-6 text-sm text-gray-800">
        <div>Home &gt; Privacy Policy</div>
        <h1 className="text-2xl font-bold text-[#92553d] mt-2">
          Privacy Policy
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6 space-y-8 text-gray-700 leading-relaxed">
        {/* Intro */}
        <p>
          Your privacy is important to Dryfruit Basket. We want to provide a
          comfortable and secure shopping experience. This privacy policy
          explains the type of information we collect, how it’s protected, and
          how you can control or change this information.
        </p>

        {/* Section 1 */}
        <div className="bg-[#fdfdf6] p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold text-[#92553d] mb-2">
            What Personal Information is Collected and How?
          </h2>
          <p>
            While you can browse without registering, certain activities such as
            placing an order require registration. We collect your name,
            address, email, telephone, and other details needed for order
            processing and delivery.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-[#fdfdf6] p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold text-[#92553d] mb-2">
            What Cookies Are Collected?
          </h2>
          <p>
            Dryfruit Basket uses cookies to recognize returning users and
            personalize shopping features. Cookies may store login info,
            preferences, and session data. You can disable cookies, but some
            features may not work properly.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>Information about browsing behavior and purchases.</li>
            <li>
              Details such as name, email, or credit card expiration date.
            </li>
            <li>
              Information used to resolve disputes, provide customer support,
              and improve our services.
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="bg-[#fdfdf6] p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold text-[#92553d] mb-2">
            How Does Dryfruit Basket Use My Information?
          </h2>
          <p>
            We use your information to deliver services, process orders, and
            improve your shopping experience. This may include targeted offers,
            analyzing trends, or customer support.
          </p>
        </div>

        {/* Section 4 */}
        <div className="bg-[#fdfdf6] p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold text-[#92553d] mb-2">
            How May I Change or Remove My Personal Information?
          </h2>
          <p>
            You may review and update your personal information anytime by
            logging into your account or contacting customer support. We will
            promptly update or remove information as requested.
          </p>
        </div>

        {/* Section 5 */}
        <div className="bg-[#fdfdf6] p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold text-[#92553d] mb-2">
            Privacy with Links to Other Sites
          </h2>
          <p>
            Our site may contain links to other websites. We are not responsible
            for the privacy practices or content of those linked websites.
            Please review their policies separately.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
