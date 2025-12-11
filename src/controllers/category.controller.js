import { categoryRepository } from "../repositories/category.repository.js";

async function showCategoriesPage(req, res) {
    try {
        const categories = await categoryRepository.getAllCategories();
        res.render("categories", { categories, user: req.session.user });
    } catch (error) {
        console.error(error);
        res.render("error", { message: "Erro ao carregar categorias." });
    }
}

async function createCategory(req, res) {
    const { name, parentId } = req.body;

    try {
        await categoryRepository.createCategory(name, parentId);
        res.redirect("/seller/categories"); // Recarrega a página
    } catch (error) {
        console.error(error);
        res.render("error", { message: "Erro ao criar categoria." });
    }
}

export const categoryController = {
    showCategoriesPage,
    createCategory
};