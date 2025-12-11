import { Router } from "express";
import productRouter from "./product.router.js";
import userRouter from "./user.router.js";
import cartRouter from "./cart.router.js";
import checkoutRouter from "./checkout.router.js";
import sellerRouter from "./seller.router.js"; // 1. Importe aqui
import stockRouter from "./stock.router.js";
import categoryRouter from "./category.router.js";

const routers = Router();

routers
    .use(userRouter)
    .use(productRouter)
    .use(cartRouter)
    .use(checkoutRouter)
    .use(stockRouter)
    .use(categoryRouter)
    .use(sellerRouter); // 2. Use aqui

export default routers;