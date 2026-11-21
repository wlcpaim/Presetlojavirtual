export function renderNavbar() {
    return `
        <nav class="p-4 border-b border-slate-800 flex justify-between">
            <a href="#/" class="text-xl font-bold">WLC.Store</a>
            <button class="flex items-center gap-2"><i data-lucide="shopping-bag"></i> Cart</button>
        </nav>
    `;
}
