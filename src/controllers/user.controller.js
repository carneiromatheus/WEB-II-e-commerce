import bcrypt from "bcrypt";
import { userService } from "../services/user.service.js";

async function registerUser(req, res) {
    const { role } = req.params;
    const { email, name, password } = req.body;

    try {
        if (!email || !name || !role || !password) {
            return res.status(400).send({ error: "Missing required fields." });
        };

        const existUser = await userService.getUserByEmail(email);
        if (existUser) {
            return res.status(409).send({ error: "User already exists." });
        };

        const passwordHash = bcrypt.hashSync(password, 10);
        delete req.body.password;

        const isSeller = role === "seller" ? true : false;

        const user = await userService.createUser(email, name, isSeller, passwordHash);
        res.status(201).send({
            object: user,
            message: "User registered successfully."
        });
    } catch (error) {
        res.status(500).send({
            error,
            message: "Failed to register user."
        });
    };
};

async function authUser(req, res) {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).send({ error: "Missing required fields." });
        };

        const existUser = await userService.getUserByEmail(email);
        if (!existUser) {
            return res.status(404).send({ error: "User not found." });
        };

        const passwordMatch = bcrypt.compareSync(password, existUser.password);
        delete req.body.password;

        if (!passwordMatch) {
            return res.status(401).send({ error: "Invalid credentials." });
        };

        res.status(200).send({
            object: existUser,
            message: "User authenticated successfully."
        });
    } catch (error) {
        res.status(500).send({
            error,
            message: "Failed to authenticate user."
        });
    };
};
export const userController = {
    registerUser,
    authUser
};
