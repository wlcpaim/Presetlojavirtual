const db = {
    products: [
        { id: 1, name: 'Minimalist Chair', price: 299, category: 'Furniture', img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400', stock: 10, tags: ['Home', 'Modern'] },
        { id: 2, name: 'Table Lamp', price: 89, category: 'Lighting', img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400', stock: 15, tags: ['Desk', 'Office'] },
        { id: 3, name: 'Ceramic Vase', price: 45, category: 'Decor', img: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400', stock: 20, tags: ['Decor'] },
        { id: 4, name: 'Wall Clock', price: 120, category: 'Decor', img: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400', stock: 5, tags: ['Home'] },
        { id: 5, name: 'Desk Organizer', price: 35, category: 'Office', img: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=400', stock: 30, tags: ['Office'] },
        { id: 6, name: 'Floor Plant', price: 150, category: 'Decor', img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400', stock: 8, tags: ['Nature'] },
        { id: 7, name: 'Bluetooth Speaker', price: 200, category: 'Tech', img: 'https://images.unsplash.com/photo-1545454675-3531b576bea9?w=400', stock: 12, tags: ['Tech'] },
        { id: 8, name: 'Coffee Mug', price: 25, category: 'Kitchen', img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400', stock: 50, tags: ['Kitchen'] }
    ],
    getProducts() { return this.products; },
    getProductById(id) { return this.products.find(p => p.id === parseInt(id)); }
};

export const initDb = () => {
    if (!window.wlcDb) window.wlcDb = db;
    return window.wlcDb;
};

export default db;
