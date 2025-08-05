import axios from "axios";
import Price from "../models/price.model.js";
import { fetchProductById } from "../API/productService.js";

export const getProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch product info from fakestoreapi
    const productRes = await fetchProductById(id);
    const product = productRes.data;
    console.log("product", product);

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
