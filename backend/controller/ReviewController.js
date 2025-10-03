import Review from "../models/Review.js";
import User from "../models/User.js";

export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user._id; 

    if (!productId || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const review = new Review({
      product: productId,
      user: userId,
      rating,
      comment
    });

    await review.save();

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: reviews.length,
      reviews
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
