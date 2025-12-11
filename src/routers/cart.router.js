import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.get("/cart", cartController.showCart);
cartRouter.post("/cart/add", cartController.addToCart);
// Novas rotas:
cartRouter.post("/cart/update", cartController.updateCartItem);
cartRouter.post("/cart/remove", cartController.removeCartItem);

export default cartRouter;