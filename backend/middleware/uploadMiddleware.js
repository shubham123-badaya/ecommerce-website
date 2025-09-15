import multer from "multer";
import path from "path";
import fs from "fs";

// --- Helper function to ensure directory exists ---
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// --- Storage config for category ---
const categoryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/category/";
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// --- Storage config for product ---
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/product/";
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// --- Storage config for slider ---
const sliderStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/slider/";
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter (only allow images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Multer instances
export const uploadCategory = multer({ storage: categoryStorage, fileFilter }).single("image");
export const uploadProduct = multer({ storage: productStorage, fileFilter }).single("image");
export const uploadSlider = multer({ storage: sliderStorage, fileFilter }).single("image");


// ✅ Default export (optional)
export default {
  uploadCategory,
  uploadProduct,
  uploadSlider,
};
