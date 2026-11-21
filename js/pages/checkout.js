import { showToast } from '../components/toast.js';

export const renderCheckout = (state) => {
    return `
        <div class=\"container mx-auto px-4 py-12 max-w-2xl\">
            <h1 class=\"text-3xl font-bold text-white mb-8\">Checkout</h1>
            <div id=\"checkout-container\" class=\"bg-slate-800 p-8 rounded-2xl border border-slate-700\">
                <div class=\"space-y-6\">
                    <h2 class=\"text-xl font-semibold text-white\">Etapa 1: Dados Pessoais</h2>
                    <input type=\"text\" placeholder=\"Nome Completo\" class=\"w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white\" required>
                    <input type=\"email\" placeholder=\"E-mail\" class=\"w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white\" required>
                    
                    <h2 class=\"text-xl font-semibold text-white mt-8\">Etapa 2: Pagamento (Pix)</h2>
                    <div class=\"bg-white p-4 rounded-xl text-center\">
                        <div class=\"w-48 h-48 bg-slate-900 mx-auto mb-2\"></div>
                        <p class=\"text-slate-900\">Código: PIX-WLC-12345-IA</p>
                    </div>

                    <button onclick=\"completeOrder()\" class=\"w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-lg transition\">
                        Confirmar Pagamento
                    </button>
                </div>
            </div>
        </div>
    `;
};
