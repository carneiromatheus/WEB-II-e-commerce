import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

const userRouter = Router();

// Rotas para mostrar as páginas (GET)
userRouter.get("/login", userController.showLoginPage);
userRouter.get("/register", userController.showRegisterPage);
userRouter.get("/logout", userController.logoutUser);

// Rotas para enviar os dados (POST)
// MUDANÇA IMPORTANTE: Removemos o "/:role" daqui
userRouter.post("/register", userController.registerUser); 
userRouter.post("/auth", userController.authUser);

export default userRouter;
