import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminAuth.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import sliderRoutes from "./routes/sliderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

// User Route
import userRoutes from "./routes/userRoutes.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Admin Routes ---
app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/slider", sliderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/coupons", couponRoutes);

// --- User Routes ---
app.use("/api/user", userRoutes);



// --- Global Error Handler ---
const errorHandler = (err, req, res, next) => {
  console.error("--- UNHANDLED ERROR ---", err);
  res.status(500).json({
    message: "An unexpected error occurred on the server.",
    error: err.message,
  });
};
app.use(errorHandler);

// --- Server Start ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
