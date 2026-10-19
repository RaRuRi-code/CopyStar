"""
Скрипт для заполнения базы данных тестовыми данными.
Запуск: python manage.py shell < populate_db.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ofisteh.settings')
django.setup()

from shop.models import Category, Product, ProductSpec, Review

print("Очистка старых данных...")
ProductSpec.objects.all().delete()
Product.objects.all().delete()
Category.objects.all().delete()
Review.objects.all().delete()

print("Создание категорий...")
categories_data = [
    {'name': 'Принтеры и МФУ', 'slug': 'printers', 'icon': '🖨️', 'order': 1},
    {'name': 'Мониторы', 'slug': 'monitors', 'icon': '🖥️', 'order': 2},
    {'name': 'Сканеры', 'slug': 'scanners', 'icon': '📠', 'order': 3},
    {'name': 'Проекторы', 'slug': 'projectors', 'icon': '📽️', 'order': 4},
    {'name': 'Шредеры', 'slug': 'shredders', 'icon': '📋', 'order': 5},
    {'name': 'Аксессуары', 'slug': 'accessories', 'icon': '🔌', 'order': 6},
]

categories = {}
for cat_data in categories_data:
    cat = Category.objects.create(**cat_data)
    categories[cat.slug] = cat
    print(f"  ✓ {cat.name}")

print("\nСоздание товаров...")
products_data = [
    {'name': 'HP LaserJet Pro M404dn', 'slug': 'hp-laserjet-pro-m404dn', 'category': 'printers', 'price': 24990, 'old_price': 29990, 'description': 'Быстрый черно-белый лазерный принтер для офиса.'},
    {'name': 'Canon PIXMA G3420', 'slug': 'canon-pixma-g3420', 'category': 'printers', 'price': 18500, 'description': 'МФУ с СНПЧ для цветной печати.'},
    {'name': 'Samsung Xpress M2070W', 'slug': 'samsung-xpress-m2070w', 'category': 'printers', 'price': 12990, 'old_price': 15990, 'description': 'Компактный лазерный МФУ с Wi-Fi.'},
    {'name': 'Dell P2722H 27"', 'slug': 'dell-p2722h-27', 'category': 'monitors', 'price': 32990, 'description': 'Профессиональный IPS монитор 27 дюймов.'},
    {'name': 'LG 34WP65C-B 34"', 'slug': 'lg-34wp65c-b-34', 'category': 'monitors', 'price': 45990, 'old_price': 52990, 'description': 'Ультраширокий изогнутый монитор 34 дюйма.'},
    {'name': 'ASUS ProArt PA278CV 27"', 'slug': 'asus-proart-pa278cv-27', 'category': 'monitors', 'price': 38500, 'description': 'Монитор для дизайнеров с калибровкой цвета.', 'in_stock': False},
    {'name': 'Fujitsu fi-8170', 'slug': 'fujitsu-fi-8170', 'category': 'scanners', 'price': 89990, 'description': 'Профессиональный документ-сканер.'},
    {'name': 'Epson Perfection V600', 'slug': 'epson-perfection-v600', 'category': 'scanners', 'price': 21500, 'old_price': 25000, 'description': 'Планшетный сканер для фото и документов.'},
    {'name': 'Epson EB-L200F', 'slug': 'epson-eb-l200f', 'category': 'projectors', 'price': 78990, 'description': 'Лазерный проектор для конференц-залов.'},
    {'name': 'BenQ MW612', 'slug': 'benq-mw612', 'category': 'projectors', 'price': 42990, 'description': 'DLP проектор для презентаций.'},
    {'name': 'HSM Securio B35', 'slug': 'hsm-securio-b35', 'category': 'shredders', 'price': 35990, 'description': 'Офисный шредер 4-го уровня секретности.'},
    {'name': 'Fellowes Powershred 99Ci', 'slug': 'fellowes-powershred-99ci', 'category': 'shredders', 'price': 15990, 'old_price': 19990, 'description': 'Персональный шредер для дома.'},
    {'name': 'USB-хаб Belkin 7 портов', 'slug': 'usb-hub-belkin-7', 'category': 'accessories', 'price': 3490, 'description': 'USB 3.0 хаб с 7 портами.'},
    {'name': 'ИБП APC Back-UPS 700VA', 'slug': 'ibp-apc-back-ups-700va', 'category': 'accessories', 'price': 7990, 'description': 'Источник бесперебойного питания.'},
    {'name': 'Сетевой фильтр Pilot Pro', 'slug': 'setevoy-filter-pilot-pro', 'category': 'accessories', 'price': 2490, 'description': 'Сетевой фильтр с 6 розетками.'},
    {'name': 'Xerox B210', 'slug': 'xerox-b210', 'category': 'printers', 'price': 16990, 'description': 'Компактный лазерный принтер.'},
]

for prod_data in products_data:
    prod_data['category'] = categories[prod_data['category']]
    product = Product.objects.create(**prod_data)
    print(f"  ✓ {product.name}")

print("\n✅ База данных заполнена!")
print(f"   Категорий: {Category.objects.count()}")
print(f"   Товаров: {Product.objects.count()}")
