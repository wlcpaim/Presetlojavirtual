export const state = {
    cart: [],
    filters: { search: '', category: 'all' },
    addToCart(product) {
        this.cart.push(product);
        console.log('Cart updated:', this.cart);
    }
};
