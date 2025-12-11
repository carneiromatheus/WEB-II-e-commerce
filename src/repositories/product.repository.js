import { db } from "../config/db.connection.js";

async function getDBProductById(productId) {
    const queryResult = await db.query(
        `SELECT * FROM products WHERE id = $1 AND is_active = true`, 
        [productId]
    );
    return queryResult.rows[0];
};

async function getDBProducts({ search, sort }) {
    let query = `SELECT * FROM products WHERE is_active = true`; 
    let params = [];
    let count = 1;

    if (search) {
        query += ` AND (name ILIKE $${count} OR description ILIKE $${count})`;
        params.push(`%${search}%`);
        count++;
    }

    if (sort === 'price_asc') {
        query += ` ORDER BY price ASC`;
    } else if (sort === 'price_desc') {
        query += ` ORDER BY price DESC`;
    } else {
        query += ` ORDER BY id DESC`;
    }

    const queryResult = await db.query(query, params);
    return queryResult.rows;
};

export const productRepository = {
    getDBProductById,
    getDBProducts
};