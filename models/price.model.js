import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  value: { type: Number, required: true },
  currency_code: { type: String, required: true },
});

const Price = mongoose.model("Price", priceSchema);

export default Price;
