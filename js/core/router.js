export function initRouter() {
    const app = document.getElementById('app');
    const routes = {
        '#/': 'Store',
        '#/checkout': 'Checkout'
    };

    function render() {
        const hash = window.location.hash || '#/';
        app.innerHTML = `<h1>${routes[hash] || 'Not Found'}</h1>`;
    }

    window.addEventListener('hashchange', render);
    render();
}
