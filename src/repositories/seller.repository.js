import { db } from "../config/db.connection.js";

async function createProduct(productData) {
    const { name, description, price, photo_url, seller_id } = productData;

    // Insere o produto
    const result = await db.query(
        `INSERT INTO products (name, description, price, photo_url, seller_id, is_active)
         VALUES ($1, $2, $3, $4, $5, true)
         RETURNING id`,
        [name, description, price, photo_url, seller_id]
    );

    return result.rows[0];
}

async function associateCategories(productId, categoryIds) {
    if (!categoryIds) return;

    // Se o usuário selecionou só 1 checkbox, vem como string. Se mais de 1, vem array.
    // Isso garante que sempre trabalharemos com array.
    const ids = Array.isArray(categoryIds) ? categoryIds : [categoryIds];

    for (const catId of ids) {
        await db.query(
            `INSERT INTO product_categories (product_id, category_id) 
             VALUES ($1, $2)`,
            [productId, catId]
        );
    }
}

async function getProductsBySellerId(sellerId) {
    // Busca apenas os produtos deste vendedor
    const result = await db.query(
        `SELECT * FROM products WHERE seller_id = $1 ORDER BY id DESC`,
        [sellerId]
    );
    return result.rows;
}

export const sellerRepository = {
    createProduct,
    associateCategories, // <--- Não esqueça de exportar a nova função
    getProductsBySellerId
};