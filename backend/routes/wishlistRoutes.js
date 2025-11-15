import express from "express";
import { verifyUser } from "../middleware/auth.js";
import { addToWishlist, getWishlist, removeFromWishlist } from "../controller/wishlistController.js";

const router = express.Router();

// Protected routes
router.get("/",verifyUser, getWishlist);
router.post("/add", verifyUser, addToWishlist);
router.delete("/:productId", verifyUser, removeFromWishlist);

export default router;
