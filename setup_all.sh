#!/bin/bash

echo "╔══════════════════════════════════════════════════════════╗"
echo "║  🚀 Полная установка Django проекта ОфисТех            ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Создание структуры папок
echo "📁 Создание структуры проекта..."
mkdir -p ofisteh shop templates/shop static/js media/products media/categories

# ========== OFISTEH PROJECT ==========

cat > ofisteh/__init__.py << 'EOF'
# ofisteh project
EOF

cat > ofisteh/settings.py << 'EOF'
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
EOF

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

cat > ofisteh/wsgi.py << 'EOF'
import os
from django.core.wsgi import get_wsgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ofisteh.settings')
application = get_wsgi_application()
EOF

# ========== SHOP APP ==========

cat > shop/__init__.py << 'EOF'
# shop application
EOF

cat > shop/apps.py << 'EOF'
from django.apps import AppConfig

class ShopConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'shop'
    verbose_name = 'Магазин оргтехники'
EOF

cat > shop/models.py << 'EOF'
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

    def __str__(self):
        return f"{self.name}: {self.value}"

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    author_name = models.CharField(max_length=100)
    author_role = models.CharField(max_length=200, blank=True)
    rating = models.PositiveSmallIntegerField(default=5)
    text = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

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

    class Meta:
        ordering = ['-created_at']

    def get_total_cost(self):
        return sum(item.get_cost() for item in self.items.all())

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

    def get_cost(self):
        return self.price * self.quantity
EOF

cat > shop/views.py << 'EOF'
from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.db.models import Q
from .models import Category, Product, Review, Order, OrderItem
from .forms import OrderForm, ReviewForm
from .cart import Cart
import json

def home(request):
    categories = Category.objects.filter(is_active=True)
    popular_products = Product.objects.filter(is_available=True, in_stock=True).select_related('category')[:8]
    sale_products = Product.objects.filter(is_available=True, old_price__isnull=False).select_related('category')[:4]
    return render(request, 'shop/home.html', {'categories': categories, 'popular_products': popular_products, 'sale_products': sale_products})

def catalog(request):
    category = None
    categories = Category.objects.filter(is_active=True)
    products = Product.objects.filter(is_available=True).select_related('category')
    category_slug = request.GET.get('category')
    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
        products = products.filter(category=category)
    query = request.GET.get('q')
    if query:
        products = products.filter(Q(name__icontains=query) | Q(description__icontains=query))
    sort = request.GET.get('sort', '-created_at')
    if sort == 'price_asc':
        products = products.order_by('price')
    elif sort == 'price_desc':
        products = products.order_by('-price')
    elif sort == 'name':
        products = products.order_by('name')
    return render(request, 'shop/catalog.html', {'category': category, 'categories': categories, 'products': products, 'query': query, 'sort': sort})

def product_detail(request, product_slug):
    product = get_object_or_404(Product.objects.select_related('category'), slug=product_slug, is_available=True)
    specs = product.specs.all()
    reviews = product.reviews.filter(is_active=True)
    related_products = Product.objects.filter(category=product.category, is_available=True).exclude(id=product.id)[:4]
    if request.method == 'POST':
        review_form = ReviewForm(request.POST)
        if review_form.is_valid():
            review = review_form.save(commit=False)
            review.product = product
            review.save()
            return redirect('shop:product_detail', product_slug=product.slug)
    else:
        review_form = ReviewForm()
    return render(request, 'shop/product_detail.html', {'product': product, 'specs': specs, 'reviews': reviews, 'related_products': related_products, 'review_form': review_form})

def category_detail(request, category_slug):
    category = get_object_or_404(Category, slug=category_slug, is_active=True)
    products = Product.objects.filter(category=category, is_available=True)
    return render(request, 'shop/category_detail.html', {'category': category, 'products': products})

def about(request):
    return render(request, 'shop/about.html')

def delivery(request):
    return render(request, 'shop/delivery.html')

def contacts(request):
    return render(request, 'shop/contacts.html')

def checkout(request):
    cart = Cart(request)
    if len(cart) == 0:
        return redirect('shop:home')
    return render(request, 'shop/checkout.html')

@require_POST
def cart_add(request):
    cart = Cart(request)
    product_id = request.POST.get('product_id')
    quantity = int(request.POST.get('quantity', 1))
    try:
        product = Product.objects.get(id=product_id, is_available=True)
        cart.add(product, quantity=quantity)
        return JsonResponse({'status': 'success', 'message': f'Товар добавлен', 'cart_total_items': len(cart)})
    except Product.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Товар не найден'}, status=404)

@require_POST
def cart_remove(request):
    cart = Cart(request)
    product_id = request.POST.get('product_id')
    try:
        product = Product.objects.get(id=product_id)
        cart.remove(product)
        return JsonResponse({'status': 'success', 'cart_total_items': len(cart)})
    except Product.DoesNotExist:
        return JsonResponse({'status': 'error'}, status=404)

@require_POST
def cart_update(request):
    cart = Cart(request)
    product_id = request.POST.get('product_id')
    quantity = int(request.POST.get('quantity', 1))
    try:
        product = Product.objects.get(id=product_id)
        if quantity > 0:
            cart.add(product, quantity=quantity, override_quantity=True)
        else:
            cart.remove(product)
        return JsonResponse({'status': 'success', 'cart_total_items': len(cart)})
    except Product.DoesNotExist:
        return JsonResponse({'status': 'error'}, status=404)

@require_POST
def order_create(request):
    cart = Cart(request)
    if len(cart) == 0:
        return JsonResponse({'status': 'error', 'message': 'Корзина пуста'}, status=400)
    form = OrderForm(request.POST)
    if form.is_valid():
        order = form.save()
        for item in cart:
            OrderItem.objects.create(order=order, product=item['product'], price=item['price'], quantity=item['quantity'])
        cart.clear()
        return JsonResponse({'status': 'success', 'message': f'Заказ #{order.id} создан!', 'order_id': order.id})
    return JsonResponse({'status': 'error', 'message': 'Ошибка'}, status=400)

def search_suggestions(request):
    query = request.GET.get('q', '')
    if len(query) < 2:
        return JsonResponse({'suggestions': []})
    products = Product.objects.filter(is_available=True, name__icontains=query)[:5]
    suggestions = [{'id': p.id, 'name': p.name, 'price': str(p.price), 'url': p.get_absolute_url()} for p in products]
    return JsonResponse({'suggestions': suggestions})
EOF

cat > shop/urls.py << 'EOF'
from django.urls import path
from . import views

app_name = 'shop'

urlpatterns = [
    path('', views.home, name='home'),
    path('catalog/', views.catalog, name='catalog'),
    path('about/', views.about, name='about'),
    path('delivery/', views.delivery, name='delivery'),
    path('contacts/', views.contacts, name='contacts'),
    path('checkout/', views.checkout, name='checkout'),
    path('category/<slug:category_slug>/', views.category_detail, name='category_detail'),
    path('product/<slug:product_slug>/', views.product_detail, name='product_detail'),
    path('api/cart/add/', views.cart_add, name='cart_add'),
    path('api/cart/remove/', views.cart_remove, name='cart_remove'),
    path('api/cart/update/', views.cart_update, name='cart_update'),
    path('api/order/create/', views.order_create, name='order_create'),
    path('api/search/', views.search_suggestions, name='search_suggestions'),
]
EOF

cat > shop/forms.py << 'EOF'
from django import forms
from .models import Order, Review

class OrderForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = ['first_name', 'last_name', 'email', 'phone', 'address', 'city', 'postal_code', 'comment']

class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['author_name', 'author_role', 'rating', 'text']
EOF

cat > shop/cart.py << 'EOF'
from decimal import Decimal
from django.conf import settings
from .models import Product

class Cart:
    def __init__(self, request):
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)
        if not cart:
            cart = self.session[settings.CART_SESSION_ID] = {}
        self.cart = cart

    def __iter__(self):
        product_ids = self.cart.keys()
        products = Product.objects.filter(id__in=product_ids)
        cart = self.cart.copy()
        for product in products:
            cart[str(product.id)]['product'] = product
        for item in cart.values():
            item['price'] = Decimal(item['price'])
            item['total_price'] = item['price'] * item['quantity']
            yield item

    def __len__(self):
        return sum(item['quantity'] for item in self.cart.values())

    def add(self, product, quantity=1, override_quantity=False):
        product_id = str(product.id)
        if product_id not in self.cart:
            self.cart[product_id] = {'quantity': 0, 'price': str(product.price)}
        if override_quantity:
            self.cart[product_id]['quantity'] = quantity
        else:
            self.cart[product_id]['quantity'] += quantity
        self.save()

    def save(self):
        self.session.modified = True

    def remove(self, product):
        product_id = str(product.id)
        if product_id in self.cart:
            del self.cart[product_id]
            self.save()

    def clear(self):
        del self.session[settings.CART_SESSION_ID]
        self.save()

    def get_total_price(self):
        return sum(Decimal(item['price']) * item['quantity'] for item in self.cart.values())
EOF

cat > shop/admin.py << 'EOF'
from django.contrib import admin
from .models import Category, Product, ProductSpec, Review, Order, OrderItem

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'is_active', 'order']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'in_stock', 'is_available']
    list_filter = ['category', 'in_stock', 'is_available']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['product', 'author_name', 'rating', 'is_active']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'status', 'created_at']
EOF

cat > shop/context_processors.py << 'EOF'
from .models import Category

def cart_processor(request):
    from .cart import Cart
    cart = Cart(request)
    return {'cart': cart, 'cart_total_items': len(cart), 'cart_total_price': cart.get_total_price()}

def categories_processor(request):
    return {'all_categories': Category.objects.filter(is_active=True)}
EOF

echo "✅ Все файлы Django созданы!"
echo ""
echo "📦 Следующие шаги:"
echo "  1. python manage.py migrate"
echo "  2. python manage.py shell < populate_db.py"
echo "  3. python manage.py createsuperuser"
echo "  4. python manage.py runserver"
echo ""
echo "🌐 http://127.0.0.1:8000"
