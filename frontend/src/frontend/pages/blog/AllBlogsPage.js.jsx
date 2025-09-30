import React from "react";

const blogs = [
  {
    id: 1,
    title: "Health benefits of Chia seeds",
    desc: "Chia seeds may be small, but they're loaded with nutrients that deliver big health benefits...",
    image:
      "https://www.dryfruitbasket.in/storage/media/post/202509022223_post_chia%20seeds%20picture.jpg",
  },
  {
    id: 2,
    title: "Everything you need to know about Macadamia nuts",
    desc: "Macadamia nuts, indigenous Australian nuts, offer the rich creaminess and health benefits...",
    image:
      "https://www.dryfruitbasket.in/storage/media/post/202508130132_post_1800ss_getty_rf_macadamia_nuts.webp",
  },
  {
    id: 3,
    title: "Health Benefits of Raisins",
    desc: "Raisins can boost your immunity, aid digestion, and are rich in antioxidants...",
    image:
      "https://www.dryfruitbasket.in/storage/media/post/202508021218_post_image%20raisins%20blog.jpg",
  },
  {
    id: 4,
    title: "Power of Almonds",
    desc: "When it comes to crunchy treats, almonds top the list—not just for their taste but also nutrition...",
    image:
      "https://www.dryfruitbasket.in/storage/media/post/202507101509_post_almonds.webp",
  },
  {
    id: 5,
    title: "Best Saffron Storage Tips to Preserve Flavour",
    desc: "Saffron is one of the most luxurious spices that can elevate any dish. Here’s how to store it properly...",
    image:
      "https://www.dryfruitbasket.in/storage/media/post/202402061242_post_Pre-Workout%20Snack_%20Best%20Nuts%20To%20Eat.jpg",
  },
  {
    id: 6,
    title: "Super-food Apricot For Your Weight Loss Regime",
    desc: "Apricot: Your daily fruit with superfood features — helps weight loss, fun, and added benefits...",
    image:
      "https://www.dryfruitbasket.in/storage/media/post/202401101958_post_benefits-of-age-old-tradition-of-having-dates-with-milk.jpg",
  },
  {
    id: 7,
    title: "Super-food Apricot For Your Weight Loss Regime",
    desc: "Apricot: Your daily fruit with superfood features — helps weight loss, fun, and added benefits...",
    image:
      "https://www.dryfruitbasket.in/storage/media/post/202402211257_post_health-benefits-of-anjeer.png",
  },
  {
    id: 8,
    title: "Super-food Apricot For Your Weight Loss Regime",
    desc: "Apricot: Your daily fruit with superfood features — helps weight loss, fun, and added benefits...",
    image:
      "https://www.dryfruitbasket.in/storage/media/post/202403281143_post_saffron-storage.jpg",
  },
];

const AllBlogsPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-35 lg:py-25 px-4  md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 space-y-8">
          {/* Search */}
          <div>
            <h3 className="text-lg font-semibold mb-2">SEARCH</h3>
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#70512e]"
            />
          </div>

          {/* Recent Post */}
          <div>
            <h3 className="text-lg font-semibold mb-2">RECENT POST</h3>
            <ul className="space-y-2 text-sm text-[#70512e]  font-medium">
              {blogs.slice(0, 3).map((post) => (
                <li key={post.id} className="flex border-b space-y-4 items-center gap-2 ">
                    <img src={post.image} alt="" className="w-20 h-auto" />
                  <a href="#">{post.title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Archive */}
          <div>
            <h3 className="text-lg font-semibold mb-2">ARCHIVE</h3>
            <ul className="text-sm space-y-1">
              <li>September 2025</li>
              <li>August 2025</li>
              <li>July 2025</li>
              <li>June 2024</li>
              <li>February 2024</li>
            </ul>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold mb-2">TAGS</h3>
            <span className="inline-block bg-[#70512e] text-white px-3 py-1 text-sm rounded">
              Blog Tag
            </span>
          </div>
        </aside>

        {/* Blog Grid */}
        <main className="md:col-span-3 space-y-10">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full  hover:scale-105 duration-700 h-48 object-cover rounded-md"
              />
              <div>
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-3">{blog.desc}</p>
                <a
                  href="#"
                  className="text-[#70512e] font-semibold hover:underline"
                >
                  READ MORE →
                </a>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default AllBlogsPage;
