import express from "express";
import { getCategoryByProduct, getAllProducts } from "../controller/frontendController.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/category/products/:categoryId", getCategoryByProduct);

export default router;
