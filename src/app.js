import express from "express";
import routers from "./routers/index.router";

const app = express();

app
    .set("views", "src/views")
    .set("view engine", "hbs")
    .use(json())
    .use(routers);

export default app;
