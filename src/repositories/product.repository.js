function getDBProductById(productId) {
    // TODO: Alterar para a query real do banco de dados
    const products = [
        { id: 0, name: "Cachaça Claudionor", price: "R$ 90,00" },
        { id: 1, name: "Carne seca", price: "R$ 55,00 (kg)" }
    ];

    const product = products.find(product => {
        return product.id === productId;
    });

    return product;
};

export const productRepository = {
    getDBProductById
};
