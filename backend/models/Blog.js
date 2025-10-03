import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);
