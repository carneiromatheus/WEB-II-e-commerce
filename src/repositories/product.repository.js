import { db } from "../config/db.connection.js";

async function getDBProductById(productId) {
    const queryResult = await db.query(
        `SELECT *
        FROM products
        WHERE id = $1`,
        [productId]
    );

    return queryResult.rows[0] ?? {};
};

export const productRepository = {
    getDBProductById
};
