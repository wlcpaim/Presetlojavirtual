import { renderStore } from '../pages/store.js';
import { renderProductDetail } from '../pages/product-detail.js';
import { renderCheckout } from '../pages/checkout.js';
import { renderOrders } from '../pages/orders.js';

export const initRouter = (state) => {
  const hash = window.location.hash || '#/';
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  if (hash === '#/' || hash === '') {
    mainContent.innerHTML = renderStore(state);
  } else if (hash.startsWith('#/produto/')) {
    const id = hash.split('/')[2];
    mainContent.innerHTML = renderProductDetail(state, id);
  } else if (hash === '#/checkout') {
    mainContent.innerHTML = renderCheckout(state);
  } else if (hash === '#/pedidos') {
    mainContent.innerHTML = renderOrders(state);
  } else {
    mainContent.innerHTML = `<div class="p-8 text-center text-white text-xl">Página não encontrada</div>`;
  }
  lucide.createIcons();
};

window.addEventListener('hashchange', () => {
  // Trigger state re-render via window dispatch or main subscription
  window.dispatchEvent(new Event('popstate'));
});
