import { Router } from "express";
import { productController } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter
    .get("/api/product", productController.findProduct);

export default productRouter;
