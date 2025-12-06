import express from "express";
import productRouter from "./routers/product.router.js";

const app = express();

app
    .set("views", "src/views")
    .set("view engine", "hbs")
    .use(productRouter);

export default app;
