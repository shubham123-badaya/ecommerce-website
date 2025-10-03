// reviewRoutes.js
import express from "express";
import { createReview, getReviewsByProduct } from "../controller/reviewController.js";
import { verifyUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", verifyUser, createReview);

router.get("/product/:productId", getReviewsByProduct);

export default router;
