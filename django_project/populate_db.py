"""
Скрипт для заполнения базы данных начальными данными.
Запуск: python manage.py shell < populate_db.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ofisteh.settings')
django.setup()

from shop.models import Category, Product, ProductSpec, Review

# Очистка старых данных
print("Очистка старых данных...")
ProductSpec.objects.all().delete()
Product.objects.all().delete()
Category.objects.all().delete()
Review.objects.all().delete()

# Создание категорий
print("Создание категорий...")
categories_data = [
    {'name': 'Принтеры и МФУ', 'slug': 'printers', 'icon': '🖨️', 'order': 1, 'description': 'Лазерные и струйные принтеры, МФУ для офиса'},
    {'name': 'Мониторы', 'slug': 'monitors', 'icon': '🖥️', 'order': 2, 'description': 'Профессиональные мониторы для работы'},
    {'name': 'Сканеры', 'slug': 'scanners', 'icon': '📠', 'order': 3, 'description': 'Планшетные и протяжные сканеры'},
    {'name': 'Проекторы', 'slug': 'projectors', 'icon': '📽️', 'order': 4, 'description': 'Проекторы для презентаций и конференц-залов'},
    {'name': 'Шредеры', 'slug': 'shredders', 'icon': '📋', 'order': 5, 'description': 'Шредеры для уничтожения документов'},
    {'name': 'Аксессуары', 'slug': 'accessories', 'icon': '🔌', 'order': 6, 'description': 'ИБП, сетевые фильтры, хабы и другое'},
]

categories = {}
for cat_data in categories_data:
    cat = Category.objects.create(**cat_data)
    categories[cat.slug] = cat
    print(f"  ✓ {cat.name}")

# Создание товаров
print("\nСоздание товаров...")
products_data = [
    {
        'name': 'HP LaserJet Pro M404dn', 'slug': 'hp-laserjet-pro-m404dn',
        'category': 'printers', 'price': 24990, 'old_price': 29990,
        'description': 'Быстрый черно-белый лазерный принтер для офиса. Двусторонняя печать, скорость до 38 стр/мин.',
        'specs': {'Тип': 'Лазерный', 'Скорость': '38 стр/мин', 'Разрешение': '1200x1200 dpi', 'Двусторонняя печать': 'Да', 'Сеть': 'Ethernet, USB'},
        'rating': 4.7, 'reviews': 124
    },
    {
        'name': 'Canon PIXMA G3420', 'slug': 'canon-pixma-g3420',
        'category': 'printers', 'price': 18500,
        'description': 'МФУ с СНПЧ для цветной печати. Экономичная печать до 7000 страниц на одном комплекте чернил.',
        'specs': {'Тип': 'Струйный', 'Скорость': '10 стр/мин', 'Разрешение': '4800x1200 dpi', 'СНПЧ': 'Да', 'Wi-Fi': 'Да'},
        'rating': 4.5, 'reviews': 89
    },
    {
        'name': 'Samsung Xpress M2070W', 'slug': 'samsung-xpress-m2070w',
        'category': 'printers', 'price': 12990, 'old_price': 15990,
        'description': 'Компактный лазерный МФУ с Wi-Fi. Печать, сканирование, копирование в одном устройстве.',
        'specs': {'Тип': 'Лазерный', 'Скорость': '20 стр/мин', 'Разрешение': '1200x1200 dpi', 'Wi-Fi': 'Да', 'NFC': 'Да'},
        'rating': 4.3, 'reviews': 67
    },
    {
        'name': 'Dell P2722H 27"', 'slug': 'dell-p2722h-27',
        'category': 'monitors', 'price': 32990,
        'description': 'Профессиональный IPS монитор 27 дюймов Full HD. Регулировка по высоте, поворот, USB-хаб.',
        'specs': {'Диагональ': '27"', 'Разрешение': '1920x1080', 'Матрица': 'IPS', 'Частота': '60 Гц', 'Порты': 'HDMI, DP, USB'},
        'rating': 4.8, 'reviews': 156
    },
    {
        'name': 'LG 34WP65C-B 34"', 'slug': 'lg-34wp65c-b-34',
        'category': 'monitors', 'price': 45990, 'old_price': 52990,
        'description': 'Ультраширокий изогнутый монитор 34 дюйма. Идеален для работы с документами и таблицами.',
        'specs': {'Диагональ': '34"', 'Разрешение': '3440x1440', 'Матрица': 'IPS', 'Частота': '160 Гц', 'Изогнутый': 'Да, 1800R'},
        'rating': 4.9, 'reviews': 203
    },
    {
        'name': 'ASUS ProArt PA278CV 27"', 'slug': 'asus-proart-pa278cv-27',
        'category': 'monitors', 'price': 38500,
        'description': 'Монитор для дизайнеров с калибровкой цвета. 100% sRGB, заводская калибровка Delta E < 2.',
        'specs': {'Диагональ': '27"', 'Разрешение': '2560x1440', 'Матрица': 'IPS', 'Цветовой охват': '100% sRGB', 'Калибровка': 'Delta E < 2'},
        'in_stock': False, 'rating': 4.6, 'reviews': 98
    },
    {
        'name': 'Fujitsu fi-8170', 'slug': 'fujitsu-fi-8170',
        'category': 'scanners', 'price': 89990,
        'description': 'Профессиональный документ-сканер для больших объёмов. Скорость до 70 стр/мин.',
        'specs': {'Тип': 'Протяжной', 'Скорость': '70 стр/мин', 'Разрешение': '600 dpi', 'ADF': '100 листов', 'USB': '3.2'},
        'rating': 4.4, 'reviews': 34
    },
    {
        'name': 'Epson Perfection V600', 'slug': 'epson-perfection-v600',
        'category': 'scanners', 'price': 21500, 'old_price': 25000,
        'description': 'Планшетный сканер для фото и документов. Разрешение 6400 dpi, подсветка для слайдов.',
        'specs': {'Тип': 'Планшетный', 'Разрешение': '6400 dpi', 'Формат': 'A4', 'Слайд-модуль': 'Да', 'USB': '2.0'},
        'rating': 4.2, 'reviews': 78
    },
    {
        'name': 'Epson EB-L200F', 'slug': 'epson-eb-l200f',
        'category': 'projectors', 'price': 78990,
        'description': 'Лазерный проектор для конференц-залов. Яркость 4000 люмен, Full HD, срок службы 30000 часов.',
        'specs': {'Тип': 'Лазерный', 'Яркость': '4000 лм', 'Разрешение': '1920x1080', 'Контраст': '2500000:1', 'Ресурс': '30000 ч'},
        'rating': 4.7, 'reviews': 45
    },
    {
        'name': 'BenQ MW612', 'slug': 'benq-mw612',
        'category': 'projectors', 'price': 42990,
        'description': 'DLP проектор для презентаций. Яркость 4200 люмен, встроенный динамик 10W.',
        'specs': {'Тип': 'DLP', 'Яркость': '4200 лм', 'Разрешение': '1280x800', 'Динамик': '10W', 'HDMI': '2x'},
        'rating': 4.3, 'reviews': 56
    },
    {
        'name': 'HSM Securio B35', 'slug': 'hsm-securio-b35',
        'category': 'shredders', 'price': 35990,
        'description': 'Офисный шредер 4-го уровня секретности. Уничтожает до 35 листов за раз, включая скобы.',
        'specs': {'Уровень': 'P-4 (4-й)', 'Производительность': '35 листов', 'Размер фрагментов': '1.9x15 мм', 'Объём корзины': '58 л', 'Шум': '< 56 дБ'},
        'rating': 4.5, 'reviews': 42
    },
    {
        'name': 'Fellowes Powershred 99Ci', 'slug': 'fellowes-powershred-99ci',
        'category': 'shredders', 'price': 15990, 'old_price': 19990,
        'description': 'Персональный шредер для дома и малого офиса. Уничтожает кредитные карты и CD.',
        'specs': {'Уровень': 'P-4', 'Производительность': '12 листов', 'Размер фрагментов': '3.9x38 мм', 'Объём корзины': '23 л', 'Авто-стоп': 'Да'},
        'rating': 4.1, 'reviews': 63
    },
    {
        'name': 'USB-хаб Belkin 7 портов', 'slug': 'usb-hub-belkin-7',
        'category': 'accessories', 'price': 3490,
        'description': 'USB 3.0 хаб с 7 портами и адаптером питания. Поддержка быстрой зарядки.',
        'specs': {'Порты': '7x USB 3.0', 'Скорость': '5 Гбит/с', 'Питание': 'Адаптер в комплекте', 'Кабель': '1.2 м', 'Совместимость': 'Win/Mac/Linux'},
        'rating': 4.4, 'reviews': 187
    },
    {
        'name': 'ИБП APC Back-UPS 700VA', 'slug': 'ibp-apc-back-ups-700va',
        'category': 'accessories', 'price': 7990,
        'description': 'Источник бесперебойного питания для ПК и оргтехники. Время работы до 15 минут.',
        'specs': {'Мощность': '700 ВА / 405 Вт', 'Тип': 'Line-Interactive', 'Розетки': '6 (с батареей)', 'Время переключения': '< 6 мс', 'Вес': '6.4 кг'},
        'rating': 4.6, 'reviews': 234
    },
    {
        'name': 'Сетевой фильтр Pilot Pro', 'slug': 'setevoy-filter-pilot-pro',
        'category': 'accessories', 'price': 2490,
        'description': 'Сетевой фильтр с 6 розетками и USB-зарядкой. Защита от перегрузок и импульсных помех.',
        'specs': {'Розетки': '6x Schuko', 'USB': '2x 2.4A', 'Кабель': '2 м', 'Макс. нагрузка': '2300 Вт', 'Защита': 'От перегрузок'},
        'rating': 4.3, 'reviews': 156
    },
    {
        'name': 'Xerox B210', 'slug': 'xerox-b210',
        'category': 'printers', 'price': 16990,
        'description': 'Компактный лазерный принтер для дома и офиса. Wi-Fi, мобильная печать.',
        'specs': {'Тип': 'Лазерный', 'Скорость': '30 стр/мин', 'Разрешение': '1200x1200 dpi', 'Wi-Fi': 'Да', 'AirPrint': 'Да'},
        'rating': 4.4, 'reviews': 91
    },
]

for prod_data in products_data:
    specs_data = prod_data.pop('specs')
    rating = prod_data.pop('rating', 4.5)
    reviews_count = prod_data.pop('reviews', 50)
    
    prod_data['category'] = categories[prod_data['category']]
    product = Product.objects.create(**prod_data)
    
    # Создание характеристик
    for name, value in specs_data.items():
        ProductSpec.objects.create(product=product, name=name, value=value)
    
    print(f"  ✓ {product.name}")

# Создание отзывов
print("\nСоздание отзывов...")
reviews_data = [
    {'author_name': 'Алексей К.', 'author_role': 'Директор ООО "Прогресс"', 'rating': 5, 'text': 'Отличный магазин! Заказывали принтеры для офиса — доставили на следующий день. Качество на высоте!'},
    {'author_name': 'Мария С.', 'author_role': 'Офис-менеджер', 'rating': 5, 'text': 'Покупаем здесь технику уже 3 года. Всегда хорошие цены, быстрая доставка и отличная поддержка.'},
    {'author_name': 'Дмитрий В.', 'author_role': 'IT-специалист', 'rating': 4, 'text': 'Широкий ассортимент и профессиональные консультанты. Помогли подобрать оборудование под наши задачи.'},
]

first_product = Product.objects.first()
if first_product:
    for review_data in reviews_data:
        Review.objects.create(product=first_product, **review_data)
        print(f"  ✓ Отзыв от {review_data['author_name']}")

print("\n✅ База данных успешно заполнена!")
print(f"   Категорий: {Category.objects.count()}")
print(f"   Товаров: {Product.objects.count()}")
print(f"   Отзывов: {Review.objects.count()}")
