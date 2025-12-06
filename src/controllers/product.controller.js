import { productService } from "../services/product.service.js";

async function findProductById(req, res) {
    const { id } = req.params;

    const product = await productService.getProductById(id);

    res.render("product", { product });
};

export const productController = {
    findProductById
};
