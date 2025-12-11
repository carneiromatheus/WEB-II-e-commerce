function ensureSeller(req, res, next) {
    // 1. Verifica se tem usuário logado
    if (!req.session.user) {
        return res.redirect("/login");
    }

    // 2. Verifica se é vendedor
    if (req.session.user.isSeller) {
        return next(); // Tudo certo, pode passar
    }
    
    // Se logado mas não é vendedor:
    return res.status(403).render("error", { 
        message: "Acesso negado. Apenas vendedores podem acessar esta área." 
    });
}

export const authMiddleware = {
    ensureSeller
};