import { db } from "../config/db.connection.js";

async function addMovement(productId, quantity) {
    // CORREÇÃO: Usando 'produto_id' conforme seu diagrama
    await db.query(
        `INSERT INTO stock_movements (movement_date, produto_id, quantity)
         VALUES (NOW(), $1, $2)`,
        [productId, quantity]
    );
}

async function getStockBalance(productId) {
    // CORREÇÃO: Usando 'produto_id' aqui também
    const result = await db.query(
        `SELECT COALESCE(SUM(quantity), 0) as total 
         FROM stock_movements 
         WHERE produto_id = $1`,
        [productId]
    );
    return parseInt(result.rows[0].total);
}

async function getMovementsHistory(productId) {
    // CORREÇÃO: Usando 'produto_id'
    const result = await db.query(
        `SELECT * FROM stock_movements 
         WHERE produto_id = $1 
         ORDER BY movement_date DESC`,
        [productId]
    );
    return result.rows;
}

export const stockRepository = {
    addMovement,
    getStockBalance,
    getMovementsHistory
};