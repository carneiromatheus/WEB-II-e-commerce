import bcrypt from "bcrypt";
import { userService } from "../services/user.service.js";

// --- Renderização de Páginas (GET) ---

function showLoginPage(req, res) {
    // Se o usuário já estiver logado (sessão existe), manda pra Home
    if (req.session.user) {
        return res.redirect("/");
    }
    // Renderiza o arquivo src/views/login.hbs
    res.render("login");
}

function showRegisterPage(req, res) {
    if (req.session.user) {
        return res.redirect("/");
    }
    // Renderiza o arquivo src/views/register.hbs
    res.render("register");
}

// --- Lógica de Negócio (POST) ---

async function registerUser(req, res) {
    // Recebe os dados do formulário HTML
    const { email, name, password, role } = req.body;

    try {
        // Validação básica
        if (!email || !name || !role || !password) {
            return res.render("register", { error: "Preencha todos os campos." });
        }

        // Verifica se usuário já existe
        const existUser = await userService.getUserByEmail(email);
        if (existUser) {
            return res.render("register", { error: "Usuário já cadastrado com este e-mail." });
        }

        // Criptografa a senha
        const passwordHash = bcrypt.hashSync(password, 10);
        
        // Define se é vendedor (true) ou cliente (false) baseado no select do formulário
        const isSeller = role === "seller"; 

        // Cria no banco via service
        await userService.createUser(email, name, isSeller, passwordHash);
        
        // SUCESSO: Redireciona para a tela de login
        return res.redirect("/login");

    } catch (error) {
        console.error("Erro no registro:", error);
        return res.render("register", { error: "Erro interno ao cadastrar usuário." });
    }
}

async function authUser(req, res) {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.render("login", { error: "Preencha e-mail e senha." });
        }

        const user = await userService.getUserByEmail(email);
        
        // Verifica se usuário existe E se a senha bate (usando bcrypt)
        if (!user || !bcrypt.compareSync(password, user.password_hash)) {
            return res.render("login", { error: "E-mail ou senha inválidos." });
        }

        // --- SESSÃO VIA COOKIE (cookie-session) ---
        // Aqui salvamos os dados importantes no cookie criptografado.
        // O cookie-session salva automaticamente no final da resposta, 
        // NÃO use req.session.save().
        
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            isSeller: user.is_seller
        };

        // Inicializa o carrinho vazio na sessão se ainda não existir
        if (!req.session.cart) {
            req.session.cart = [];
        }

        // Redireciona para a Home
        return res.redirect("/");

    } catch (error) {
        console.error("Erro no login:", error);
        return res.render("login", { error: "Erro interno no servidor." });
    }
}

function logoutUser(req, res) {
    // Para apagar a sessão no cookie-session, definimos como null
    req.session = null;
    res.redirect("/login");
}

export const userController = {
    showLoginPage,
    showRegisterPage,
    registerUser,
    authUser,
    logoutUser
};