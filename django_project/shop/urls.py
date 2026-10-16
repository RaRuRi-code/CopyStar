from django.urls import path
from . import views

app_name = 'shop'

urlpatterns = [
    # Страницы
    path('', views.home, name='home'),
    path('catalog/', views.catalog, name='catalog'),
    path('about/', views.about, name='about'),
    path('delivery/', views.delivery, name='delivery'),
    path('contacts/', views.contacts, name='contacts'),
    
    # Категории и товары
    path('category/<slug:category_slug>/', views.category_detail, name='category_detail'),
    path('product/<slug:product_slug>/', views.product_detail, name='product_detail'),
    path('checkout/', views.checkout, name='checkout'),
    
    # AJAX API - Корзина
    path('api/cart/add/', views.cart_add, name='cart_add'),
    path('api/cart/remove/', views.cart_remove, name='cart_remove'),
    path('api/cart/update/', views.cart_update, name='cart_update'),
    path('api/cart/detail/', views.cart_detail, name='cart_detail'),
    path('api/cart/clear/', views.cart_clear, name='cart_clear'),
    
    # AJAX API - Заказы
    path('api/order/create/', views.order_create, name='order_create'),
    
    # AJAX API - Поиск и отзывы
    path('api/search/', views.search_suggestions, name='search_suggestions'),
    path('api/product/<slug:product_slug>/reviews/', views.product_reviews, name='product_reviews'),
    path('api/review/add/', views.add_review, name='add_review'),
]
