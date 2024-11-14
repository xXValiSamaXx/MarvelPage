function showAlert(message, type = 'success') {
    const alertsContainer = document.getElementById('alerts-container') || createAlertsContainer();
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    alertsContainer.appendChild(alert);
    setTimeout(() => alert.remove(), 5000);
}

function createAlertsContainer() {
    const container = document.createElement('div');
    container.id = 'alerts-container';
    container.className = 'position-fixed top-0 end-0 p-3';
    container.style.zIndex = '1050';
    document.body.appendChild(container);
    return container;
}

// Función para truncar texto
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

// Función para formatear fechas
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Función para crear elementos HTML con atributos y contenido
function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    element.innerHTML = content;
    return element;
}

// Función para agregar múltiples event listeners
function addEventListeners(element, events) {
    for (const [eventName, handler] of Object.entries(events)) {
        element.addEventListener(eventName, handler);
    }
}

// Función para hacer debounce de las llamadas a funciones
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Función para obtener parámetros de la URL
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
}

// Función para actualizar la URL con nuevos parámetros
function updateUrlParams(newParams) {
    const url = new URL(window.location);
    for (const [key, value] of Object.entries(newParams)) {
        url.searchParams.set(key, value);
    }
    window.history.pushState({}, '', url);
}

function createPagination(currentPage, totalPages, onPageChange) {
    const paginationContainer = document.createElement('nav');
    paginationContainer.setAttribute('aria-label', 'Navegación de páginas');
    paginationContainer.innerHTML = `
        <ul class="pagination justify-content-center">
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${currentPage - 1}">Anterior</a>
            </li>
            ${generatePaginationItems(currentPage, totalPages)}
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${currentPage + 1}">Siguiente</a>
            </li>
        </ul>
    `;

    paginationContainer.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = parseInt(e.target.dataset.page);
            if (page && page !== currentPage) {
                onPageChange(page);
            }
        });
    });

    return paginationContainer;
}

function generatePaginationItems(currentPage, totalPages) {
    let items = '';
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            items += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            items += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    return items;
}

function showToast(title, message, type = 'success') {
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    
    const toastId = 'toast-' + Date.now();
    const toast = createElement('div', { 
        class: `toast`,
        role: 'alert',
        'aria-live': 'assertive',
        'aria-atomic': 'true',
        id: toastId
    }, `
        <div class="toast-header ${type === 'error' ? 'bg-danger text-white' : 'bg-primary text-white'}">
            <strong class="me-auto">${title}</strong>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `);
    
    toastContainer.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
    bsToast.show();
}

function createToastContainer() {
    const container = createElement('div', {
        id: 'toast-container',
        class: 'toast-container position-fixed bottom-0 end-0 p-3',
        style: 'z-index: 1070;'
    });
    document.body.appendChild(container);
    return container;
}