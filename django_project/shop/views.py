from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.db.models import Q, Avg
from .models import Category, Product, Review, Order, OrderItem
from .forms import OrderForm, ReviewForm
from .cart import Cart
import json


def home(request):
    """Главная страница"""
    categories = Category.objects.filter(is_active=True)
    popular_products = Product.objects.filter(
        is_available=True,
        in_stock=True
    ).select_related('category')[:8]
    
    sale_products = Product.objects.filter(
        is_available=True,
        old_price__isnull=False
    ).select_related('category')[:4]
    
    context = {
        'categories': categories,
        'popular_products': popular_products,
        'sale_products': sale_products,
    }
    return render(request, 'shop/home.html', context)


def catalog(request):
    """Каталог товаров"""
    category = None
    categories = Category.objects.filter(is_active=True)
    products = Product.objects.filter(is_available=True).select_related('category')
    
    # Фильтрация по категории
    category_slug = request.GET.get('category')
    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
        products = products.filter(category=category)
    
    # Поиск
    query = request.GET.get('q')
    if query:
        products = products.filter(
            Q(name__icontains=query) | 
            Q(description__icontains=query)
        )
    
    # Сортировка
    sort = request.GET.get('sort', '-created_at')
    if sort == 'price_asc':
        products = products.order_by('price')
    elif sort == 'price_desc':
        products = products.order_by('-price')
    elif sort == 'name':
        products = products.order_by('name')
    elif sort == 'rating':
        products = products.annotate(avg_rating=Avg('reviews__rating')).order_by('-avg_rating')
    else:
        products = products.order_by('-created_at')
    
    # Фильтр по цене
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')
    if min_price:
        products = products.filter(price__gte=min_price)
    if max_price:
        products = products.filter(price__lte=max_price)
    
    context = {
        'category': category,
        'categories': categories,
        'products': products,
        'query': query,
        'sort': sort,
    }
    return render(request, 'shop/catalog.html', context)


def product_detail(request, product_slug):
    """Детальная страница товара"""
    product = get_object_or_404(
        Product.objects.select_related('category'),
        slug=product_slug,
        is_available=True
    )
    specs = product.specs.all()
    reviews = product.reviews.filter(is_active=True)
    related_products = Product.objects.filter(
        category=product.category,
        is_available=True
    ).exclude(id=product.id)[:4]
    
    # Форма отзыва
    if request.method == 'POST':
        review_form = ReviewForm(request.POST)
        if review_form.is_valid():
            review = review_form.save(commit=False)
            review.product = product
            review.save()
            return redirect('shop:product_detail', product_slug=product.slug)
    else:
        review_form = ReviewForm()
    
    context = {
        'product': product,
        'specs': specs,
        'reviews': reviews,
        'related_products': related_products,
        'review_form': review_form,
    }
    return render(request, 'shop/product_detail.html', context)


def category_detail(request, category_slug):
    """Страница категории"""
    category = get_object_or_404(Category, slug=category_slug, is_active=True)
    products = Product.objects.filter(
        category=category,
        is_available=True
    ).select_related('category')
    
    context = {
        'category': category,
        'products': products,
    }
    return render(request, 'shop/category_detail.html', context)


def about(request):
    """О компании"""
    return render(request, 'shop/about.html')


def delivery(request):
    """Доставка и оплата"""
    return render(request, 'shop/delivery.html')


def contacts(request):
    """Контакты"""
    return render(request, 'shop/contacts.html')


def checkout(request):
    """Оформление заказа"""
    cart = Cart(request)
    
    if len(cart) == 0:
        return redirect('shop:home')
    
    return render(request, 'shop/checkout.html')


# ==================== AJAX API ====================

@require_POST
def cart_add(request):
    """Добавить товар в корзину (AJAX)"""
    cart = Cart(request)
    product_id = request.POST.get('product_id')
    quantity = int(request.POST.get('quantity', 1))
    
    try:
        product = Product.objects.get(id=product_id, is_available=True)
        cart.add(product, quantity=quantity)
        
        return JsonResponse({
            'status': 'success',
            'message': f'Товар "{product.name}" добавлен в корзину',
            'cart_total_items': len(cart),
            'cart_total_price': str(cart.get_total_price()),
        })
    except Product.DoesNotExist:
        return JsonResponse({
            'status': 'error',
            'message': 'Товар не найден',
        }, status=404)


@require_POST
def cart_remove(request):
    """Удалить товар из корзины (AJAX)"""
    cart = Cart(request)
    product_id = request.POST.get('product_id')
    
    try:
        product = Product.objects.get(id=product_id)
        cart.remove(product)
        
        return JsonResponse({
            'status': 'success',
            'cart_total_items': len(cart),
            'cart_total_price': str(cart.get_total_price()),
        })
    except Product.DoesNotExist:
        return JsonResponse({
            'status': 'error',
            'message': 'Товар не найден',
        }, status=404)


@require_POST
def cart_update(request):
    """Обновить количество товара в корзине (AJAX)"""
    cart = Cart(request)
    product_id = request.POST.get('product_id')
    quantity = int(request.POST.get('quantity', 1))
    
    try:
        product = Product.objects.get(id=product_id)
        if quantity > 0:
            cart.add(product, quantity=quantity, override_quantity=True)
        else:
            cart.remove(product)
        
        return JsonResponse({
            'status': 'success',
            'cart_total_items': len(cart),
            'cart_total_price': str(cart.get_total_price()),
        })
    except Product.DoesNotExist:
        return JsonResponse({
            'status': 'error',
            'message': 'Товар не найден',
        }, status=404)


def cart_detail(request):
    """Получить содержимое корзины (AJAX)"""
    cart = Cart(request)
    items = []
    
    for item in cart:
        items.append({
            'product_id': item['product'].id,
            'name': item['product'].name,
            'price': str(item['price']),
            'total_price': str(item['total_price']),
            'quantity': item['quantity'],
            'image': item['product'].image.url if item['product'].image else None,
        })
    
    return JsonResponse({
        'items': items,
        'total_items': len(cart),
        'total_price': str(cart.get_total_price()),
    })


def cart_clear(request):
    """Очистить корзину (AJAX)"""
    cart = Cart(request)
    cart.clear()
    
    return JsonResponse({
        'status': 'success',
        'message': 'Корзина очищена',
    })


@require_POST
def order_create(request):
    """Создать заказ (AJAX)"""
    cart = Cart(request)
    
    if len(cart) == 0:
        return JsonResponse({
            'status': 'error',
            'message': 'Корзина пуста',
        }, status=400)
    
    form = OrderForm(request.POST)
    if form.is_valid():
        order = form.save()
        
        # Создаём позиции заказа
        for item in cart:
            OrderItem.objects.create(
                order=order,
                product=item['product'],
                price=item['price'],
                quantity=item['quantity']
            )
        
        # Очищаем корзину
        cart.clear()
        
        return JsonResponse({
            'status': 'success',
            'message': f'Заказ #{order.id} успешно создан!',
            'order_id': order.id,
        })
    else:
        errors = form.errors.as_json()
        return JsonResponse({
            'status': 'error',
            'message': 'Ошибка валидации формы',
            'errors': json.loads(errors),
        }, status=400)


def search_suggestions(request):
    """Получить подсказки поиска (AJAX)"""
    query = request.GET.get('q', '')
    
    if len(query) < 2:
        return JsonResponse({'suggestions': []})
    
    products = Product.objects.filter(
        is_available=True,
        name__icontains=query
    )[:5]
    
    suggestions = [
        {
            'id': p.id,
            'name': p.name,
            'price': str(p.price),
            'url': p.get_absolute_url(),
        }
        for p in products
    ]
    
    return JsonResponse({'suggestions': suggestions})


def product_reviews(request, product_slug):
    """Получить отзывы о товаре (AJAX)"""
    product = get_object_or_404(Product, slug=product_slug)
    reviews = product.reviews.filter(is_active=True).order_by('-created_at')
    
    reviews_data = [
        {
            'author_name': r.author_name,
            'author_role': r.author_role,
            'rating': r.rating,
            'text': r.text,
            'created_at': r.created_at.strftime('%d.%m.%Y'),
        }
        for r in reviews
    ]
    
    return JsonResponse({
        'reviews': reviews_data,
        'total': reviews.count(),
    })


@require_POST
def add_review(request):
    """Добавить отзыв (AJAX)"""
    product_id = request.POST.get('product_id')
    
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return JsonResponse({
            'status': 'error',
            'message': 'Товар не найден',
        }, status=404)
    
    form = ReviewForm(request.POST)
    if form.is_valid():
        review = form.save(commit=False)
        review.product = product
        review.save()
        
        return JsonResponse({
            'status': 'success',
            'message': 'Отзыв добавлен',
            'review': {
                'author_name': review.author_name,
                'author_role': review.author_role,
                'rating': review.rating,
                'text': review.text,
                'created_at': review.created_at.strftime('%d.%m.%Y'),
            }
        })
    else:
        return JsonResponse({
            'status': 'error',
            'message': 'Ошибка валидации',
            'errors': form.errors,
        }, status=400)
