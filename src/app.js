import hbs from "hbs"; 
import express from "express";
import cookieSession from "cookie-session"; // <--- Mudança aqui
import routers from "./routers/index.router.js";

const app = express();

// Configura o Handlebars
app.set("views", "src/views");
hbs.registerHelper('multiply', (a, b) => {
    return (a * b).toFixed(2); // Retorna a multiplicação formatada
});
hbs.registerHelper('formatDate', (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString('pt-BR');
});
hbs.registerHelper('checkPositive', (value) => {
    return value >= 0;
});
app.set("view engine", "hbs");

// Configura para ler JSON e Formulários HTML
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- CONFIGURAÇÃO DA SESSÃO (COOKIE) ---
app.use(cookieSession({
    name: 'ecommerce_session', // Nome do cookie no navegador
    keys: ['chave_super_secreta_1', 'chave_super_secreta_2'], // Chaves para criptografar
    
    // Configuração "Para Sempre" (10 anos em milissegundos)
    maxAge: 10 * 365 * 24 * 60 * 60 * 1000 
}));

// Disponibiliza a sessão para todas as views (ex: mostrar "Olá, João" no topo)
app.use((req, res, next) => {
    // No cookie-session, os dados ficam direto em req.session
    res.locals.user = req.session.user; 
    res.locals.cart = req.session.cart;
    next();
});

app.use(routers);

export default app;