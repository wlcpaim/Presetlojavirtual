const db = {
    products: [
        { id: 1, name: 'Minimalist Chair', price: 299, category: 'Furniture', img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400' },
        { id: 2, name: 'Table Lamp', price: 89, category: 'Lighting', img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400' },
        // ... 6 more
    ],
    getProducts() { return this.products; }
};

window.wlcDb = db;
export default db;
