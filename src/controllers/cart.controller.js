async function addToCart(req, res) {
    const { productId, productName, productPrice, quantity } = req.body;

    // 1. Garante que a sessão do carrinho existe
    if (!req.session.cart) {
        req.session.cart = [];
    }

    // 2. Verifica se o produto já está no carrinho
    const existingProduct = req.session.cart.find(item => item.id == productId);

    if (existingProduct) {
        // Se já existe, só aumenta a quantidade
        existingProduct.quantity += parseInt(quantity);
    } else {
        // Se não existe, adiciona novo item
        req.session.cart.push({
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            quantity: parseInt(quantity)
        });
    }

    // 3. PROGRESSIVE ENHANCEMENT: Verifica se o pedido veio via AJAX
    // O header 'x-requested-with' ou o content-type 'application/json' indicam AJAX
    const isAjax = req.xhr || req.headers['content-type'] === 'application/json';

    const totalItems = req.session.cart.reduce((acc, item) => acc + item.quantity, 0);

    if (isAjax) {
        // Resposta para o JavaScript (não recarrega a tela)
        return res.status(200).json({ 
            message: "Adicionado com sucesso!", 
            totalItems: totalItems 
        });
    } else {
        // Resposta para HTML Clássico (recarrega e volta para a loja)
        return res.redirect("/");
    }
}

async function showCart(req, res) {
    const cart = req.session.cart || [];
    
    // Calcula o total da compra
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    res.render("cart", { 
        cart: cart, 
        total: total,
        user: req.session.user 
    });
}

async function updateCartItem(req, res) {
    const { productId, action } = req.body;
    const cart = req.session.cart || [];
    
    const item = cart.find(i => i.id == productId);

    if (item) {
        if (action === 'increase') item.quantity++;
        if (action === 'decrease') item.quantity--;
        
        // Se zerar, remove do carrinho
        if (item.quantity <= 0) {
            req.session.cart = cart.filter(i => i.id != productId);
        }
    }

    // Retorno AJAX ou Redirect
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        const total = req.session.cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
        return res.json({ 
            success: true, 
            newQuantity: item ? item.quantity : 0, 
            cartTotal: total 
        });
    }
    return res.redirect('/cart');
}

async function removeCartItem(req, res) {
    const { productId } = req.body;
    
    if (req.session.cart) {
        req.session.cart = req.session.cart.filter(item => item.id != productId);
    }

    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        const total = req.session.cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
        return res.json({ success: true, action: 'remove', cartTotal: total });
    }
    return res.redirect('/cart');
}

export const cartController = {
    addToCart,
    showCart,
    updateCartItem,
    removeCartItem
};