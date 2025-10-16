import multer from "multer";
import path from "path";
import fs from "fs";

// --- Helper function to ensure directory exists ---
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// --- Storage configs ---

// Category
const categoryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/category/";
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

// Product
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/product/";
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

// Slider
const sliderStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/slider/";
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

// About Us
const aboutUsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/about/";
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

// Logo
const logoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/logo/";
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

// Blog
const blogStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/blog/";
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

// --- File filter ---
const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// --- Multer instances ---
export const uploadCategory = multer({ storage: categoryStorage, fileFilter }).single("image");
export const uploadProduct = multer({ storage: productStorage, fileFilter }).single("image");
export const uploadSlider = multer({ storage: sliderStorage, fileFilter }).single("image");
export const uploadAboutUs = multer({ storage: aboutUsStorage, fileFilter }).single("image");
export const uploadLogo = multer({ storage: logoStorage, fileFilter }).single("logo");

export const uploadBlog = multer({ storage: blogStorage, fileFilter }).single("image");

export default {
  uploadCategory,
  uploadProduct,
  uploadSlider,
  uploadAboutUs,
  uploadLogo,
  uploadBlog,
};
