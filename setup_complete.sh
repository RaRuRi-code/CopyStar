#!/bin/bash

echo "╔══════════════════════════════════════════════════════════╗"
echo "║  🚀 ПОЛНАЯ установка Django проекта ОфисТех            ║"
echo "║  Этот скрипт создаст ВСЕ файлы проекта                 ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Создание структуры
mkdir -p ofisteh shop templates/shop static/js media/products media/categories

# ========== PYTHON ФАЙЛЫ ==========
# (setup_all.sh уже создал их, пропускаем)

# ========== HTML ШАБЛОНЫ ==========

cat > templates/base.html << 'TEMPLATE_EOF'
{% load static %}
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}ОфисТех - Магазин оргтехники{% endblock %}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { font-family: 'Inter', sans-serif; }
        body { background: #f8fafc; min-height: 100vh; display: flex; flex-direction: column; }
        main { flex: 1; }
        .navbar-custom { background: linear-gradient(135deg, #1e3a8a, #1e40af, #4338ca) !important; }
        .product-card { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.06); transition: all 0.3s; height: 100%; }
        .product-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.12); }
        .product-card-img { background: linear-gradient(135deg, #f8fafc, #e2e8f0); height: 200px; display: flex; align-items: center; justify-content: center; position: relative; }
        .product-card-body { padding: 16px; }
        .product-price { font-size: 1.3rem; font-weight: 800; }
        footer { background: #0f172a; color: #94a3b8; }
        footer h5 { color: #fff; }
        .cart-badge { position: absolute; top: -4px; right: -4px; background: #ef4444; color: #fff; font-size: 0.7rem; font-weight: 700; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-custom sticky-top">
        <div class="container">
            <a class="navbar-brand text-white fw-bold" href="{% url 'shop:home' %}">🖥️ ОфисТех</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link text-white" href="{% url 'shop:home' %}">Главная</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="{% url 'shop:catalog' %}">Каталог</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="{% url 'shop:about' %}">О компании</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="{% url 'shop:contacts' %}">Контакты</a></li>
                </ul>
                <button class="btn btn-outline-light ms-3" onclick="openCart()">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="cart-badge" id="cart-badge" {% if cart_total_items == 0 %}style="display:none"{% endif %}>{{ cart_total_items }}</span>
                </button>
            </div>
        </div>
    </nav>

    <main>{% block content %}{% endblock %}</main>

    <footer class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5>🖥️ ОфисТех</h5>
                    <p class="small">Магазин оргтехники для бизнеса</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <p class="small mb-0">© 2024 ОфисТех. Все права защищены.</p>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{% static 'js/main.js' %}"></script>
    {% block extra_js %}{% endblock %}
</body>
</html>
TEMPLATE_EOF

cat > templates/shop/home.html << 'TEMPLATE_EOF'
{% extends 'base.html' %}
{% block content %}
<div class="container py-5">
    <div class="bg-primary text-white rounded-4 p-5 mb-5">
        <h1 class="display-4 fw-bold">Оргтехника для вашего офиса</h1>
        <p class="lead">Принтеры, МФУ, мониторы и всё необходимое</p>
        <a href="{% url 'shop:catalog' %}" class="btn btn-light btn-lg">Перейти в каталог</a>
    </div>

    <h2 class="fw-bold mb-4">Популярные товары</h2>
    <div class="row g-4">
        {% for product in popular_products %}
        <div class="col-md-6 col-lg-3">
            <div class="product-card">
                <div class="product-card-img">
                    {% if product.image %}<img src="{{ product.image.url }}" class="img-fluid">{% else %}<span style="font-size:4rem">📦</span>{% endif %}
                </div>
                <div class="product-card-body">
                    <h5 class="fw-semibold">{{ product.name }}</h5>
                    <div class="product-price text-primary mb-2">{{ product.get_price_display }}</div>
                    <button class="btn btn-primary w-100" onclick="addToCart({{ product.id }})">В корзину</button>
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
</div>
{% endblock %}
TEMPLATE_EOF

cat > templates/shop/catalog.html << 'TEMPLATE_EOF'
{% extends 'base.html' %}
{% block content %}
<div class="container py-5">
    <h1 class="fw-bold mb-4">Каталог оргтехники</h1>
    <div class="row g-4">
        {% for product in products %}
        <div class="col-md-6 col-lg-4">
            <div class="product-card">
                <div class="product-card-img">
                    {% if product.image %}<img src="{{ product.image.url }}" class="img-fluid">{% else %}<span style="font-size:4rem">📦</span>{% endif %}
                </div>
                <div class="product-card-body">
                    <h5 class="fw-semibold">{{ product.name }}</h5>
                    <div class="product-price text-primary mb-2">{{ product.get_price_display }}</div>
                    <button class="btn btn-primary w-100" onclick="addToCart({{ product.id }})">В корзину</button>
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
</div>
{% endblock %}
TEMPLATE_EOF

cat > templates/shop/product_detail.html << 'TEMPLATE_EOF'
{% extends 'base.html' %}
{% block content %}
<div class="container py-5">
    <div class="row">
        <div class="col-md-6">
            <div class="bg-light rounded-4 p-5 text-center">
                {% if product.image %}<img src="{{ product.image.url }}" class="img-fluid">{% else %}<span style="font-size:8rem">📦</span>{% endif %}
            </div>
        </div>
        <div class="col-md-6">
            <h1 class="fw-bold">{{ product.name }}</h1>
            <p class="text-muted">{{ product.description }}</p>
            <div class="fs-2 fw-bold text-primary mb-3">{{ product.get_price_display }}</div>
            <button class="btn btn-primary btn-lg w-100" onclick="addToCart({{ product.id }})">Добавить в корзину</button>
        </div>
    </div>
</div>
{% endblock %}
TEMPLATE_EOF

cat > templates/shop/category_detail.html << 'TEMPLATE_EOF'
{% extends 'base.html' %}
{% block content %}
<div class="container py-5">
    <h1 class="fw-bold mb-4">{{ category.name }}</h1>
    <div class="row g-4">
        {% for product in products %}
        <div class="col-md-6 col-lg-4">
            <div class="product-card">
                <div class="product-card-img">
                    {% if product.image %}<img src="{{ product.image.url }}" class="img-fluid">{% else %}<span style="font-size:4rem">📦</span>{% endif %}
                </div>
                <div class="product-card-body">
                    <h5 class="fw-semibold">{{ product.name }}</h5>
                    <div class="product-price text-primary mb-2">{{ product.get_price_display }}</div>
                    <button class="btn btn-primary w-100" onclick="addToCart({{ product.id }})">В корзину</button>
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
</div>
{% endblock %}
TEMPLATE_EOF

cat > templates/shop/about.html << 'TEMPLATE_EOF'
{% extends 'base.html' %}
{% block content %}
<div class="container py-5">
    <h1 class="fw-bold mb-4">О компании ОфисТех</h1>
    <p class="lead">Мы помогаем бизнесу работать эффективнее с 2010 года.</p>
</div>
{% endblock %}
TEMPLATE_EOF

cat > templates/shop/delivery.html << 'TEMPLATE_EOF'
{% extends 'base.html' %}
{% block content %}
<div class="container py-5">
    <h1 class="fw-bold mb-4">Доставка и оплата</h1>
    <p class="lead">Бесплатная доставка от 30 000 ₽</p>
</div>
{% endblock %}
TEMPLATE_EOF

cat > templates/shop/contacts.html << 'TEMPLATE_EOF'
{% extends 'base.html' %}
{% block content %}
<div class="container py-5">
    <h1 class="fw-bold mb-4">Контакты</h1>
    <p class="lead">📞 8 (800) 555-35-35</p>
    <p class="lead">📧 info@ofisteh.ru</p>
</div>
{% endblock %}
TEMPLATE_EOF

cat > templates/shop/checkout.html << 'TEMPLATE_EOF'
{% extends 'base.html' %}
{% block content %}
<div class="container py-5">
    <h1 class="fw-bold mb-4">Оформление заказа</h1>
    <form id="orderForm">
        {% csrf_token %}
        <div class="row g-3">
            <div class="col-md-6"><input type="text" class="form-control" name="first_name" placeholder="Имя" required></div>
            <div class="col-md-6"><input type="text" class="form-control" name="last_name" placeholder="Фамилия" required></div>
            <div class="col-md-6"><input type="email" class="form-control" name="email" placeholder="Email" required></div>
            <div class="col-md-6"><input type="tel" class="form-control" name="phone" placeholder="Телефон" required></div>
            <div class="col-12"><textarea class="form-control" name="address" placeholder="Адрес" required></textarea></div>
            <div class="col-12"><button type="submit" class="btn btn-success btn-lg w-100">Подтвердить заказ</button></div>
        </div>
    </form>
</div>
{% endblock %}
TEMPLATE_EOF

# ========== JAVASCRIPT ==========

cat > static/js/main.js << 'JS_EOF'
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

function addToCart(productId) {
    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('quantity', 1);

    fetch('/api/cart/add/', {
        method: 'POST',
        body: formData,
        headers: {'X-CSRFToken': csrftoken}
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Товар добавлен в корзину!');
            updateCartBadge(data.cart_total_items);
        }
    });
}

function updateCartBadge(count) {
    const badge = document.getElementById('cart-badge');
    if (badge) {
        if (count > 0) {
            badge.style.display = 'flex';
            badge.textContent = count;
        } else {
            badge.style.display = 'none';
        }
    }
}

function openCart() {
    alert('Корзина: ' + (document.getElementById('cart-badge')?.textContent || '0') + ' товаров');
}
JS_EOF

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║  ✅ ВСЕ ФАЙЛЫ СОЗДАНЫ УСПЕШНО!                        ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
echo "📦 Структура проекта:"
echo "  ├── manage.py"
echo "  ├── requirements.txt"
echo "  ├── ofisteh/ (настройки Django)"
echo "  ├── shop/ (приложение магазина)"
echo "  ├── templates/ (HTML шаблоны)"
echo "  └── static/js/ (JavaScript)"
echo ""
echo "🚀 Следующие шаги:"
echo "  1. python manage.py migrate"
echo "  2. python manage.py shell < populate_db.py"
echo "  3. python manage.py createsuperuser"
echo "  4. python manage.py runserver"
echo ""
echo "🌐 Откройте http://127.0.0.1:8000"
echo ""
