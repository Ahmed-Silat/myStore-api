import express from "express";
import { getProductsById, updatePrice } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/:id", getProductsById);
router.put("/:id", updatePrice);

export default router;
