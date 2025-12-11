import { Router } from "express";
import { stockController } from "../controllers/stock.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const stockRouter = Router();

stockRouter.use(authMiddleware.ensureSeller);

// Rota para VER a página de estoque de um produto específico
stockRouter.get("/seller/stock/:id", stockController.showStockPage);

// Rota para ADICIONAR movimento (POST)
stockRouter.post("/seller/stock/add", stockController.addStockMovement);

export default stockRouter;