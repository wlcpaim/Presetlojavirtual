import { getState } from '../core/state.js';

export const renderNavbar = (state) => {
  const cartCount = state.cart.reduce((acc, item) => acc + item.qty, 0);
  
  return `
    <header class="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <a href="#/" class="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
          <div class="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black">W</div>
          <span>WLC.<span class="text-emerald-400">Store</span></span>
        </a>

        <div class="hidden md:flex items-center flex-1 max-w-md relative">
          <i data-lucide="search" class="absolute left-3 w-4 h-4 text-slate-400"></i>
          <input 
            type="text" 
            placeholder="Buscar produtos de alto padrão..." 
            class="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            oninput="window.handleSearch(event)"
          />
        </div>

        <div class="flex items-center gap-3">
          <a href="#/pedidos" class="hidden sm:flex items-center gap-1.5 text-sm text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-900 transition-colors">
            <i data-lucide="package" class="w-4 h-4"></i>
            <span>Meus Pedidos</span>
          </a>

          <button onclick="openCart()" class="relative p-2.5 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-white transition-all flex items-center justify-center">
            <i data-lucide="shopping-bag" class="w-5 h-5"></i>
            ${cartCount > 0 ? `<span class="absolute -top-1.5 -right-1.5 bg-emerald-500 text-slate-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">${cartCount}</span>` : ''}
          </button>
        </div>
      </div>
    </header>
  `;
};
