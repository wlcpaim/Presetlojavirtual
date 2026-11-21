export const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} fade-in`;
    toast.innerHTML = `
        <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);
    lucide.createIcons();
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
};
