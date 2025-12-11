import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter
    .post("/register/:role", userController.registerUser)
    .post("/auth", userController.authUser);

export default userRouter;
