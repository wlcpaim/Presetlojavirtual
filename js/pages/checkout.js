import { showToast } from '../components/toast.js';

export const renderCheckout = (state) => {
    const cart = state.getCart();
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discount = state.getDiscountValue(subtotal);
    const total = subtotal - discount;

    return `
        <div class="container mx-auto px-4 py-12 max-w-2xl">
            <h1 class="text-3xl font-bold text-white mb-8">Checkout Premium</h1>
            <div class="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
                <div class="flex gap-4 mb-8">
                    <button class="flex-1 py-3 bg-emerald-500 rounded-xl font-bold">Pix</button>
                    <button class="flex-1 py-3 bg-slate-700 rounded-xl">Cartão</button>
                </div>

                <div id="pix-section" class="text-center space-y-4">
                    <div class="p-4 bg-white rounded-xl inline-block">
                        <div class="w-48 h-48 bg-slate-900 mx-auto flex items-center justify-center font-bold text-white">[QR CODE]</div>
                    </div>
                    <p id="timer" class="text-emerald-400 font-mono text-xl">10:00</p>
                    <button class="px-6 py-2 bg-slate-700 rounded-full hover:bg-slate-600">Copiar Chave Pix</button>
                </div>

                <div class="mt-8 pt-8 border-t border-slate-700">
                    <div class="flex justify-between text-slate-400 mb-2">
                        <span>Subtotal</span>
                        <span>R$ ${subtotal.toFixed(2)}</span>
                    </div>
                    <div class="flex gap-2 mb-4">
                        <input id="coupon-input" type="text" placeholder="Cupom" class="flex-1 p-3 rounded-lg bg-slate-900 border border-slate-700 text-white">
                        <button onclick="applyCoupon()" class="px-4 py-2 bg-slate-700 rounded-lg">Aplicar</button>
                    </div>
                    <div class="flex justify-between text-xl font-bold text-white">
                        <span>Total</span>
                        <span>R$ ${total.toFixed(2)}</span>
                    </div>
                    <button onclick="finishOrder()" class="w-full mt-6 py-4 bg-emerald-500 rounded-xl font-bold hover:bg-emerald-600 transition">Finalizar Compra</button>
                </div>
            </div>
        </div>
    `;
};
