import { renderProductCard } from '../components/product-card.js';
import { db } from '../core/db.js';
import { state } from '../core/state.js';

export async function renderStore() {
    let products = await db.collection('products').list();

    // Filtering by category
    if (state.filters.category && state.filters.category !== 'all') {
        products = products.filter(p => p.category === state.filters.category);
    }

    // Filtering by search query
    if (state.filters.search) {
        const q = state.filters.search.toLowerCase();
        products = products.filter(p => p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)));
    }

    // Filtering by Only Favorites
    if (state.filters.onlyFavorites) {
        products = products.filter(p => state.isWishlisted(p.id));
    }

    // Sorting
    if (state.filters.sort === 'price-asc') {
        products.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (state.filters.sort === 'price-desc') {
        products.sort((a, b) => Number(b.price) - Number(a.price));
    } else {
        // newest
        products.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    // Global handlers for UI controls
    window.setStoreFilter = (category) => {
        state.filters.category = category;
        window.location.hash = '#/';
    };

    window.setStoreSort = (e) => {
        state.filters.sort = e.target.value;
        window.location.hash = '#/';
    };

    window.toggleOnlyFavorites = () => {
        state.filters.onlyFavorites = !state.filters.onlyFavorites;
        window.location.hash = '#/';
    };

    const categories = ['all', 'Eletrônicos', 'Moda', 'Casa', 'Acessórios'];

    return `\n        <div class=\"max-w-7xl mx-auto px-4 py-8\">\n            <!-- Hero Banner -->\n            <div class=\"relative overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/20 rounded-3xl p-8 md:p-12 mb-10 shadow-2xl\">\n                <div class=\"absolute -right-10 -bottom-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none\"></div>\n                <div class=\"max-w-xl relative z-10\">\n                    <span class=\"inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4\">\n                        <i data-lucide=\"sparkles\" class=\"w-3.5 h-3.5\"></i> Coleção Exclusiva 2026\n                    </span>\n                    <h1 class=\"text-4xl md:text-5xl font-black text-white tracking-tight mb-4\">\n                        Luxo e Inovação ao seu alcance.\n                    </h1>\n                    <p class=\"text-slate-400 text-base md:text-lg mb-6\">\n                        Experiência de compra impecável com curadoria WLC. Seleção rigorosa para clientes exigentes.\n                    </p>\n                </div>\n            </div>\n\n            <!-- Controls & Filters Bar -->\n            <div class=\"flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8\">\n                <div class=\"flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar\">\n                    ${categories.map(cat => `\n                        <button \n                            onclick=\"window.setStoreFilter('${cat}')\"\n                            class=\"px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${state.filters.category === cat ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'}\">\n                            ${cat === 'all' ? 'Todos os Produtos' : cat}\n                        </button>\n                    `).join('')}\n                </div>\n\n                <div class=\"flex items-center gap-3 justify-end\">\n                    <button \n                        onclick=\"window.toggleOnlyFavorites()\"\n                        class=\"flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${state.filters.onlyFavorites ? 'bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/20' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'}\">\n                        <i data-lucide=\"heart\" class=\"w-4 h-4 ${state.filters.onlyFavorites ? 'fill-white' : ''}\"></i>\n                        <span>Apenas Favoritos</span>\n                    </button>\n\n                    <select \n                        onchange=\"window.setStoreSort(event)\"\n                        class=\"bg-slate-900 border border-slate-800 text-slate-300 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 cursor-pointer\">\n                        <option value=\"newest\" ${state.filters.sort === 'newest' ? 'selected' : ''}>Mais Recentes</option>\n                        <option value=\"price-asc\" ${state.filters.sort === 'price-asc' ? 'selected' : ''}>Menor Preço</option>\n                        <option value=\"price-desc\" ${state.filters.sort === 'price-desc' ? 'selected' : ''}>Maior Preço</option>\n                    </select>\n                </div>\n            </div>\n\n            <!-- Product Grid -->\n            ${products.length === 0 ? `\n                <div class=\"bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center my-12\">\n                    <div class=\"w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400\">\n                        <i data-lucide=\"package-open\" class=\"w-8 h-8\"></i>\n                    </div>\n                    <h3 class=\"text-lg font-bold text-white mb-2\">Nenhum produto encontrado</h3>\n                    <p class=\"text-slate-400 text-sm mb-6\">Tente ajustar seus filtros ou termos de busca para encontrar o que procura.</p>\n                    <button onclick=\"window.setStoreFilter('all'); state.filters.onlyFavorites = false; window.location.hash = '#/'\" class=\"px-6 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors text-sm\">\n                        Limpar Filtros\n                    </button>\n                </div>\n            ` : `\n                <div class=\"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6\">\n                    ${products.map(p => renderProductCard(p)).join('')}\n                </div>\n            `}\n        </div>\n    `;\n}
