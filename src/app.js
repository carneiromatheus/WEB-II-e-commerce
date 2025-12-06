import express, { json } from "express";
import routers from "./routers/index.router.js";

const app = express();

app
    .set("views", "src/views")
    .set("view engine", "hbs")
    .use(json())
    .use(routers);

export default app;
