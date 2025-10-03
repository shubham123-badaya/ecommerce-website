import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1, min: 1 },
      price: { type: Number, required: true }, 
      total: { type: Number, required: true } 
    }
  ],
  totalPrice: { type: Number, default: 0 }, 
  createdAt: { type: Date, default: Date.now },
});

// Optional: pre-save hook to calculate totalPrice automatically
cartSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce((acc, item) => acc + item.total, 0);
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;