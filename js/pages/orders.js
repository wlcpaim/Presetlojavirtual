export const renderOrders = (state) => {
    const orders = state.getOrders();
    if (orders.length === 0) {
        return `
            <div class="container mx-auto px-4 py-12 text-center text-white">
                <h1 class="text-3xl font-bold mb-4">Meus Pedidos</h1>
                <p class="text-slate-400">Você ainda não realizou nenhum pedido.</p>
                <a href="#/" class="mt-8 inline-block px-6 py-3 bg-emerald-500 rounded-xl">Ir para a Loja</a>
            </div>
        `;
    }
    return `
        <div class="container mx-auto px-4 py-12 text-white">
            <h1 class="text-3xl font-bold mb-8">Meus Pedidos</h1>
            <div class="space-y-4">
                ${orders.map(order => `
                    <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-lg font-bold">Pedido #${order.id}</span>
                            <span class="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">Concluído</span>
                        </div>
                        <div class="text-slate-400">Total: R$ ${order.total.toFixed(2)}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};
