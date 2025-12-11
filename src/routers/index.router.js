import { Router } from "express";
import productRouter from "./product.router.js";
import userRouter from "./user.router.js";

const routers = Router();

routers
    .use(productRouter)
    .use(userRouter);

export default routers;
