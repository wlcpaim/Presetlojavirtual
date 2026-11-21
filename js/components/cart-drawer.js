// js/components/cart-drawer.js
export const renderCartDrawer = (state) => {
  const subtotal = state.subtotal || 0;
  const discount = state.discountAmount || 0;
  const shipping = subtotal > 200 ? 0 : (subtotal > 0 ? 25 : 0);
  const total = Math.max(0, subtotal - discount + shipping);

  return `
    <div id="cart-drawer" class="fixed inset-0 z-50 overflow-hidden translate-x-full transition-transform duration-300 pointer-events-none">
      <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm pointer-events-auto" onclick="closeCart()"></div>
      <div class="absolute inset-y-0 right-0 max-w-full flex pl-10 pointer-events-auto">
        <div class="w-screen max-w-md bg-slate-950 border-l border-slate-800 flex flex-col shadow-2xl">
          <div class="p-6 border-b border-slate-800 flex items-center justify-between">
            <h2 class="text-xl font-bold text-white flex items-center gap-2">
              <i data-lucide="shopping-bag" class="w-5 h-5 text-emerald-400"></i>
              Carrinho (${state.cart.reduce((a, b) => a + b.qty, 0)})
            </h2>
            <button onclick="closeCart()" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-6 space-y-4">
            ${state.cart.length === 0 ? `
              <div class="text-center py-16">
                <i data-lucide="shopping-cart" class="w-16 h-16 text-slate-700 mx-auto mb-4"></i>
                <p class="text-white font-medium mb-1">Seu carrinho está vazio</p>
                <p class="text-sm text-slate-500 mb-6">Explore nossa vitrine e adicione produtos incríveis.</p>
                <button onclick="closeCart()" class="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-colors">Ver Produtos</button>
              </div>
            ` : state.cart.map(item => `
              <div class="flex items-center gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg border border-slate-800" />
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-semibold text-white truncate">${item.name}</h4>
                  <p class="text-sm font-bold text-emerald-400 mt-1">R$ ${item.price.toFixed(2)}</p>
                  <div class="flex items-center gap-2 mt-2">
                    <button onclick="updateQty('${item.id}', -1)" class="w-7 h-7 bg-slate-800 hover:bg-slate-700 rounded-lg text-white flex items-center justify-center">-</button>
                    <span class="text-sm font-medium text-white px-2">${item.qty}</span>
                    <button onclick="updateQty('${item.id}', 1)" class="w-7 h-7 bg-slate-800 hover:bg-slate-700 rounded-lg text-white flex items-center justify-center">+</button>
                  </div>
                </div>
                <button onclick="updateQty('${item.id}', -${item.qty})" class="text-slate-500 hover:text-red-400 p-2">
                  <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
              </div>
            `).join('')}
          </div>

          ${state.cart.length > 0 ? `
            <div class="p-6 border-t border-slate-800 bg-slate-900/50 space-y-4">
              <div class="flex gap-2">
                <input type="text" id="coupon-input" placeholder="Cupom (ex: BEMVINDO10)" class="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white uppercase placeholder-slate-500 focus:outline-none focus:border-emerald-500" />
                <button onclick="applyCoupon()" class="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors">Aplicar</button>
              </div>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between text-slate-400"><span>Subtotal</span><span>R$ ${subtotal.toFixed(2)}</span></div>
                ${discount > 0 ? `<div class="flex justify-between text-emerald-400 font-medium"><span>Desconto</span><span>- R$ ${discount.toFixed(2)}</span></div>` : ''}
                <div class="flex justify-between text-slate-400"><span>Frete</span><span>${shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}</span></div>
                <div class="flex justify-between text-lg font-bold text-white pt-2 border-t border-slate-800"><span>Total</span><span>R$ ${total.toFixed(2)}</span></div>
              </div>
              <button onclick="window.location.hash='#/checkout'; closeCart();" class="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
                <span>Finalizar Compra</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
};
