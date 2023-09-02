import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

export default mongoose.model('CartItem', cartItemSchema);

