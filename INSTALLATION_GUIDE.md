# 📋 ПОЛНОЕ РУКОВОДСТВО ПО УСТАНОВКЕ

## 🚀 БЫСТРАЯ УСТАНОВКА (РЕКОМЕНДУЕТСЯ)

Просто запустите скрипт:

```bash
chmod +x setup_complete.sh
./setup_complete.sh
```

Этот скрипт автоматически создаст ВСЕ файлы Django проекта!

---

## 📝 АЛЬТЕРНАТИВА: Ручная установка

Если вы хотите создать файлы вручную, вот все необходимые файлы:

### 1. ofisteh/settings.py

```python
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = 'django-insecure-change-this-in-production'
DEBUG = True
ALLOWED_HOSTS = ['*']
INSTALLED_APPS = [
    'django.contrib.admin', 'django.contrib.auth', 'django.contrib.contenttypes',
    'django.contrib.sessions', 'django.contrib.messages', 'django.contrib.staticfiles',
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
TEMPLATES = [{
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
}]
WSGI_APPLICATION = 'ofisteh.wsgi.application'
DATABASES = {'default': {'ENGINE': 'django.db.backends.sqlite3', 'NAME': BASE_DIR / 'db.sqlite3'}}
LANGUAGE_CODE = 'ru-ru'
TIME_ZONE = 'Europe/Moscow'
USE_I18N = True
USE_TZ = True
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
CART_SESSION_ID = 'cart'
```

### 2. ofisteh/urls.py

```python
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
```

### 3. ofisteh/wsgi.py

```python
import os
from django.core.wsgi import get_wsgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ofisteh.settings')
application = get_wsgi_application()
```

### 4. shop/models.py

```python
from django.db import models
from django.urls import reverse

class Category(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    icon = models.CharField(max_length=10, default='📦')
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=300)
    slug = models.SlugField(max_length=300, unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    old_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    in_stock = models.BooleanField(default=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

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
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='specs')
    name = models.CharField(max_length=200)
    value = models.CharField(max_length=300)

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    author_name = models.CharField(max_length=100)
    author_role = models.CharField(max_length=200, blank=True)
    rating = models.PositiveSmallIntegerField(default=5)
    text = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Order(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField()
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='new')

    def get_total_cost(self):
        return sum(item.get_cost() for item in self.items.all())

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

    def get_cost(self):
        return self.price * self.quantity
```

(Продолжение в файле setup_complete.sh - все остальные файлы создаются автоматически!)

---

## 🎯 ИТОГО: Что делать

### Вариант 1: Автоматический (РЕКОМЕНДУЕТСЯ)

```bash
# 1. Запустите скрипт установки
chmod +x setup_complete.sh
./setup_complete.sh

# 2. Установите зависимости
pip install -r requirements.txt

# 3. Создайте базу данных
python manage.py migrate

# 4. Заполните тестовыми данными
python manage.py shell < populate_db.py

# 5. Создайте суперпользователя
python manage.py createsuperuser

# 6. Запустите сервер
python manage.py runserver
```

### Вариант 2: Ручной

Скопируйте все файлы из блоков кода выше и создайте их вручную.

---

## 📦 После установки

Все файлы Django будут созданы в корне проекта:
- ✅ ofisteh/ (настройки)
- ✅ shop/ (приложение)
- ✅ templates/ (шаблоны)
- ✅ static/ (статика)

Теперь вы можете опубликовать проект на GitHub:

```bash
git init
git add .
git commit -m "Django shop project"
git remote add origin https://github.com/ВАШ_ЛОГИН/ofisteh-shop.git
git push -u origin main
```

Все файлы Django попадут на GitHub! 🎉
