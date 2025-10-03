import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String},
    is_featured: { 
      type: Number, 
      enum: [0, 1], 
      default: 0 
    } 
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
