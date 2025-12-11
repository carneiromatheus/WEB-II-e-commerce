import { sellerRepository } from "../repositories/seller.repository.js";
import { categoryRepository } from "../repositories/category.repository.js";

// Mostra o Dashboard (Lista de Produtos)
async function showDashboard(req, res) {
    const sellerId = req.session.user.id;
    const products = await sellerRepository.getProductsBySellerId(sellerId);
    
    res.render("seller-dashboard", { products, user: req.session.user });
}

// Mostra o formulário de cadastro
async function showCreateProductPage(req, res) {
    try {
        const categories = await categoryRepository.getAllCategories();
        res.render("product-form", { 
            user: req.session.user,
            categories: categories 
        });
    } catch (error) {
        res.render("error", { message: "Erro ao carregar formulário." });
    }
}

// --- ATUALIZADO: Agora salva as categorias ---
async function createProduct(req, res) {
    // Pegamos 'categories' do formulário (são os checkboxes)
    const { name, description, price, photo_url, categories } = req.body;
    const sellerId = req.session.user.id;

    try {
        // 1. Cria o produto
        const newProduct = await sellerRepository.createProduct({
            name,
            description,
            price: parseFloat(price),
            photo_url,
            seller_id: sellerId
        });

        // 2. Se houver categorias selecionadas, vincula elas
        if (categories) {
            await sellerRepository.associateCategories(newProduct.id, categories);
        }

        res.redirect("/seller/dashboard"); 
    } catch (error) {
        console.error(error);
        res.render("product-form", { 
            error: "Erro ao cadastrar produto.", 
            user: req.session.user 
        });
    }
}

export const sellerController = {
    showDashboard,
    showCreateProductPage,
    createProduct
};