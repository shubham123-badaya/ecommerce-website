import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#fcf9f3] text-[#7a3e2e] text-sm">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-6   gap-8 border-b border-gray-200">
        {/* Categories */}
        <div>
          <h3 className="font-bold mb-2">CATEGORIES</h3>
          <ul className="space-y-1 text-black font-semibold ">
            <li>Dry Fruits</li>
            <li>Seeds</li>
            <li>Dates</li>
            <li>Nuts & Berries</li>
          </ul>
        </div>

        {/* My Account */}
        <div>
          <h3 className="font-bold mb-2">MY ACCOUNT</h3>
          <ul className="space-y-1 text-black font-semibold ">
            <li>My Account</li>
            <li>Order History</li>
            <li>Wish List</li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="font-bold mb-2">CUSTOMER CARE</h3>
          <ul className="space-y-1 text-black font-semibold  ">
            <li>FAQ</li>
            <li>Contact Us</li>
            <li>Terms Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="font-bold mb-2">ABOUT US</h3>
          <ul className="space-y-1 text-black font-semibold ">
            <li>Corporate Gifting</li>
            <li>Quality</li>
            <li>Blog</li>
            <li>Testimonials</li>
            <li>Benefits of Dry Fruits and Nuts</li>
          </ul>
        </div>

        {/* Newsletter & Contact */}
        <div>
          <h3 className="font-bold mb-2">SUBSCRIBE OUR NEWSLETTER</h3>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="px-2 py-1 border border-gray-300 rounded-l"
            />
            <button className="bg-black text-white px-2 py-1 rounded-r">
              SUBSCRIBE
            </button>
          </div>
          <div className="mt-4 space-y-1 text-black font-semibold    ">
            <p>📞 +91 8424 888 555</p>
            <p>📧 info@dryfruitsbasket.in</p>
          </div>
        </div>

        {/* Google Pay */}
        <div className="   flex flex-col  ml-7 justify-between items-center ">
          <div className="text-center md:text-left">
            <h1 className="text-center">Google Pay</h1>
            <img
              src=" https://www.dryfruitbasket.in/themes/storefront/public/images/google-pay.png?v=2.1.1"
              alt="Google Pay QR"
              className="w-23  mx-auto md:mx-0"
            />
          </div>
        </div>
      </div>

      {/* Description Text */}
      <div className="max-w- mx-auto px-20 py-10 text-sm  text-gray-900 bg-[#e7e7d5] font-medium leading-relaxed">
        <p>
          Buy Dry Fruits and Nuts online in India from DryFruit Basket. Order
          premium quality dry fruits like almonds, cashews, walnuts, apricots,
          raisins, pistachios, figs, dates, kesar, elaichi, mix dry fruits,
          healthy seeds & berries etc at lowest price in Mumbai & all over
          India.
          <br />
          <br />
          Looking for a special treat for your loved ones? Explore our dry fruit
          potlis, homemade dryfruit chocolates & dryfruit combo options. We also
          offer a wide variety of exotic nuts & berries like prunes, pine nuts,
          pecan nuts, macadamia nuts, hazelnuts, brazil nuts, fox nuts,
          cranberries, blueberries & black currents.
          <br />
          <br />
          Indulge in the rich flavors and nutritional benefits of our handpicked
          premium quality dryfruits, carefully sourced from the best regions
          around the world. From luscious almonds and cashews to succulent dates
          and apricots, our collection offers a variety of options to satisfy
          your cravings and elevate your snacking experience.
        </p>
      </div>

      {/* Bottom Strip */}

      <div className="bg-[#fffaf0] border-t border-gray-200 py-4 text-xs text-gray-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Text */}
          <p className="text-center md:text-left">
            © Copyright 2023 Dry Fruit Basket.in Pvt. Ltd. |
            <a href="#" className="text-[#7a3e2e] underline mx-1">
              Web design
            </a>{" "}
            by Image Online Pvt. Ltd. |
            <a href="#" className="text-[#7a3e2e] underline ml-1">
              Site Map
            </a>
          </p>

          {/* Payment Icons */}
          <div className="flex items-center justify-center space-x-3">
            <img
              src="https://www.dryfruitbasket.in/themes/storefront/public/images/cc-avenue.png"
              alt="CCAvenue"
              className="h-6"
            />
            <img
              src="https://www.dryfruitbasket.in/themes/storefront/public/images/paytm.png"
              alt="Paytm"
              className="h-6"
            />
            <img
              src="https://www.dryfruitbasket.in/themes/storefront/public/images/visa.png"
              alt="Visa"
              className="h-6"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
