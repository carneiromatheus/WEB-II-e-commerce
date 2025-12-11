import { Router } from "express";
import { orderController } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.get("/my-orders", orderController.listMyOrders);
orderRouter.get("/my-orders/:id", orderController.getOrderDetails);

export default orderRouter;