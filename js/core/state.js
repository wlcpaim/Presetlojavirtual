export const state = {
    cart: [],
    wishlist: JSON.parse(localStorage.getItem('wlc_wishlist') || '[]'),
    orders: JSON.parse(localStorage.getItem('wlc_orders') || '[]'),
    filters: { search: '', category: 'all', sort: 'newest', onlyFavorites: false },
    activeCoupon: null, // { code: 'BEMVINDO10', discount: 0.10 }

    saveWishlist() {
        localStorage.setItem('wlc_wishlist', JSON.stringify(this.wishlist));
    },

    toggleWishlist(productId) {
        const index = this.wishlist.indexOf(productId);
        if (index > -1) {
            this.wishlist.splice(index, 1);
        } else {
            this.wishlist.push(productId);
        }
        this.saveWishlist();
        window.dispatchEvent(new CustomEvent('wishlist-updated', { detail: this.wishlist }));
    },

    isWishlisted(productId) {
        return this.wishlist.includes(productId);
    },

    getWishlistCount() {
        return this.wishlist.length;
    },

    applyCoupon(code) {
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode === 'BEMVINDO10') {
            this.activeCoupon = { code: 'BEMVINDO10', discount: 0.10 };
            return { success: true, message: 'Cupom BEMVINDO10 aplicado (10% OFF)' };
        } else if (cleanCode === 'VIP15') {
            this.activeCoupon = { code: 'VIP15', discount: 0.15 };
            return { success: true, message: 'Cupom VIP15 aplicado (15% OFF)' };
        }
        return { success: false, message: 'Cupom inválido ou expirado' };
    },

    removeCoupon() {
        this.activeCoupon = null;
    },

    saveOrder(orderData) {
        const order = {
            id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
            date: new Date().toISOString(),
            ...orderData
        };
        this.orders.unshift(order);
        localStorage.setItem('wlc_orders', JSON.stringify(this.orders));
        this.cart = []; // limpa o carrinho
        this.activeCoupon = null;
        window.dispatchEvent(new CustomEvent('orders-updated', { detail: this.orders }));
        return order;
    },

    getOrders() {
        return this.orders;
    },

    addToCart(product) {
        const existing = this.cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity = (existing.quantity || 1) + 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        window.dispatchEvent(new CustomEvent('cart-updated', { detail: this.cart }));
    },

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        window.dispatchEvent(new CustomEvent('cart-updated', { detail: this.cart }));
    },

    updateQuantity(productId, quantity) {
        const item = this.cart.find(i => i.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
        }
        window.dispatchEvent(new CustomEvent('cart-updated', { detail: this.cart }));
    }
};
