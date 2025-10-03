import express from "express";
import { getCategoryByProduct, getAllProducts,searchProducts , getSliders, getAllCategories, getProductsByType, getAboutUs, getLatestBlogs, getBlogById} from "../controller/frontendController.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/category/products/:categoryId", getCategoryByProduct);
router.get("/products/search", searchProducts);
router.get("/sliders", getSliders);
router.get("/categories", getAllCategories);
router.get("/products/by-type", getProductsByType);
router.get("/about", getAboutUs);
router.get("/blogs/latest", getLatestBlogs);
router.get("/blog/:id", getBlogById);

export default router;
