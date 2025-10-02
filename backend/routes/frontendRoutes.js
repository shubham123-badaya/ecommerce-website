import express from "express";
import { getCategoryByProduct, getAllProducts,searchProducts , getSliders} from "../controller/frontendController.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/category/products/:categoryId", getCategoryByProduct);
router.get("/products/search", searchProducts);
router.get("/sliders", getSliders);
export default router;
