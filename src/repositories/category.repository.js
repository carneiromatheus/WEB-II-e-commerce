import { db } from "../config/db.connection.js";

async function createCategory(name, parentId) {
    // Se parentId for vazio ou "null" string, transformamos em null real
    const parent = (parentId && parentId !== "") ? parentId : null;

    const result = await db.query(
        `INSERT INTO categories (name, parent_id)
         VALUES ($1, $2)
         RETURNING *`,
        [name, parent]
    );
    return result.rows[0];
}

async function getAllCategories() {
    // Busca categorias e traz o nome do pai (Auto-Join)
    const result = await db.query(
        `SELECT c.*, p.name as parent_name 
         FROM categories c
         LEFT JOIN categories p ON c.parent_id = p.id
         ORDER BY c.name ASC`
    );
    return result.rows;
}

export const categoryRepository = {
    createCategory,
    getAllCategories
};