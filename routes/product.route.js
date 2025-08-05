import express from "express";
import { getProductsById } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/:id", getProductsById);

export default router;
