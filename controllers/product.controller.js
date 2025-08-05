import axios from "axios";
import Price from "../models/price.model.js";
import { fetchProductById } from "../API/productService.js";

export const getProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const productRes = await fetchProductById(id);
    const product = productRes.data;
    // console.log("product", product);

    // Get pricing info from local DB
    const price = await Price.findOne({ productId: Number(id) });

    if (!price) {
      return res.status(404).json({ message: "Price not found" });
    }

    // Combine and send response
    res.json({
      id: product.id,
      title: product.title,
      current_price: {
        value: price.value,
        currency_code: price.currency_code,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching product" });
  }
};

export const updatePrice = async (req, res) => {
  const { id } = req.params;
  const { value, currency_code } = req.body;

  if (typeof value !== "number") {
    return res.status(400).json({ message: "Invalid price data" });
  }

  try {
    const updatedPrice = await Price.findOneAndUpdate(
      { productId: Number(id) },
      {
        value,
        currency_code: currency_code || "USD",
      },
      { new: true, upsert: true }
    );

    res.json({ message: "Price updated", updatedPrice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating price" });
  }
};
