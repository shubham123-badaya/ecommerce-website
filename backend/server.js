import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

// --- Routes ---
import adminRoutes from "./routes/adminAuth.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import sliderRoutes from "./routes/sliderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import frontendRoutes from "./routes/frontendRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import aboutUsRoutes from "./routes/aboutUsRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

// --- Config ---
dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // ✅ app should be defined before using it
app.use(express.json());
app.use(cors());

// --- Static Files ---
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Routes ---
// Frontend
app.use("/api/frontend", frontendRoutes);

// Admin
app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/slider", sliderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/about", aboutUsRoutes);
app.use("/api/setting", settingRoutes);
app.use("/api/blog", blogRoutes);


// User
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/review", reviewRoutes);


// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error("--- UNHANDLED ERROR ---", err);
  res.status(500).json({
    message: "An unexpected error occurred on the server.",
    error: err.message,
  });
});

// --- Server Start ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
