#!/bin/bash

echo "╔══════════════════════════════════════════════════════════╗"
echo "║  🚀 Установка Django проекта ОфисТех                   ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Создание структуры папок
echo "📁 Создание структуры проекта..."
mkdir -p ofisteh
mkdir -p shop
mkdir -p templates/shop
mkdir -p static/js
mkdir -p media/products
mkdir -p media/categories

# ofisteh/__init__.py
echo "📝 Создание ofisteh/__init__.py..."
cat > ofisteh/__init__.py << 'EOF'
# ofisteh project
EOF

# ofisteh/settings.py
echo "📝 Создание ofisteh/settings.py..."
cat > ofisteh/settings.py << 'EOF'
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-change-this-in-production-ofisteh-2024'

DEBUG = True

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'shop',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'ofisteh.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'shop.context_processors.cart_processor',
                'shop.context_processors.categories_processor',
            ],
        },
    },
]

WSGI_APPLICATION = 'ofisteh.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

LANGUAGE_CODE = 'ru-ru'
TIME_ZONE = 'Europe/Moscow'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CART_SESSION_ID = 'cart'
EOF

# ofisteh/urls.py
echo "📝 Создание ofisteh/urls.py..."
cat > ofisteh/urls.py << 'EOF'
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('shop.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
EOF

# ofisteh/wsgi.py
echo "📝 Создание ofisteh/wsgi.py..."
cat > ofisteh/wsgi.py << 'EOF'
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ofisteh.settings')
application = get_wsgi_application()
EOF

# shop/__init__.py
echo "📝 Создание shop/__init__.py..."
cat > shop/__init__.py << 'EOF'
# shop application
EOF

# shop/apps.py
echo "📝 Создание shop/apps.py..."
cat > shop/apps.py << 'EOF'
from django.apps import AppConfig

class ShopConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'shop'
    verbose_name = 'Магазин оргтехники'
EOF

# shop/models.py
echo "📝 Создание shop/models.py..."
cat > shop/models.py << 'EOF'
from django.db import models
from django.urls import reverse

class Category(models.Model):
    name = models.CharField('Название', max_length=200)
    slug = models.SlugField('Слаг', max_length=200, unique=True)
    icon = models.CharField('Иконка (emoji)', max_length=10, default='📦')
    description = models.TextField('Описание', blank=True)
    image = models.ImageField('Изображение', upload_to='categories/', blank=True, null=True)
    is_active = models.BooleanField('Активна', default=True)
    order = models.PositiveIntegerField('Порядок', default=0)

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        ordering = ['order', 'name']

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('shop:category_detail', kwargs={'category_slug': self.slug})

class Product(models.Model):
    name = models.CharField('Название', max_length=300)
    slug = models.SlugField('Слаг', max_length=300, unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products', verbose_name='Категория')
    description = models.TextField('Описание')
    price = models.DecimalField('Цена', max_digits=10, decimal_places=2)
    old_price = models.DecimalField('Старая цена', max_digits=10, decimal_places=2, blank=True, null=True)
    image = models.ImageField('Изображение', upload_to='products/', blank=True, null=True)
    in_stock = models.BooleanField('В наличии', default=True)
    is_available = models.BooleanField('Доступен', default=True)
    created_at = models.DateTimeField('Создан', auto_now_add=True)
    updated_at = models.DateTimeField('Обновлён', auto_now=True)

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
        ordering = ['-created_at']
        indexes = [models.Index(fields=['slug']), models.Index(fields=['name'])]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('shop:product_detail', kwargs={'product_slug': self.slug})

    def get_discount_percentage(self):
        if self.old_price and self.old_price > self.price:
            return int((1 - self.price / self.old_price) * 100)
        return 0

    def get_price_display(self):
        return f"{int(self.price):,} ₽".replace(',', ' ')

class ProductSpec(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='specs', verbose_name='Товар')
    name = models.CharField('Название', max_length=200)
    value = models.CharField('Значение', max_length=300)

    class Meta:
        verbose_name = 'Характеристика'
        verbose_name_plural = 'Характеристики'

    def __str__(self):
        return f"{self.name}: {self.value}"

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews', verbose_name='Товар')
    author_name = models.CharField('Имя автора', max_length=100)
    author_role = models.CharField('Должность/компания', max_length=200, blank=True)
    rating = models.PositiveSmallIntegerField('Рейтинг', default=5)
    text = models.TextField('Текст отзыва')
    is_active = models.BooleanField('Опубликован', default=True)
    created_at = models.DateTimeField('Создан', auto_now_add=True)

    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.author_name} - {self.product.name}"

class Order(models.Model):
    STATUS_CHOICES = [
        ('new', 'Новый'),
        ('processing', 'В обработке'),
        ('shipped', 'Отправлен'),
        ('delivered', 'Доставлен'),
        ('cancelled', 'Отменён'),
    ]

    first_name = models.CharField('Имя', max_length=100)
    last_name = models.CharField('Фамилия', max_length=100)
    email = models.EmailField('Email')
    phone = models.CharField('Телефон', max_length=20)
    address = models.TextField('Адрес доставки')
    city = models.CharField('Город', max_length=100)
    postal_code = models.CharField('Почтовый индекс', max_length=20)
    comment = models.TextField('Комментарий', blank=True)
    created_at = models.DateTimeField('Создан', auto_now_add=True)
    updated_at = models.DateTimeField('Обновлён', auto_now=True)
    status = models.CharField('Статус', max_length=20, choices=STATUS_CHOICES, default='new')

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
        ordering = ['-created_at']

    def __str__(self):
        return f"Заказ #{self.id} - {self.first_name} {self.last_name}"

    def get_total_cost(self):
        return sum(item.get_cost() for item in self.items.all())

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items', verbose_name='Заказ')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, related_name='order_items', verbose_name='Товар')
    price = models.DecimalField('Цена', max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField('Количество', default=1)

    class Meta:
        verbose_name = 'Позиция заказа'
        verbose_name_plural = 'Позиции заказа'

    def __str__(self):
        return str(self.id)

    def get_cost(self):
        return self.price * self.quantity
EOF

echo "✅ Основные файлы Django созданы!"
echo ""
echo "Теперь выполните следующие команды:"
echo "  1. python manage.py migrate"
echo "  2. python manage.py shell < populate_db.py"
echo "  3. python manage.py createsuperuser"
echo "  4. python manage.py runserver"
echo ""
echo "🌐 Откройте http://127.0.0.1:8000"
