import express from "express";
import { verifyUser } from "../middleware/auth.js";
import { addToCart, getCart, removeFromCart } from "../controller/cartController.js";

const router = express.Router();

router.post("/add", verifyUser, addToCart);
router.get("/", verifyUser, getCart);
router.delete("/:productId", verifyUser, removeFromCart);

export default router;
