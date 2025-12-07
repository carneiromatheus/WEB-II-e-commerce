import { productRepository } from "../repositories/product.repository.js";

async function getProductById(id) {
    const productId = parseInt(id, 10);
    const product = await productRepository.getDBProductById(productId);
    return product;
};

export const productService = {
    getProductById,
};
