import { Router } from "express";
import { productController } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter
    .get("/product/:id", productController.findProductById);

export default productRouter;
