import { userRepository } from "../repositories/user.repository.js";

async function createUser(email, name, isSeller, password) {
    // Certifique-se de que a ordem aqui bate com a do repository
    return await userRepository.insert(email, name, isSeller, password);
}

async function getUserByEmail(email) {
    return await userRepository.getByEmail(email);
}

export const userService = {
    createUser,
    getUserByEmail
};
