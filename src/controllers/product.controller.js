import { productService } from "../services/product.service.js";

async function findProductById(productId) {
    const product = await productService.getProductById(productId);
    return product;
};

async function findProduct(req, res) {

    try {
        const { id } = req.query;

        if (id) {
            const productId = parseInt(id, 10);
            const product = await findProductById(productId);

            // FIX: Ajustar retorno quando implementar outros critérios de busca. Retorno único.
            return res.status(200).send(product);
        };

        // TODO: Caso não tenha id, buscar por outros critérios (nome, categoria, etc);
        // TODO: Caso não tenha critérios, retornar todos os produtos (com paginação).
        // FIX: Remover retorno de erro quando implementar os outros critérios.

        res.status(400).send({ message: "Insufficient search parameters." });
    } catch (error) {
        res.status(500).send({ message: "Internal server error." });
    };
};

export const productController = {
    findProduct
};
