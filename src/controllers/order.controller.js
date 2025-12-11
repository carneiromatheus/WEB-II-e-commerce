import { orderRepository } from "../repositories/order.repository.js";

// Lista todos os pedidos do usuário logado
async function listMyOrders(req, res) {
    if (!req.session.user) return res.redirect("/login");

    const orders = await orderRepository.getOrdersByUserId(req.session.user.id);

    res.render("my-orders", { orders, user: req.session.user });
}

// Mostra detalhes de um pedido específico
async function getOrderDetails(req, res) {
    if (!req.session.user) return res.redirect("/login");

    const { id } = req.params;
    const order = await orderRepository.getOrderById(id);

    // Segurança básica: verifica se o pedido existe e se pertence ao usuário logado
    if (!order || order.user_id !== req.session.user.id) {
        return res.render("error", { message: "Pedido não encontrado ou acesso negado." });
    }

    res.render("order-details", { order, user: req.session.user });
}

export const orderController = {
    listMyOrders,
    getOrderDetails
};