// js/components/cart-drawer.js
export const renderCartDrawer = (state) => {
  return `
    <div id="cart-drawer" class="fixed inset-0 z-50 transform translate-x-full transition-transform duration-300 ease-in-out">
      <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onclick="closeCart()"></div>
      <div class="absolute right-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl p-6 flex flex-col">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-white">Carrinho</h2>
          <button onclick="closeCart()" class="text-slate-400 hover:text-white"><i data-lucide="x"></i></button>
        </div>
        <div id="cart-items" class="flex-1 overflow-y-auto space-y-4">
          ${state.cart.length === 0 ? '<p class="text-slate-500 text-center mt-10">Carrinho vazio</p>' : state.cart.map(item => `
            <div class="flex items-center gap-4 bg-slate-800 p-3 rounded-lg">
              <img src="${item.image}" class="w-16 h-16 rounded object-cover" />
              <div class="flex-1">
                <h4 class="text-sm font-medium text-white">${item.name}</h4>
                <p class="text-emerald-400 text-sm">R$ ${item.price}</p>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="updateQty('${item.id}', -1)" class="text-slate-400 hover:text-white"><i data-lucide="minus" class="w-4 h-4"></i></button>
                <span class="text-white text-sm">${item.qty}</span>
                <button onclick="updateQty('${item.id}', 1)" class="text-slate-400 hover:text-white"><i data-lucide="plus" class="w-4 h-4"></i></button>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="mt-6 pt-6 border-t border-slate-800">
          <div class="flex justify-between text-lg font-bold text-white mb-4">
            <span>Total</span>
            <span>R$ ${state.subtotal.toFixed(2)}</span>
          </div>
          <button onclick="window.location.hash='#/checkout'" class="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  `;
};

// js/components/toast.js
export const showToast = (message, type = 'info') => {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white ${type === 'success' ? 'bg-emerald-600' : 'bg-red-600'} transition-opacity`;
  toast.innerHTML = `<div class="flex items-center gap-2"><i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i><span>${message}</span></div>`;
  document.body.appendChild(toast);
  lucide.createIcons();
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

// js/components/product-card.js
export const renderProductCard = (product) => {
  return `
    <div class="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all group">
      <div class="relative overflow-hidden">
        <img src="${product.image}" class="w-full h-48 object-cover transition-transform group-hover:scale-105" />
        ${product.discount ? `<span class="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded">-${product.discount}%</span>` : ''}
        <button onclick="toggleWishlist('${product.id}')" class="absolute top-2 right-2 p-2 bg-slate-900/80 rounded-full text-slate-400 hover:text-red-500">
          <i data-lucide="heart"></i>
        </button>
      </div>
      <div class="p-4">
        <h3 class="text-white font-medium truncate">${product.name}</h3>
        <p class="text-slate-400 text-sm mb-4">${product.category}</p>
        <div class="flex justify-between items-center">
          <span class="text-lg font-bold text-emerald-400">R$ ${product.price}</span>
          <button onclick="addToCart('${product.id}')" class="bg-slate-800 hover:bg-emerald-600 p-2 rounded-lg transition-colors">
            <i data-lucide="shopping-bag" class="w-5 h-5"></i>
          </button>
        </div>
      </div>
    </div>
  `;
};
