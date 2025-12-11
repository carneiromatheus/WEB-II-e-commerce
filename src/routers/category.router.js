import { Router } from "express";
import { categoryController } from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const categoryRouter = Router();

categoryRouter.use(authMiddleware.ensureSeller);

// Rota para ver e criar categorias
categoryRouter.get("/seller/categories", categoryController.showCategoriesPage);
categoryRouter.post("/seller/categories", categoryController.createCategory);

export default categoryRouter;