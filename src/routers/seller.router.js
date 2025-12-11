import { Router } from "express";
import { sellerController } from "../controllers/seller.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const sellerRouter = Router();

// --- PROTEÇÃO GLOBAL ---
// Qualquer rota definida abaixo passará pelo ensureSeller
sellerRouter.use(authMiddleware.ensureSeller);

// Rota do Painel Principal
sellerRouter.get("/seller/dashboard", sellerController.showDashboard);

// Rotas de Criar Produto (Mostrar form e Receber dados)
sellerRouter.get("/seller/new", sellerController.showCreateProductPage);
sellerRouter.post("/seller/new", sellerController.createProduct);

export default sellerRouter;