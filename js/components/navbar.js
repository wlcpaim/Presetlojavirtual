import { state } from '../core/state.js';
import { db } from '../core/db.js';

export function renderNavbar() {
    const cartCount = state.cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    const wishlistCount = state.getWishlistCount();

    // Attach global search handler if not present
    if (!window.handleSearchInput) {
        window.handleSearchInput = async (e) => {
            const query = e.target.value.toLowerCase().trim();
            const dropdown = document.getElementById('search-dropdown');
            if (!dropdown) return;

            if (query.length === 0) {
                dropdown.classList.add('hidden');
                dropdown.innerHTML = '';
                return;
            }

            const products = await db.collection('products').list();
            const filtered = products.filter(p => p.name.toLowerCase().includes(query) || (p.description && p.description.toLowerCase().includes(query)));

            if (filtered.length === 0) {
                dropdown.innerHTML = `<div class=\"p-3 text-sm text-slate-400 text-center\">Nenhum produto encontrado</div>`;
                dropdown.classList.remove('hidden');
                return;
            }

            dropdown.innerHTML = filtered.slice(0, 5).map(p => `\n                <a href=\"#/produto/${p.id}\" onclick=\"document.getElementById('search-dropdown').classList.add('hidden')\" class=\"flex items-center gap-3 p-2.5 hover:bg-slate-800/80 transition-colors border-b border-slate-800/50 last:border-0\">\n                    <img src=\"${p.image}\" alt=\"${p.name}\" class=\"w-10 h-10 object-cover rounded-lg bg-slate-800\" />\n                    <div class=\"flex-1 min-w-0\">\n                        <h4 class=\"text-sm font-medium text-white truncate\">${p.name}</h4>\n                        <p class=\"text-xs text-emerald-400 font-semibold\">R$ ${Number(p.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>\n                    </div>\n                </a>\n            `).join('');
            dropdown.classList.remove('hidden');
        };
    }

    return `\n        <header class=\"sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800\">\n            <div class=\"max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4\">\n                <a href=\"#/\" class=\"flex items-center gap-2 text-white font-bold text-xl tracking-tight\">\n                    <div class=\"w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black\">W</div>\n                    <span>WLC.<span class=\"text-emerald-400\">Store</span></span>\n                </a>\n\n                <div class=\"hidden md:flex items-center flex-1 max-w-md relative\">\n                    <div class=\"w-full relative\">\n                        <i data-lucide=\"search\" class=\"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400\"></i>\n                        <input \n                            type=\"text\" \n                            id=\"main-search-input\"\n                            placeholder=\"Buscar produtos de alto padrão...\" \n                            class=\"w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors\"\n                            oninput=\"window.handleSearchInput(event)\"\n                        />\n                        <div id=\"search-dropdown\" class=\"hidden absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto\"></div>\n                    </div>\n                </div>\n\n                <div class=\"flex items-center gap-2 sm:gap-3\">\n                    <a href=\"#/pedidos\" class=\"flex items-center gap-1.5 text-sm text-slate-300 hover:text-white px-3 py-2 rounded-xl hover:bg-slate-900 transition-colors border border-transparent hover:border-slate-800\">\n                        <i data-lucide=\"package\" class=\"w-4 h-4 text-emerald-400\"></i>\n                        <span class=\"hidden sm:inline\">Meus Pedidos</span>\n                    </a>\n\n                    <a href=\"#/\" onclick=\"window.toggleOnlyFavorites && window.toggleOnlyFavorites()\" class=\"relative p-2.5 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-white transition-all flex items-center justify-center\" title=\"Favoritos\">\n                        <i data-lucide=\"heart\" class=\"w-5 h-5 ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-300'}\"></i>\n                        ${wishlistCount > 0 ? `<span class=\"absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center\">${wishlistCount}</span>` : ''}\n                    </a>\n\n                    <button onclick=\"openCart()\" class=\"relative p-2.5 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-white transition-all flex items-center justify-center\">\n                        <i data-lucide=\"shopping-bag\" class=\"w-5 h-5\"></i>\n                        ${cartCount > 0 ? `<span class=\"absolute -top-1.5 -right-1.5 bg-emerald-500 text-slate-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse\">${cartCount}</span>` : ''}\n                    </button>\n                </div>\n            </div>\n        </header>\n    `;\n}
