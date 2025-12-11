import { productService } from "../services/product.service.js";

async function listProducts(req, res) {
    try {
        // Busca os produtos do banco (se tiver filtros, passa aqui)
        const products = await productService.getAllProducts({}); 

        // Renderiza a view 'home.hbs' passando os produtos e a sessão do usuário
        res.render("home", { 
            products: products,
            user: req.session.user // Para mostrar "Olá, João" na tela
        });
    } catch (error) {
        console.error(error);
        res.render("error", { message: "Erro ao carregar produtos" });
    }
}

async function findProduct(req, res) {
    const { id } = req.params;
    try {
        const product = await productService.getProductById(id);
        res.render("product-detail", { product, user: req.session.user });
    } catch (error) {
        res.render("error", { message: "Produto não encontrado" });
    }
}

export const productController = {
    listProducts,
    findProduct
};
