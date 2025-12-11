import { db } from "../config/db.connection.js";

async function createOrder(userId, total, cartItems) {
    const client = await db.connect(); // Pega um cliente para iniciar transação

    try {
        await client.query('BEGIN'); // Inicia a transação

        // 1. Cria o Pedido na tabela 'orders'
        const orderResult = await client.query(
            `INSERT INTO orders (user_id, total, order_date) 
             VALUES ($1, $2, NOW()) 
             RETURNING id`,
            [userId, total]
        );
        const orderId = orderResult.rows[0].id;

        // 2. Insere os itens na tabela 'order_items'
        for (const item of cartItems) {
            await client.query(
                `INSERT INTO order_items (order_id, product_id, price, quantity) 
                 VALUES ($1, $2, $3, $4)`,
                [orderId, item.id, item.price, item.quantity]
            );
        }

        await client.query('COMMIT'); // Confirma tudo
        return orderId;

    } catch (error) {
        await client.query('ROLLBACK'); // Se der erro, desfaz tudo
        throw error;
    } finally {
        client.release(); // Libera a conexão
    }
}

async function getOrdersByUserId(userId) {
    const queryResult = await db.query(
        `SELECT * FROM orders WHERE user_id = $1 ORDER BY order_date DESC`,
        [userId]
    );
    return queryResult.rows;
}

async function getOrderById(orderId) {
    // 1. Busca dados do pedido
    const orderResult = await db.query(
        `SELECT * FROM orders WHERE id = $1`, 
        [orderId]
    );
    const order = orderResult.rows[0];

    if (!order) return null;

    // 2. Busca os itens desse pedido (fazendo JOIN com produtos para pegar o nome e foto)
    const itemsResult = await db.query(
        `SELECT 
            oi.*, 
            p.name as product_name, 
            p.photo_url 
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = $1`,
        [orderId]
    );

    order.items = itemsResult.rows; // Anexa os itens ao objeto do pedido
    return order;
}

// Não esqueça de exportar as novas funções
export const orderRepository = {
    createOrder,
    getOrdersByUserId,
    getOrderById
};
