// js/main.js
import { initDb } from './core/db.js';
import { getState, setState, subscribe } from './core/state.js';
import { initRouter } from './core/router.js';
import { renderNavbar } from './components/navbar.js';
import { renderCartDrawer } from './components/cart-drawer.js';

window.addToCart = (id) => {
  const state = getState();
  const product = state.products.find(p => p.id === id);
  if (!product) return;
  const existing = state.cart.find(item => item.id === id);
  let newCart = [];
  if (existing) {
    newCart = state.cart.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item);
  } else {
    newCart = [...state.cart, { ...product, qty: 1 }];
  }
  const subtotal = newCart.reduce((acc, item) => acc + item.price * item.qty, 0);
  setState({ cart: newCart, subtotal });
};

window.updateQty = (id, delta) => {
  const state = getState();
  const newCart = state.cart.map(item => {
    if (item.id === id) {
      const q = item.qty + delta;
      return q > 0 ? { ...item, qty: q } : null;
    }
    return item;
  }).filter(Boolean);
  const subtotal = newCart.reduce((acc, item) => acc + item.price * item.qty, 0);
  setState({ cart: newCart, subtotal });
};

window.toggleWishlist = (id) => {
  const state = getState();
  const exists = state.wishlist.includes(id);
  const wishlist = exists ? state.wishlist.filter(item => item !== id) : [...state.wishlist, id];
  setState({ wishlist });
};

window.closeCart = () => {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) drawer.classList.add('translate-x-full');
};

window.openCart = () => {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) drawer.classList.remove('translate-x-full');
};

window.completeOrder = () => {
  const state = getState();
  const order = { id: 'ORD-' + Math.floor(Math.random() * 100000), items: state.cart, total: state.subtotal, date: new Date().toISOString() };
  window.wlcDb.collection('orders').create(order);
  setState({ cart: [], subtotal: 0 });
  window.location.hash = '#/';
  alert('Pedido realizado com sucesso! ID: ' + order.id);
};

document.addEventListener('DOMContentLoaded', () => {
  initDb();
  const state = getState();
  state.products = window.wlcDb.collection('products').list();
  setState(state);

  const root = document.getElementById('app');
  
  subscribe((currentState) => {
    root.innerHTML = `
      ${renderNavbar(currentState)}
      <main id="main-content"></main>
      ${renderCartDrawer(currentState)}
    `;
    initRouter(currentState);
    lucide.createIcons();
  });
  
  window.addEventListener('popstate', () => {
    initRouter(getState());
  });

  // Initial trigger
  setState(getState());
});
