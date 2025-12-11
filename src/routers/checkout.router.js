import { Router } from "express";
import { checkoutController } from "../controllers/checkout.controller.js";

const checkoutRouter = Router();

// Rota POST que o formulário do carrinho chama
checkoutRouter.post("/checkout", checkoutController.checkout);

export default checkoutRouter;