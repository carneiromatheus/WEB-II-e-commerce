import { db } from "../config/db.connection.js";

async function insert(email, name, isSeller, password) {
    const queryResult = await db.query(
        `INSERT INTO users (email, name, is_seller, password_hash)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [email, name, isSeller, password]
    );

    return queryResult.rows[0];
};

async function getByEmail(email) {
    const queryResult = await db.query(
        `SELECT *
        FROM users
        WHERE email = $1`,
        [email]
    );

    return queryResult.rows[0] ?? null;
};

export const userRepository = {
    insert,
    getByEmail
};
