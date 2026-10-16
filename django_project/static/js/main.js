/**
 * ОфисТех - Main JavaScript
 * AJAX функционал для корзины и других интерактивных элементов
 */

// Получение CSRF токена из cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

// ==================== КОРЗИНА ====================

/**
 * Добавить товар в корзину (AJAX)
 */
function addToCart(productId, quantity = 1) {
    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('quantity', quantity);

    fetch('/api/cart/add/', {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': csrftoken,
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            showToast(data.message);
            updateCartBadge(data.cart_total_items);
            // Перезагрузить страницу для обновления корзины
            setTimeout(() => location.reload(), 500);
        } else {
            showToast(data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Ошибка при добавлении товара', 'error');
    });
}

/**
 * Обновить количество товара в корзине (AJAX)
 */
function updateCart(productId, quantity) {
    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('quantity', quantity);

    fetch('/api/cart/update/', {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': csrftoken,
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            updateCartBadge(data.cart_total_items);
            // Перезагрузить страницу для обновления корзины
            setTimeout(() => location.reload(), 300);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

/**
 * Удалить товар из корзины (AJAX)
 */
function removeFromCart(productId) {
    const formData = new FormData();
    formData.append('product_id', productId);

    fetch('/api/cart/remove/', {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': csrftoken,
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            updateCartBadge(data.cart_total_items);
            // Удалить элемент из DOM
            const itemEl = document.getElementById(`cart-item-${productId}`);
            if (itemEl) {
                itemEl.style.opacity = '0';
                itemEl.style.transform = 'translateX(-20px)';
                itemEl.style.transition = 'all 0.3s';
                setTimeout(() => itemEl.remove(), 300);
            }
            // Перезагрузить страницу для обновления итогов
            setTimeout(() => location.reload(), 500);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

/**
 * Открыть корзину
 */
function openCart() {
    const offcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
    offcanvas.show();
}

/**
 * Обновить бейдж корзины
 */
function updateCartBadge(count) {
    const badges = document.querySelectorAll('#cart-badge, #cart-badge-mobile');
    badges.forEach(badge => {
        if (count > 0) {
            badge.style.display = 'flex';
            badge.textContent = count;
        } else {
            badge.style.display = 'none';
        }
    });
    
    const totalBadge = document.getElementById('cart-total-badge');
    if (totalBadge) {
        totalBadge.textContent = count;
    }
}

/**
 * Перейти к оформлению заказа
 */
function checkout() {
    window.location.href = '/checkout/';
}

// ==================== ПОИСК ====================

/**
 * Поиск с подсказками (AJAX)
 */
let searchTimeout;
const searchInput = document.querySelector('.search-input');

if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            hideSuggestions();
            return;
        }
        
        searchTimeout = setTimeout(() => {
            fetchSuggestions(query);
        }, 300);
    });
    
    searchInput.addEventListener('blur', function() {
        setTimeout(hideSuggestions, 200);
    });
}

function fetchSuggestions(query) {
    fetch(`/api/search/?q=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
        if (data.suggestions && data.suggestions.length > 0) {
            showSuggestions(data.suggestions);
        } else {
            hideSuggestions();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function showSuggestions(suggestions) {
    let suggestionsEl = document.getElementById('search-suggestions');
    
    if (!suggestionsEl) {
        suggestionsEl = document.createElement('div');
        suggestionsEl.id = 'search-suggestions';
        suggestionsEl.className = 'position-absolute bg-white rounded-3 shadow-lg border w-100';
        suggestionsEl.style.cssText = 'top:100%;left:0;z-index:1000;max-height:300px;overflow-y:auto';
        searchInput.parentElement.appendChild(suggestionsEl);
    }
    
    suggestionsEl.innerHTML = suggestions.map(s => `
        <a href="${s.url}" class="d-flex justify-content-between align-items-center p-3 text-decoration-none border-bottom">
            <span class="text-dark">${s.name}</span>
            <span class="text-primary fw-bold">${parseInt(s.price).toLocaleString('ru-RU')} ₽</span>
        </a>
    `).join('');
    
    suggestionsEl.style.display = 'block';
}

function hideSuggestions() {
    const suggestionsEl = document.getElementById('search-suggestions');
    if (suggestionsEl) {
        suggestionsEl.style.display = 'none';
    }
}

// ==================== УВЕДОМЛЕНИЯ ====================

/**
 * Показать уведомление
 */
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    
    if (type === 'error') {
        toast.style.background = '#ef4444';
    }
    
    toast.textContent = message;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ==================== ИНИЦИАЛИЗАЦИЯ ====================

document.addEventListener('DOMContentLoaded', function() {
    console.log('ОфисТех - Магазин оргтехники загружен');
    console.log('Django + Bootstrap + AJAX');
});
