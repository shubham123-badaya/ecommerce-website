import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, required: true },
  mrp: { type: Number },
  stock: { type: Number, default: 0 },
  description: String,
  images: [String],
  variants: [
    {
      name: String,
      price: Number,
      mrp: Number 
    }
  ],
  is_featured: { type: Number, enum: [0, 1], default: 0 }, 
  isBestSelling: { type: Number, enum: [0,1], default: 0 },
  isNewArrival: { type: Number, enum: [0,1], default: 0 },
  isTopRated: { type: Number, enum: [0,1], default: 0 },

  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
