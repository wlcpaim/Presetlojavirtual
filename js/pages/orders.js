export const renderOrders = (state) => {
    const orders = state.getOrders();
    
    if (!orders || orders.length === 0) {
        return `
            <div class=\"container mx-auto px-4 py-12 text-center text-white flex flex-col items-center\">
                <div class=\"w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6 text-4xl\">📦</div>
                <h1 class=\"text-3xl font-bold mb-4\">Nenhum pedido encontrado</h1>
                <p class=\"text-slate-400 mb-8\">Explore nossa coleção e encontre algo especial.</p>
                <a href=\"#/\" class=\"px-8 py-3 bg-emerald-500 hover:bg-emerald-600 transition-colors rounded-xl font-semibold\">Explorar Coleção</a>
            </div>
        `;
    }
    
    const statuses = ['Aguardando Pagamento', 'Pagamento Aprovado', 'Em Separação', 'Em Transporte', 'Entregue'];

    return `
        <div class=\"container mx-auto px-4 py-12 text-white\">
            <h1 class=\"text-3xl font-bold mb-8\">Meus Pedidos</h1>
            <div class=\"space-y-6\">
                ${orders.map(order => `
                    <div class=\"bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl\">
                        <div class=\"flex justify-between items-center mb-6 border-b border-slate-700 pb-4\">
                            <div>
                                <span class=\"text-lg font-bold text-emerald-400\">Pedido #${order.id}</span>
                                <p class=\"text-sm text-slate-400\">${new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <span class=\"text-xl font-bold\">R$ ${order.total.toFixed(2)}</span>
                        </div>
                        
                        <div class=\"flex items-center justify-between mt-4 overflow-x-auto pb-4 gap-4\">
                            ${statuses.map((status, index) => `
                                <div class=\"flex flex-col items-center min-w-[100px]\">
                                    <div class=\"w-8 h-8 rounded-full flex items-center justify-center ${index <= 1 ? 'bg-emerald-500' : 'bg-slate-700'}\">
                                        ${index <= 1 ? '✓' : index + 1}
                                    </div>
                                    <span class=\"text-[10px] text-center mt-2 text-slate-400\">${status}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};
