from .models import Category


def cart_processor(request):
    """Контекстный процессор для корзины"""
    from .cart import Cart
    cart = Cart(request)
    
    return {
        'cart': cart,
        'cart_total_items': len(cart),
        'cart_total_price': cart.get_total_price(),
    }


def categories_processor(request):
    """Контекстный процессор для категорий"""
    categories = Category.objects.filter(is_active=True)
    return {
        'all_categories': categories,
    }
