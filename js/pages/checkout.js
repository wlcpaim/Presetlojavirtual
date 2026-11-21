import { showToast } from '../components/toast.js';

export const renderCheckout = () => {
    return `
        <div class="container mx-auto px-4 py-12">
            <h1 class="text-3xl font-bold text-white mb-8">Checkout</h1>
            <div class="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <form id="checkout-form" class="space-y-6">
                    <input type="text" placeholder="Nome Completo" class="form-control w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white" required>
                    <input type="email" placeholder="E-mail" class="form-control w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white" required>
                    <button type="submit" class="btn btn-primary w-full py-4 text-lg">Finalizar Pedido</button>
                </form>
            </div>
        </div>
    `;
};
