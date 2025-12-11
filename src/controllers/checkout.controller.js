import { orderRepository } from "../repositories/order.repository.js";

async function checkout(req, res) {
    // Verifica se o usuário está logado
    if (!req.session.user) {
        return res.redirect("/login");
    }

    const cart = req.session.cart || [];

    // Se carrinho vazio, manda de volta pra home
    if (cart.length === 0) {
        return res.redirect("/");
    }

    try {
        // Calcula o total (em centavos ou reais, dependendo do seu banco)
        // Como seu banco é int4, assumo que você está salvando o valor direto
        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const userId = req.session.user.id;

        // Salva no banco
        const orderId = await orderRepository.createOrder(userId, total, cart);

        // Limpa o carrinho da sessão
        req.session.cart = [];

        // Renderiza página de sucesso
        res.render("checkout-success", { orderId });

    } catch (error) {
        console.error("Erro no checkout:", error);
        res.render("error", { message: "Erro ao processar seu pedido. Tente novamente." });
    }
}

export const checkoutController = {
    checkout
};