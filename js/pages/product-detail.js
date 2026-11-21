import { showToast } from '../components/toast.js';

export const renderProductDetail = (id) => {
    const product = window.wlcDb.getProductById(id);
    if (!product) return '<h1>Produto não encontrado</h1>';

    return `
        <div class="container mx-auto px-4 py-8">
            <div class="grid md:grid-cols-2 gap-12">
                <img src="${product.img}" alt="${product.name}" class="rounded-2xl w-full aspect-square object-cover shadow-2xl">
                <div class="flex flex-col gap-6">
                    <h1 class="text-4xl font-bold text-white">${product.name}</h1>
                    <p class="text-2xl text-emerald-400 font-bold">$${product.price}</p>
                    <p class="text-slate-400 text-lg">Detalhes incríveis sobre este produto. Qualidade premium, design minimalista e perfeito para o seu ambiente moderno.</p>
                    <button onclick="addToCart(${product.id})" class="btn btn-primary text-lg py-4">Comprar Agora</button>
                </div>
            </div>
        </div>
    `;
};
