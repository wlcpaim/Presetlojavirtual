// js/components/product-card.js
export const renderProductCard = (product) => {
  return `
    <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all flex flex-col group">
      <div class="relative overflow-hidden aspect-square bg-slate-950">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ${product.discount ? `<span class="absolute top-3 left-3 bg-emerald-500 text-slate-950 font-bold text-xs px-2.5 py-1 rounded-full">-${product.discount}%</span>` : ''}
        <button onclick="toggleWishlist('${product.id}')" class="absolute top-3 right-3 p-2 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-full text-slate-300 hover:text-white transition-colors">
          <i data-lucide="heart" class="w-4 h-4"></i>
        </button>
      </div>
      <div class="p-4 flex flex-col flex-grow">
        <span class="text-xs text-emerald-400 font-semibold mb-1 uppercase tracking-wider">${product.category}</span>
        <a href="#/produto/${product.id}" class="text-white font-semibold text-base hover:text-emerald-400 transition-colors mb-2 line-clamp-1">${product.name}</a>
        <div class="mt-auto flex items-center justify-between pt-4 border-t border-slate-800">
          <div>
            <span class="text-xs text-slate-500 line-through">R$ ${(product.price * 1.2).toFixed(2)}</span>
            <div class="text-lg font-bold text-white">R$ ${product.price.toFixed(2)}</div>
          </div>
          <button onclick="addToCart('${product.id}')" class="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold p-2.5 rounded-lg transition-colors flex items-center justify-center">
            <i data-lucide="shopping-cart" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    </div>
  `;
};

// js/components/toast.js
export const showToast = (message, type = 'success') => {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur transition-all duration-300 translate-y-2 opacity-0 ${
    type === 'success' ? 'bg-slate-900/90 border-emerald-500/30 text-white' : 'bg-slate-900/90 border-red-500/30 text-white'
  }`;
  toast.innerHTML = `
    <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}" class="w-5 h-5 ${type === 'success' ? 'text-emerald-400' : 'text-red-400'}"></i>
    <span class="text-sm font-medium">${message}</span>
  `;
  container.appendChild(toast);
  lucide.createIcons();
  setTimeout(() => { toast.classList.remove('translate-y-2', 'opacity-0'); }, 10);
  setTimeout(() => {
    toast.classList.add('translate-y-2', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};
