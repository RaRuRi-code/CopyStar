from django.contrib import admin
from .models import Category, Product, ProductSpec, Review, Order, OrderItem


class ProductSpecInline(admin.TabularInline):
    model = ProductSpec
    extra = 3


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'is_active', 'order']
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ['is_active']
    search_fields = ['name']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'old_price', 'in_stock', 'is_available', 'created_at']
    list_filter = ['category', 'in_stock', 'is_available', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductSpecInline]
    list_editable = ['price', 'old_price', 'in_stock', 'is_available']
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'slug', 'category', 'description')
        }),
        ('Цена и наличие', {
            'fields': ('price', 'old_price', 'in_stock', 'is_available')
        }),
        ('Изображение', {
            'fields': ('image',)
        }),
    )


@admin.register(ProductSpec)
class ProductSpecAdmin(admin.ModelAdmin):
    list_display = ['product', 'name', 'value']
    list_filter = ['product']
    search_fields = ['name', 'value']


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['product', 'author_name', 'rating', 'is_active', 'created_at']
    list_filter = ['is_active', 'rating', 'created_at']
    search_fields = ['author_name', 'text']
    list_editable = ['is_active']


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['product']
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'email', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['first_name', 'last_name', 'email']
    inlines = [OrderItemInline]
    list_editable = ['status']
    
    fieldsets = (
        ('Информация о клиенте', {
            'fields': ('first_name', 'last_name', 'email', 'phone')
        }),
        ('Адрес доставки', {
            'fields': ('address', 'city', 'postal_code')
        }),
        ('Заказ', {
            'fields': ('status', 'comment')
        }),
    )
