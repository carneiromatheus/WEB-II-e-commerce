import { Router } from "express";
import { productController } from "../controllers/product.controller.js";

const productRouter = Router();

// A rota raiz exibe a lista de produtos (Home)
productRouter.get("/", productController.listProducts);

// Rota de detalhes
productRouter.get("/product/:id", productController.findProduct);

export default productRouter;