// ==========================================
// ОфисТех — Магазин оргтехники
// Ванильный JavaScript + Bootstrap + AJAX
// ==========================================

// ---- ДАННЫЕ ТОВАРОВ ----
const PRODUCTS = [
  {
    id: 1, name: 'HP LaserJet Pro M404dn', category: 'printers',
    price: 24990, oldPrice: 29990, image: '🖨️',
    description: 'Быстрый черно-белый лазерный принтер для офиса. Двусторонняя печать, скорость до 38 стр/мин.',
    specs: { 'Тип': 'Лазерный', 'Скорость': '38 стр/мин', 'Разрешение': '1200x1200 dpi', 'Двусторонняя печать': 'Да', 'Сеть': 'Ethernet, USB' },
    inStock: true, rating: 4.7, reviews: 124
  },
  {
    id: 2, name: 'Canon PIXMA G3420', category: 'printers',
    price: 18500, oldPrice: null, image: '🖨️',
    description: 'МФУ с СНПЧ для цветной печати. Экономичная печать до 7000 страниц на одном комплекте чернил.',
    specs: { 'Тип': 'Струйный', 'Скорость': '10 стр/мин', 'Разрешение': '4800x1200 dpi', 'СНПЧ': 'Да', 'Wi-Fi': 'Да' },
    inStock: true, rating: 4.5, reviews: 89
  },
  {
    id: 3, name: 'Samsung Xpress M2070W', category: 'printers',
    price: 12990, oldPrice: 15990, image: '🖨️',
    description: 'Компактный лазерный МФУ с Wi-Fi. Печать, сканирование, копирование в одном устройстве.',
    specs: { 'Тип': 'Лазерный', 'Скорость': '20 стр/мин', 'Разрешение': '1200x1200 dpi', 'Wi-Fi': 'Да', 'NFC': 'Да' },
    inStock: true, rating: 4.3, reviews: 67
  },
  {
    id: 4, name: 'Dell P2722H 27"', category: 'monitors',
    price: 32990, oldPrice: null, image: '🖥️',
    description: 'Профессиональный IPS монитор 27 дюймов Full HD. Регулировка по высоте, поворот, USB-хаб.',
    specs: { 'Диагональ': '27"', 'Разрешение': '1920x1080', 'Матрица': 'IPS', 'Частота': '60 Гц', 'Порты': 'HDMI, DP, USB' },
    inStock: true, rating: 4.8, reviews: 156
  },
  {
    id: 5, name: 'LG 34WP65C-B 34"', category: 'monitors',
    price: 45990, oldPrice: 52990, image: '🖥️',
    description: 'Ультраширокий изогнутый монитор 34 дюйма. Идеален для работы с документами и таблицами.',
    specs: { 'Диагональ': '34"', 'Разрешение': '3440x1440', 'Матрица': 'IPS', 'Частота': '160 Гц', 'Изогнутый': 'Да, 1800R' },
    inStock: true, rating: 4.9, reviews: 203
  },
  {
    id: 6, name: 'ASUS ProArt PA278CV 27"', category: 'monitors',
    price: 38500, oldPrice: null, image: '🖥️',
    description: 'Монитор для дизайнеров с калибровкой цвета. 100% sRGB, заводская калибровка Delta E < 2.',
    specs: { 'Диагональ': '27"', 'Разрешение': '2560x1440', 'Матрица': 'IPS', 'Цветовой охват': '100% sRGB', 'Калибровка': 'Delta E < 2' },
    inStock: false, rating: 4.6, reviews: 98
  },
  {
    id: 7, name: 'Fujitsu fi-8170', category: 'scanners',
    price: 89990, oldPrice: null, image: '📠',
    description: 'Профессиональный документ-сканер для больших объёмов. Скорость до 70 стр/мин.',
    specs: { 'Тип': 'Протяжной', 'Скорость': '70 стр/мин', 'Разрешение': '600 dpi', 'ADF': '100 листов', 'USB': '3.2' },
    inStock: true, rating: 4.4, reviews: 34
  },
  {
    id: 8, name: 'Epson Perfection V600', category: 'scanners',
    price: 21500, oldPrice: 25000, image: '📠',
    description: 'Планшетный сканер для фото и документов. Разрешение 6400 dpi, подсветка для слайдов.',
    specs: { 'Тип': 'Планшетный', 'Разрешение': '6400 dpi', 'Формат': 'A4', 'Слайд-модуль': 'Да', 'USB': '2.0' },
    inStock: true, rating: 4.2, reviews: 78
  },
  {
    id: 9, name: 'Epson EB-L200F', category: 'projectors',
    price: 78990, oldPrice: null, image: '📽️',
    description: 'Лазерный проектор для конференц-залов. Яркость 4000 люмен, Full HD, срок службы 30000 часов.',
    specs: { 'Тип': 'Лазерный', 'Яркость': '4000 лм', 'Разрешение': '1920x1080', 'Контраст': '2500000:1', 'Ресурс': '30000 ч' },
    inStock: true, rating: 4.7, reviews: 45
  },
  {
    id: 10, name: 'BenQ MW612', category: 'projectors',
    price: 42990, oldPrice: null, image: '📽️',
    description: 'DLP проектор для презентаций. Яркость 4200 люмен, встроенный динамик 10W.',
    specs: { 'Тип': 'DLP', 'Яркость': '4200 лм', 'Разрешение': '1280x800', 'Динамик': '10W', 'HDMI': '2x' },
    inStock: true, rating: 4.3, reviews: 56
  },
  {
    id: 11, name: 'HSM Securio B35', category: 'shredders',
    price: 35990, oldPrice: null, image: '📋',
    description: 'Офисный шредер 4-го уровня секретности. Уничтожает до 35 листов за раз, включая скобы.',
    specs: { 'Уровень': 'P-4 (4-й)', 'Производительность': '35 листов', 'Размер фрагментов': '1.9x15 мм', 'Объём корзины': '58 л', 'Шум': '< 56 дБ' },
    inStock: true, rating: 4.5, reviews: 42
  },
  {
    id: 12, name: 'Fellowes Powershred 99Ci', category: 'shredders',
    price: 15990, oldPrice: 19990, image: '📋',
    description: 'Персональный шредер для дома и малого офиса. Уничтожает кредитные карты и CD.',
    specs: { 'Уровень': 'P-4', 'Производительность': '12 листов', 'Размер фрагментов': '3.9x38 мм', 'Объём корзины': '23 л', 'Авто-стоп': 'Да' },
    inStock: true, rating: 4.1, reviews: 63
  },
  {
    id: 13, name: 'USB-хаб Belkin 7 портов', category: 'accessories',
    price: 3490, oldPrice: null, image: '🔌',
    description: 'USB 3.0 хаб с 7 портами и адаптером питания. Поддержка быстрой зарядки.',
    specs: { 'Порты': '7x USB 3.0', 'Скорость': '5 Гбит/с', 'Питание': 'Адаптер в комплекте', 'Кабель': '1.2 м', 'Совместимость': 'Win/Mac/Linux' },
    inStock: true, rating: 4.4, reviews: 187
  },
  {
    id: 14, name: 'ИБП APC Back-UPS 700VA', category: 'accessories',
    price: 7990, oldPrice: null, image: '🔌',
    description: 'Источник бесперебойного питания для ПК и оргтехники. Время работы до 15 минут.',
    specs: { 'Мощность': '700 ВА / 405 Вт', 'Тип': 'Line-Interactive', 'Розетки': '6 (с батареей)', 'Время переключения': '< 6 мс', 'Вес': '6.4 кг' },
    inStock: true, rating: 4.6, reviews: 234
  },
  {
    id: 15, name: 'Сетевой фильтр Pilot Pro', category: 'accessories',
    price: 2490, oldPrice: null, image: '🔌',
    description: 'Сетевой фильтр с 6 розетками и USB-зарядкой. Защита от перегрузок и импульсных помех.',
    specs: { 'Розетки': '6x Schuko', 'USB': '2x 2.4A', 'Кабель': '2 м', 'Макс. нагрузка': '2300 Вт', 'Защита': 'От перегрузок' },
    inStock: true, rating: 4.3, reviews: 156
  },
  {
    id: 16, name: 'Xerox B210', category: 'printers',
    price: 16990, oldPrice: null, image: '🖨️',
    description: 'Компактный лазерный принтер для дома и офиса. Wi-Fi, мобильная печать.',
    specs: { 'Тип': 'Лазерный', 'Скорость': '30 стр/мин', 'Разрешение': '1200x1200 dpi', 'Wi-Fi': 'Да', 'AirPrint': 'Да' },
    inStock: true, rating: 4.4, reviews: 91
  }
];

const CATEGORIES = [
  { id: 'all', name: 'Все товары', icon: '🖥️' },
  { id: 'printers', name: 'Принтеры и МФУ', icon: '🖨️' },
  { id: 'monitors', name: 'Мониторы', icon: '🖥️' },
  { id: 'scanners', name: 'Сканеры', icon: '📠' },
  { id: 'projectors', name: 'Проекторы', icon: '📽️' },
  { id: 'shredders', name: 'Шредеры', icon: '📋' },
  { id: 'accessories', name: 'Аксессуары', icon: '🔌' }
];

const CATEGORY_NAMES = {
  printers: 'Принтеры и МФУ',
  monitors: 'Мониторы',
  scanners: 'Сканеры',
  projectors: 'Проекторы',
  shredders: 'Шредеры',
  accessories: 'Аксессуары'
};

// ---- СОСТОЯНИЕ ПРИЛОЖЕНИЯ ----
let state = {
  currentPage: 'home',
  cart: [],
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'default',
  priceMin: 0,
  priceMax: 100000,
  products: [],
  loading: true
};

// ---- AJAX-ПОДОБНАЯ ЗАГРУЗКА ДАННЫХ ----
function ajaxFetch(url, options = {}) {
  return new Promise((resolve) => {
    // Имитация сетевой задержки (как настоящий AJAX запрос)
    const delay = 400 + Math.random() * 600;
    setTimeout(() => {
      console.log(`[AJAX] GET ${url} — ${delay.toFixed(0)}ms`);
      resolve({ ok: true, data: [...PRODUCTS] });
    }, delay);
  });
}

async function loadProducts() {
  state.loading = true;
  renderPage();
  
  const response = await ajaxFetch('/api/products');
  if (response.ok) {
    state.products = response.data;
    state.loading = false;
    renderPage();
  }
}

// ---- УТИЛИТЫ ----
function formatPrice(price) {
  return price.toLocaleString('ru-RU') + ' ₽';
}

function getDiscount(product) {
  if (!product.oldPrice) return 0;
  return Math.round((1 - product.price / product.oldPrice) * 100);
}

function renderStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.round(rating)) {
      html += '<i class="fas fa-star"></i>';
    } else {
      html += '<i class="far fa-star"></i>';
    }
  }
  return html;
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ---- КОРЗИНА ----
function addToCart(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product || !product.inStock) return;

  const existing = state.cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity++;
  } else {
    state.cart.push({ productId, quantity: 1 });
  }

  updateCartBadge();
  renderCartBody();
  showToast(`✅ "${product.name}" добавлен в корзину`);
}

function updateCartQuantity(productId, delta) {
  const item = state.cart.find(i => i.productId === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(i => i.productId !== productId);
  }

  updateCartBadge();
  renderCartBody();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.productId !== productId);
  updateCartBadge();
  renderCartBody();
}

function updateCartBadge() {
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('#cart-badge, #cart-badge-mobile');
  badges.forEach(badge => {
    if (count > 0) {
      badge.style.display = 'flex';
      badge.textContent = count;
    } else {
      badge.style.display = 'none';
    }
  });
  document.getElementById('cart-total-badge').textContent = count;
}

function renderCartBody() {
  const body = document.getElementById('cart-body');
  const footer = document.getElementById('cart-footer');

  if (state.cart.length === 0) {
    body.innerHTML = `
      <div class="text-center py-5">
        <i class="fas fa-shopping-bag" style="font-size:4rem;color:#cbd5e1"></i>
        <p class="text-muted mt-3 fs-5">Корзина пуста</p>
        <p class="text-muted small">Добавьте товары из каталога</p>
      </div>
    `;
    footer.style.display = 'none';
    return;
  }

  let total = 0;
  let html = '';

  state.cart.forEach(item => {
    const product = state.products.find(p => p.id === item.productId);
    if (!product) return;
    const itemTotal = product.price * item.quantity;
    total += itemTotal;

    html += `
      <div class="cart-item">
        <div class="cart-item-img">${product.image}</div>
        <div class="flex-grow-1">
          <div class="fw-semibold small text-truncate">${product.name}</div>
          <div class="text-primary fw-bold small">${formatPrice(itemTotal)}</div>
          <div class="d-flex align-items-center gap-2 mt-2">
            <button class="qty-btn" onclick="updateCartQuantity(${product.id}, -1)"><i class="fas fa-minus"></i></button>
            <span class="fw-medium small" style="width:20px;text-align:center">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQuantity(${product.id}, 1)"><i class="fas fa-plus"></i></button>
            <button class="btn btn-sm text-danger ms-auto p-0" onclick="removeFromCart(${product.id})" title="Удалить">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  body.innerHTML = html;
  footer.style.display = 'block';
  document.getElementById('cart-total').textContent = formatPrice(total);
}

function openCart() {
  renderCartBody();
  const offcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
  offcanvas.show();
}

function checkout() {
  showToast('🎉 Заказ оформлен! Мы свяжемся с вами в ближайшее время.');
  state.cart = [];
  updateCartBadge();
  renderCartBody();
  const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('cartOffcanvas'));
  if (offcanvas) offcanvas.hide();
}

// ---- МОДАЛЬНОЕ ОКНО ТОВАРА ----
function openProductModal(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const discount = getDiscount(product);
  const modalContent = document.getElementById('product-modal-content');

  let specsHtml = '';
  Object.entries(product.specs).forEach(([key, val]) => {
    specsHtml += `
      <div class="spec-row">
        <span class="spec-key">${key}</span>
        <span class="spec-val">${val}</span>
      </div>
    `;
  });

  modalContent.innerHTML = `
    <div class="modal-header border-0 pb-0">
      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
    </div>
    <div class="modal-body p-4 pt-0">
      <div class="row g-4">
        <div class="col-md-5">
          <div class="modal-product-img">
            <span>${product.image}</span>
          </div>
        </div>
        <div class="col-md-7">
          <span class="product-category">${CATEGORY_NAMES[product.category]}</span>
          <h3 class="fw-bold mb-2">${product.name}</h3>
          <div class="product-rating mb-3">
            <span class="stars">${renderStars(product.rating)}</span>
            <span class="count">${product.rating} · ${product.reviews} отзывов</span>
          </div>
          <p class="text-muted mb-3">${product.description}</p>
          <div class="d-flex align-items-end gap-2 mb-2">
            <span class="fs-3 fw-bold">${formatPrice(product.price)}</span>
            ${product.oldPrice ? `<span class="text-muted text-decoration-line-through">${formatPrice(product.oldPrice)}</span>` : ''}
          </div>
          <div class="mb-3">
            ${product.inStock
              ? '<span class="badge bg-success-subtle text-success"><i class="fas fa-circle me-1" style="font-size:0.5rem"></i> В наличии</span>'
              : '<span class="badge bg-danger-subtle text-danger"><i class="fas fa-circle me-1" style="font-size:0.5rem"></i> Нет в наличии</span>'
            }
          </div>
          <button class="btn btn-primary w-100 fw-bold py-2" onclick="addToCart(${product.id}); bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();" ${!product.inStock ? 'disabled' : ''}>
            <i class="fas fa-shopping-cart me-2"></i>Добавить в корзину
          </button>
        </div>
      </div>
      <hr class="my-4">
      <h5 class="fw-bold mb-3">Характеристики</h5>
      <div class="row g-2">
        <div class="col-sm-6">${specsHtml.split('</div>').slice(0, Math.ceil(specsHtml.split('</div>').length/2)).join('</div')}</div>
        <div class="col-sm-6">${specsHtml.split('</div>').slice(Math.ceil(specsHtml.split('</div>').length/2)).join('</div')}</div>
      </div>
    </div>
  `;

  const modal = new bootstrap.Modal(document.getElementById('productModal'));
  modal.show();
}

// ---- РЕНДЕР КАРТОЧКИ ТОВАРА ----
function renderProductCard(product) {
  const discount = getDiscount(product);
  return `
    <div class="col">
      <div class="product-card">
        <div class="product-card-img">
          <span class="emoji">${product.image}</span>
          ${discount > 0 ? `<span class="discount-badge">-${discount}%</span>` : ''}
          ${!product.inStock ? '<div class="out-of-stock-overlay"><span class="badge bg-dark">Нет в наличии</span></div>' : ''}
        </div>
        <div class="product-card-body">
          <div class="product-category">${CATEGORY_NAMES[product.category]}</div>
          <div class="product-name">${product.name}</div>
          <div class="product-rating">
            <span class="stars">${renderStars(product.rating)}</span>
            <span class="count">${product.rating} (${product.reviews})</span>
          </div>
          <div class="mt-auto">
            <div class="d-flex align-items-end mb-3">
              <span class="product-price">${formatPrice(product.price)}</span>
              ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-primary flex-grow-1 btn-sm fw-semibold" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                <i class="fas fa-shopping-cart me-1"></i> В корзину
              </button>
              <button class="btn btn-outline-secondary btn-sm" onclick="openProductModal(${product.id})" title="Подробнее">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ---- СКЕЛЕТОН ЗАГРУЗКИ ----
function renderSkeleton(count = 4) {
  let html = '<div class="row g-4">';
  for (let i = 0; i < count; i++) {
    html += `
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="product-card">
          <div class="skeleton" style="height:180px"></div>
          <div class="p-3">
            <div class="skeleton mb-2" style="height:12px;width:60%"></div>
            <div class="skeleton mb-2" style="height:16px;width:80%"></div>
            <div class="skeleton mb-3" style="height:12px;width:40%"></div>
            <div class="skeleton mb-2" style="height:24px;width:50%"></div>
            <div class="skeleton" style="height:38px;width:100%"></div>
          </div>
        </div>
      </div>
    `;
  }
  html += '</div>';
  return html;
}

// ---- НАВИГАЦИЯ ----
function navigateTo(page) {
  state.currentPage = page;
  
  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === page) link.classList.add('active');
  });

  // Close mobile menu
  const navCollapse = document.getElementById('navMenu');
  if (navCollapse.classList.contains('show')) {
    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
    if (bsCollapse) bsCollapse.hide();
  }

  renderPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- РЕНДЕР СТРАНИЦ ----
function renderPage() {
  const app = document.getElementById('app');
  
  switch (state.currentPage) {
    case 'home':
      app.innerHTML = renderHomePage();
      break;
    case 'catalog':
      app.innerHTML = renderCatalogPage();
      break;
    case 'about':
      app.innerHTML = renderAboutPage();
      break;
    case 'delivery':
      app.innerHTML = renderDeliveryPage();
      break;
    case 'contacts':
      app.innerHTML = renderContactsPage();
      break;
    default:
      app.innerHTML = renderHomePage();
  }

  app.querySelector('.page-content')?.classList.add('page-content');
}

// ---- ГЛАВНАЯ СТРАНИЦА ----
function renderHomePage() {
  const popularProducts = state.products.filter(p => p.rating >= 4.5).slice(0, 4);
  const saleProducts = state.products.filter(p => p.oldPrice).slice(0, 4);

  return `
    <div class="page-content">
      <!-- Hero -->
      <section class="hero-section">
        <div class="container position-relative" style="z-index:1">
          <div class="row">
            <div class="col-lg-7">
              <div class="hero-badge">
                <i class="fas fa-chart-line"></i> Скидки до 30% на офисную технику
              </div>
              <h1 class="hero-title">Оргтехника для <span>вашего офиса</span></h1>
              <p class="hero-text">Принтеры, МФУ, мониторы, сканеры и всё необходимое для эффективной работы. Доставка по всей России.</p>
              <div class="d-flex flex-wrap gap-3">
                <button class="btn btn-light btn-lg fw-bold px-4" onclick="navigateTo('catalog')">
                  Перейти в каталог <i class="fas fa-arrow-right ms-2"></i>
                </button>
                <button class="btn btn-outline-light btn-lg px-4" onclick="navigateTo('about')">
                  О компании
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="bg-white border-bottom">
        <div class="container py-3">
          <div class="row g-2">
            <div class="col-6 col-md-3">
              <div class="feature-item">
                <div class="feature-icon"><i class="fas fa-truck"></i></div>
                <div><div class="fw-semibold small">Бесплатная доставка</div><div class="text-muted" style="font-size:0.75rem">От 30 000 ₽</div></div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="feature-item">
                <div class="feature-icon"><i class="fas fa-shield-alt"></i></div>
                <div><div class="fw-semibold small">Гарантия</div><div class="text-muted" style="font-size:0.75rem">До 3 лет</div></div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="feature-item">
                <div class="feature-icon"><i class="fas fa-headset"></i></div>
                <div><div class="fw-semibold small">Поддержка</div><div class="text-muted" style="font-size:0.75rem">24/7 онлайн</div></div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="feature-item">
                <div class="feature-icon"><i class="fas fa-credit-card"></i></div>
                <div><div class="fw-semibold small">Оплата</div><div class="text-muted" style="font-size:0.75rem">Любым способом</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Popular Products -->
      <section class="container py-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 class="fw-bold mb-1">Популярные товары</h2>
            <p class="text-muted mb-0">Лучшие предложения по отзывам покупателей</p>
          </div>
          <button class="btn btn-outline-primary d-none d-md-inline-flex align-items-center gap-1" onclick="navigateTo('catalog')">
            Все товары <i class="fas fa-arrow-right"></i>
          </button>
        </div>
        ${state.loading ? renderSkeleton(4) : `
          <div class="row g-4">
            ${popularProducts.map(p => renderProductCard(p)).join('')}
          </div>
        `}
      </section>

      <!-- Sale Banner -->
      <section class="container pb-4">
        <div class="sale-banner">
          <div class="row align-items-center">
            <div class="col-md-8">
              <h2 class="fw-bold mb-1">🔥 Распродажа оргтехники!</h2>
              <p class="mb-0 opacity-75">Скидки до 30% на избранные товары. Успейте купить!</p>
            </div>
            <div class="col-md-4 text-md-end mt-3 mt-md-0">
              <button class="btn btn-light fw-bold px-4" onclick="navigateTo('catalog')">Смотреть акции</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Sale Products -->
      <section class="container py-5">
        <div class="mb-4">
          <h2 class="fw-bold mb-1">🔥 Товары со скидкой</h2>
          <p class="text-muted mb-0">Специальные предложения этой недели</p>
        </div>
        ${state.loading ? renderSkeleton(4) : `
          <div class="row g-4">
            ${saleProducts.map(p => renderProductCard(p)).join('')}
          </div>
        `}
      </section>

      <!-- Reviews -->
      <section class="bg-light py-5">
        <div class="container">
          <h2 class="fw-bold text-center mb-5">Отзывы наших клиентов</h2>
          <div class="row g-4">
            <div class="col-md-4">
              <div class="review-card">
                <div class="text-warning mb-2">${renderStars(5)}</div>
                <p class="text-muted fst-italic mb-3">"Отличный магазин! Заказывали принтеры для офиса — доставили на следующий день. Качество на высоте!"</p>
                <div class="fw-semibold">Алексей К.</div>
                <small class="text-muted">Директор ООО "Прогресс"</small>
              </div>
            </div>
            <div class="col-md-4">
              <div class="review-card">
                <div class="text-warning mb-2">${renderStars(5)}</div>
                <p class="text-muted fst-italic mb-3">"Покупаем здесь технику уже 3 года. Всегда хорошие цены, быстрая доставка и отличная поддержка."</p>
                <div class="fw-semibold">Мария С.</div>
                <small class="text-muted">Офис-менеджер</small>
              </div>
            </div>
            <div class="col-md-4">
              <div class="review-card">
                <div class="text-warning mb-2">${renderStars(4)}</div>
                <p class="text-muted fst-italic mb-3">"Широкий ассортимент и профессиональные консультанты. Помогли подобрать оборудование под наши задачи."</p>
                <div class="fw-semibold">Дмитрий В.</div>
                <small class="text-muted">IT-специалист</small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

// ---- КАТАЛОГ ----
function renderCatalogPage() {
  let filtered = state.products.filter(p => {
    const matchCategory = state.selectedCategory === 'all' || p.category === state.selectedCategory;
    const matchSearch = !state.searchQuery || 
      p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(state.searchQuery.toLowerCase());
    const matchPrice = p.price >= state.priceMin && p.price <= state.priceMax;
    return matchCategory && matchSearch && matchPrice;
  });

  // Sort
  switch (state.sortBy) {
    case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
    case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
    case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
    case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
  }

  const countText = filtered.length === 1 ? 'товар' : 
    (filtered.length >= 2 && filtered.length <= 4) ? 'товара' : 'товаров';

  let categoriesHtml = CATEGORIES.map(cat => `
    <button class="filter-btn ${state.selectedCategory === cat.id ? 'active' : ''}" onclick="setCategory('${cat.id}')">
      ${cat.icon} ${cat.name}
    </button>
  `).join('');

  let productsHtml = '';
  if (state.loading) {
    productsHtml = renderSkeleton(8);
  } else if (filtered.length === 0) {
    productsHtml = `
      <div class="text-center py-5 bg-white rounded-4 shadow-sm">
        <div style="font-size:3rem" class="mb-3">🔍</div>
        <h4 class="fw-bold">Ничего не найдено</h4>
        <p class="text-muted">Попробуйте изменить параметры поиска или фильтры</p>
      </div>
    `;
  } else {
    productsHtml = `
      <div class="row g-4">
        ${filtered.map(p => renderProductCard(p)).join('')}
      </div>
    `;
  }

  return `
    <div class="page-content">
      <div class="container py-4">
        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb" class="mb-3">
          <ol class="breadcrumb small">
            <li class="breadcrumb-item"><a href="#" onclick="navigateTo('home')" class="text-decoration-none">Главная</a></li>
            <li class="breadcrumb-item active">Каталог</li>
            ${state.searchQuery ? `<li class="breadcrumb-item active text-primary">Поиск: "${state.searchQuery}"</li>` : ''}
          </ol>
        </nav>

        <h1 class="fw-bold mb-1">Каталог оргтехники</h1>
        <p class="text-muted mb-4">${filtered.length} ${countText}${state.searchQuery ? ` по запросу "${state.searchQuery}"` : ''}</p>

        <div class="row g-4">
          <!-- Sidebar -->
          <div class="col-lg-3">
            <div class="filter-card">
              <h5 class="fw-bold mb-3"><i class="fas fa-sliders-h me-2"></i>Фильтры</h5>
              
              <h6 class="small fw-semibold text-muted text-uppercase mb-2">Категории</h6>
              <div class="mb-4">
                ${categoriesHtml}
              </div>

              <h6 class="small fw-semibold text-muted text-uppercase mb-2">Цена, ₽</h6>
              <div class="d-flex gap-2 mb-3">
                <input type="number" class="form-control form-control-sm" placeholder="От" value="${state.priceMin || ''}" onchange="setPriceMin(this.value)">
                <input type="number" class="form-control form-control-sm" placeholder="До" value="${state.priceMax === 100000 ? '' : state.priceMax}" onchange="setPriceMax(this.value)">
              </div>

              <button class="btn btn-outline-primary btn-sm w-100" onclick="resetFilters()">
                <i class="fas fa-redo me-1"></i> Сбросить фильтры
              </button>
            </div>
          </div>

          <!-- Products -->
          <div class="col-lg-9">
            <!-- Toolbar -->
            <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4 bg-white rounded-3 shadow-sm border p-3">
              <select class="form-select form-select-sm" style="width:auto" onchange="setSortBy(this.value)">
                <option value="default" ${state.sortBy === 'default' ? 'selected' : ''}>По умолчанию</option>
                <option value="price-asc" ${state.sortBy === 'price-asc' ? 'selected' : ''}>Сначала дешевле</option>
                <option value="price-desc" ${state.sortBy === 'price-desc' ? 'selected' : ''}>Сначала дороже</option>
                <option value="rating" ${state.sortBy === 'rating' ? 'selected' : ''}>По рейтингу</option>
                <option value="name" ${state.sortBy === 'name' ? 'selected' : ''}>По названию</option>
              </select>
            </div>

            ${productsHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ---- СТРАНИЦА "О КОМПАНИИ" ----
function renderAboutPage() {
  return `
    <div class="page-content">
      <div class="container py-5">
        <h1 class="fw-bold mb-5">О компании ОфисТех</h1>

        <div class="row g-4 mb-5">
          <div class="col-md-6">
            <div class="bg-gradient p-4 rounded-4 h-100" style="background:linear-gradient(135deg,#eff6ff,#e0e7ff)">
              <h3 class="fw-bold mb-3">Наша миссия</h3>
              <p class="text-muted">Мы помогаем бизнесу работать эффективнее, предоставляя качественную оргтехнику от ведущих мировых производителей. С 2010 года мы оснащаем офисы по всей России — от малых предприятий до крупных корпораций.</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="bg-gradient p-4 rounded-4 h-100" style="background:linear-gradient(135deg,#ecfdf5,#d1fae5)">
              <h3 class="fw-bold mb-3">Наши преимущества</h3>
              <ul class="text-muted list-unstyled mb-0">
                <li class="mb-2">✅ Более 10 000 довольных клиентов</li>
                <li class="mb-2">✅ Прямые поставки от производителей</li>
                <li class="mb-2">✅ Собственный сервисный центр</li>
                <li class="mb-2">✅ Гарантия до 3 лет на всю технику</li>
                <li>✅ Бесплатная консультация специалиста</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="row g-3 mb-5">
          <div class="col-6 col-md-3">
            <div class="bg-white rounded-4 shadow-sm border text-center p-4">
              <i class="fas fa-building fs-1 text-primary mb-2"></i>
              <div class="fs-3 fw-bold">15+</div>
              <small class="text-muted">Лет на рынке</small>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="bg-white rounded-4 shadow-sm border text-center p-4">
              <i class="fas fa-users fs-1 text-primary mb-2"></i>
              <div class="fs-3 fw-bold">10 000+</div>
              <small class="text-muted">Клиентов</small>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="bg-white rounded-4 shadow-sm border text-center p-4">
              <i class="fas fa-award fs-1 text-primary mb-2"></i>
              <div class="fs-3 fw-bold">50+</div>
              <small class="text-muted">Брендов</small>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="bg-white rounded-4 shadow-sm border text-center p-4">
              <i class="fas fa-bullseye fs-1 text-primary mb-2"></i>
              <div class="fs-3 fw-bold">99%</div>
              <small class="text-muted">Довольных клиентов</small>
            </div>
          </div>
        </div>

        <!-- Team -->
        <h2 class="fw-bold mb-4">Наша команда</h2>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="bg-white rounded-4 shadow-sm border text-center p-4">
              <div style="font-size:3rem" class="mb-2">👨‍💼</div>
              <h5 class="fw-bold mb-1">Иван Петров</h5>
              <p class="text-muted small mb-0">Генеральный директор</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="bg-white rounded-4 shadow-sm border text-center p-4">
              <div style="font-size:3rem" class="mb-2">👩‍💼</div>
              <h5 class="fw-bold mb-1">Анна Сидорова</h5>
              <p class="text-muted small mb-0">Руководитель отдела продаж</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="bg-white rounded-4 shadow-sm border text-center p-4">
              <div style="font-size:3rem" class="mb-2">👨‍🔧</div>
              <h5 class="fw-bold mb-1">Сергей Козлов</h5>
              <p class="text-muted small mb-0">Главный инженер</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ---- СТРАНИЦА "ДОСТАВКА" ----
function renderDeliveryPage() {
  return `
    <div class="page-content">
      <div class="container py-5">
        <h1 class="fw-bold mb-5">Доставка и оплата</h1>

        <div class="row g-4 mb-5">
          <div class="col-md-6">
            <div class="bg-white rounded-4 shadow-sm border p-4 h-100">
              <div class="d-flex align-items-center gap-3 mb-3">
                <div class="bg-primary bg-opacity-10 p-3 rounded-3">
                  <i class="fas fa-truck text-primary fs-4"></i>
                </div>
                <h4 class="fw-bold mb-0">Доставка по Москве</h4>
              </div>
              <ul class="list-unstyled mb-0">
                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Курьерская доставка — <strong>от 500 ₽</strong></li>
                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Бесплатно при заказе от 30 000 ₽</li>
                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Срок: 1-2 рабочих дня</li>
                <li><i class="fas fa-check-circle text-success me-2"></i>Доставка в день заказа (до 12:00)</li>
              </ul>
            </div>
          </div>
          <div class="col-md-6">
            <div class="bg-white rounded-4 shadow-sm border p-4 h-100">
              <div class="d-flex align-items-center gap-3 mb-3">
                <div class="bg-success bg-opacity-10 p-3 rounded-3">
                  <i class="fas fa-box text-success fs-4"></i>
                </div>
                <h4 class="fw-bold mb-0">Доставка по России</h4>
              </div>
              <ul class="list-unstyled mb-0">
                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Транспортные компании — <strong>от 300 ₽</strong></li>
                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>СДЭК, Boxberry, Почта России</li>
                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Срок: 3-10 рабочих дней</li>
                <li><i class="fas fa-check-circle text-success me-2"></i>Отслеживание посылки онлайн</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Payment -->
        <h2 class="fw-bold mb-4">Способы оплаты</h2>
        <div class="row g-3 mb-5">
          <div class="col-md-4">
            <div class="bg-white rounded-4 shadow-sm border text-center p-4">
              <i class="fas fa-credit-card text-primary fs-1 mb-3"></i>
              <h5 class="fw-bold">Банковская карта</h5>
              <p class="text-muted small mb-0">Visa, MasterCard, МИР</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="bg-white rounded-4 shadow-sm border text-center p-4">
              <i class="fas fa-money-bill-wave text-primary fs-1 mb-3"></i>
              <h5 class="fw-bold">Наличные</h5>
              <p class="text-muted small mb-0">При получении курьеру</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="bg-white rounded-4 shadow-sm border text-center p-4">
              <i class="fas fa-file-invoice text-primary fs-1 mb-3"></i>
              <h5 class="fw-bold">Безналичный расчёт</h5>
              <p class="text-muted small mb-0">Для юридических лиц</p>
            </div>
          </div>
        </div>

        <!-- FAQ -->
        <h2 class="fw-bold mb-4">Часто задаваемые вопросы</h2>
        <div class="accordion" id="faqAccordion">
          <div class="accordion-item border rounded-3 mb-2 overflow-hidden">
            <h2 class="accordion-header">
              <button class="accordion-button fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                Можно ли забрать заказ самостоятельно?
              </button>
            </h2>
            <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
              <div class="accordion-body text-muted">Да, вы можете забрать заказ из нашего офиса по адресу: Москва, ул. Офисная, 42. Пн-Пт с 9:00 до 18:00.</div>
            </div>
          </div>
          <div class="accordion-item border rounded-3 mb-2 overflow-hidden">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                Как отследить заказ?
              </button>
            </h2>
            <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div class="accordion-body text-muted">После отправки заказа вы получите SMS и email с трек-номером для отслеживания.</div>
            </div>
          </div>
          <div class="accordion-item border rounded-3 mb-2 overflow-hidden">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                Возможна ли доставка в выходные?
              </button>
            </h2>
            <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div class="accordion-body text-muted">Да, доставка в выходные дни возможна по предварительной договорённости. Стоимость — от 800 ₽.</div>
            </div>
          </div>
          <div class="accordion-item border rounded-3 mb-2 overflow-hidden">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                Есть ли подъём на этаж?
              </button>
            </h2>
            <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div class="accordion-body text-muted">Да, подъём крупногабаритных товаров осуществляется за дополнительную плату — от 200 ₽ за этаж.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ---- СТРАНИЦА "КОНТАКТЫ" ----
function renderContactsPage() {
  return `
    <div class="page-content">
      <div class="container py-5">
        <h1 class="fw-bold mb-5">Контакты</h1>

        <div class="row g-4">
          <div class="col-md-6">
            <h3 class="fw-bold mb-4">Свяжитесь с нами</h3>
            <div class="d-flex flex-column gap-3 mb-4">
              <div class="d-flex align-items-start gap-3 bg-white rounded-3 shadow-sm border p-3">
                <div class="bg-primary bg-opacity-10 p-2 rounded-2"><i class="fas fa-phone-alt text-primary"></i></div>
                <div>
                  <small class="text-muted">Телефон</small>
                  <div class="fw-bold">8 (800) 555-35-35</div>
                  <small class="text-muted">Бесплатно по России</small>
                </div>
              </div>
              <div class="d-flex align-items-start gap-3 bg-white rounded-3 shadow-sm border p-3">
                <div class="bg-primary bg-opacity-10 p-2 rounded-2"><i class="fas fa-envelope text-primary"></i></div>
                <div>
                  <small class="text-muted">Email</small>
                  <div class="fw-bold">info@ofisteh.ru</div>
                  <small class="text-muted">Ответим в течение часа</small>
                </div>
              </div>
              <div class="d-flex align-items-start gap-3 bg-white rounded-3 shadow-sm border p-3">
                <div class="bg-primary bg-opacity-10 p-2 rounded-2"><i class="fas fa-map-marker-alt text-primary"></i></div>
                <div>
                  <small class="text-muted">Адрес</small>
                  <div class="fw-bold">Москва, ул. Офисная, 42</div>
                  <small class="text-muted">Метро Технопарк, 5 мин</small>
                </div>
              </div>
              <div class="d-flex align-items-start gap-3 bg-white rounded-3 shadow-sm border p-3">
                <div class="bg-primary bg-opacity-10 p-2 rounded-2"><i class="fas fa-clock text-primary"></i></div>
                <div>
                  <small class="text-muted">Режим работы</small>
                  <div class="fw-bold">Пн-Пт: 9:00-18:00</div>
                  <small class="text-muted">Сб-Вс: выходной</small>
                </div>
              </div>
            </div>

            <!-- Map placeholder -->
            <div class="rounded-4 d-flex align-items-center justify-content-center text-center" style="height:200px;background:linear-gradient(135deg,#dbeafe,#bfdbfe)">
              <div>
                <i class="fas fa-map-marker-alt text-primary fs-1 mb-2 d-block"></i>
                <div class="fw-bold text-primary">Москва, ул. Офисная, 42</div>
                <small class="text-primary opacity-75">Метро Технопарк</small>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <h3 class="fw-bold mb-4">Напишите нам</h3>
            <div class="bg-white rounded-4 shadow-sm border p-4">
              <form id="contactForm" onsubmit="handleContactSubmit(event)">
                <div class="mb-3">
                  <label class="form-label small fw-medium">Ваше имя</label>
                  <input type="text" class="form-control" placeholder="Иван Иванов" required>
                </div>
                <div class="mb-3">
                  <label class="form-label small fw-medium">Email</label>
                  <input type="email" class="form-control" placeholder="ivan@example.com" required>
                </div>
                <div class="mb-3">
                  <label class="form-label small fw-medium">Телефон</label>
                  <input type="tel" class="form-control" placeholder="+7 (999) 123-45-67">
                </div>
                <div class="mb-3">
                  <label class="form-label small fw-medium">Сообщение</label>
                  <textarea class="form-control" rows="4" placeholder="Ваш вопрос или пожелание..." required></textarea>
                </div>
                <div id="contactSuccess" class="alert alert-success d-none mb-3">
                  <i class="fas fa-check-circle me-2"></i>Сообщение отправлено! Мы свяжемся с вами в ближайшее время.
                </div>
                <button type="submit" class="btn btn-primary w-100 fw-bold py-2">
                  <i class="fas fa-paper-plane me-2"></i>Отправить сообщение
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ---- ОБРАБОТЧИКИ СОБЫТИЙ ----
function setCategory(catId) {
  state.selectedCategory = catId;
  renderPage();
}

function setSortBy(value) {
  state.sortBy = value;
  renderPage();
}

function setPriceMin(value) {
  state.priceMin = Number(value) || 0;
  renderPage();
}

function setPriceMax(value) {
  state.priceMax = Number(value) || 100000;
  renderPage();
}

function resetFilters() {
  state.selectedCategory = 'all';
  state.sortBy = 'default';
  state.priceMin = 0;
  state.priceMax = 100000;
  state.searchQuery = '';
  document.getElementById('searchInput').value = '';
  renderPage();
}

function handleSearchKeyup(event) {
  if (event.key === 'Enter') {
    state.searchQuery = document.getElementById('searchInput').value;
    state.currentPage = 'catalog';
    renderPage();
  }
}

function handleContactSubmit(event) {
  event.preventDefault();
  const successEl = document.getElementById('contactSuccess');
  successEl.classList.remove('d-none');
  event.target.reset();
  setTimeout(() => successEl.classList.add('d-none'), 4000);
}

// ---- ИНИЦИАЛИЗАЦИЯ ----
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});

// Делаем функции глобальными для onclick handlers
window.navigateTo = navigateTo;
window.addToCart = addToCart;
window.openProductModal = openProductModal;
window.openCart = openCart;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.checkout = checkout;
window.setCategory = setCategory;
window.setSortBy = setSortBy;
window.setPriceMin = setPriceMin;
window.setPriceMax = setPriceMax;
window.resetFilters = resetFilters;
window.handleSearchKeyup = handleSearchKeyup;
window.handleContactSubmit = handleContactSubmit;
