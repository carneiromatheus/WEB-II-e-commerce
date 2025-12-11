import { productRepository } from "../repositories/product.repository.js";

async function getProductById(id) {
    const productId = parseInt(id, 10);
    const product = await productRepository.getDBProductById(productId);
    return product;
};

// --- NOVA FUNÇÃO ---
async function getAllProducts(filters) {
    // Repassa os filtros (busca, categoria, ordenação) para o repositório
    // Se não tiver filtros, passa um objeto vazio
    return await productRepository.getDBProducts(filters || {});
};

export const productService = {
    getProductById,
    getAllProducts // <--- Não esqueça de exportar aqui
};