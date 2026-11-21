// js/pages/store.js
import { renderProductCard } from '../components/product-card.js';

export const renderStore = (state) => {
  return `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="bg-gradient-to-r from-emerald-900/40 to-slate-900 border border-emerald-500/20 rounded-2xl p-8 mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">Coleção Premium 2026</h1>
        <p class="text-slate-400">Descubra os melhores produtos com padrão de excelência internacional.</p>
      </div>
      <div id="product-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        ${state.products.map(p => renderProductCard(p)).join('')}
      </div>
    </div>
  `;
};

// js/pages/product-detail.js
export const renderProductDetail = (state, productId) => {
  const product = state.products.find(p => p.id === productId);
  if (!product) return `<div class="p-8 text-center text-white">Produto não encontrado</div>`;
  return `
    <div class="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <img src="${product.image}" class="w-full h-96 object-cover rounded-xl border border-slate-800" />
      <div>
        <h1 class="text-3xl font-bold text-white mb-4">${product.name}</h1>
        <p class="text-2xl font-bold text-emerald-400 mb-4">R$ ${product.price}</p>
        <p class="text-slate-400 mb-6">${product.description || 'Produto de alta qualidade com garantia total.'}</p>
        <button onclick="addToCart('${product.id}')" class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg w-full transition-colors">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  `;
};

// js/pages/checkout.js
export const renderCheckout = (state) => {
  return `
    <div class="max-w-3xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-white mb-6">Checkout</h1>
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 class="text-xl font-bold text-white mb-4">Dados Pessoais</h2>
        <input type="text" placeholder="Nome Completo" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white mb-4" />
        <input type="email" placeholder="E-mail" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white mb-4" />
        <button onclick="completeOrder()" class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg w-full transition-colors">
          Confirmar Pedido (PIX / Cartão)
        </button>
      </div>
    </div>
  `;
};
