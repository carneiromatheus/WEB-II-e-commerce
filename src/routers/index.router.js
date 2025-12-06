import { Router } from "express";
import productRouter from "./product.router.js";

const routers = Router();

routers.use(productRouter);

export default routers;
