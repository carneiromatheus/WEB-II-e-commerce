import { stockRepository } from "../repositories/stock.repository.js";
import { productRepository } from "../repositories/product.repository.js";

async function showStockPage(req, res) {
    const { id } = req.params; // ID do produto

    try {
        const product = await productRepository.getDBProductById(id);
        
        // Segurança: Garante que o vendedor só mexe no estoque DO PRÓPRIO produto
        if (product.seller_id !== req.session.user.id) {
            return res.render("error", { message: "Você não tem permissão para gerenciar este produto." });
        }

        const currentStock = await stockRepository.getStockBalance(id);
        const history = await stockRepository.getMovementsHistory(id);

        res.render("stock-management", { 
            product, 
            currentStock, 
            history, 
            user: req.session.user 
        });

    } catch (error) {
        console.error(error);
        res.render("error", { message: "Erro ao carregar estoque." });
    }
}

async function addStockMovement(req, res) {
    const { productId, type, quantity } = req.body;
    
    // type vem do formulário: "entry" (entrada) ou "exit" (saída)
    let finalQuantity = parseInt(quantity);
    
    if (type === "exit") {
        finalQuantity = finalQuantity * -1; // Transforma em negativo
    }

    try {
        await stockRepository.addMovement(productId, finalQuantity);
        
        // Recarrega a página para mostrar o novo saldo
        res.redirect(`/seller/stock/${productId}`);
        
    } catch (error) {
        res.render("error", { message: "Erro ao atualizar estoque." });
    }
}

export const stockController = {
    showStockPage,
    addStockMovement
};