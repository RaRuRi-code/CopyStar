# ОфисТех - Магазин оргтехники

Полноценный интернет-магазин оргтехники, разработанный на **Django** с использованием **Bootstrap 5** и **AJAX** (fetch API).

## 🚀 Технологии

- **Backend:** Django 4.2 (Python)
- **Frontend:** HTML5, CSS3, Bootstrap 5, JavaScript (Vanilla JS)
- **AJAX:** Fetch API для асинхронных запросов
- **База данных:** SQLite (по умолчанию)

## 📋 Возможности

### Фронтенд
- ✅ Адаптивный дизайн (Bootstrap 5)
- ✅ AJAX-запросы для корзины (без перезагрузки страницы)
- ✅ Поиск с автодополнением
- ✅ Фильтрация и сортировка товаров
- ✅ Модальные окна товаров
- ✅ Корзина в Offcanvas-панели
- ✅ Уведомления (toast)
- ✅ Анимации и переходы

### Бэкенд (Django)
- ✅ Модели: Категории, Товары, Характеристики, Отзывы, Заказы
- ✅ Админ-панель Django
- ✅ REST API endpoints для AJAX
- ✅ Сессии для корзины
- ✅ Формы с валидацией
- ✅ Контекстные процессоры

## 🛠️ Установка и запуск

### 1. Клонирование и переход в директорию

```bash
cd django_project
```

### 2. Создание виртуального окружения

```bash
# Linux/macOS
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

### 3. Установка зависимостей

```bash
pip install -r requirements.txt
```

### 4. Миграции базы данных

```bash
python manage.py migrate
```

### 5. Заполнение базы данных тестовыми товарами

```bash
python manage.py shell < populate_db.py
```

### 6. Создание суперпользователя (для админки)

```bash
python manage.py createsuperuser
```

### 7. Запуск сервера

```bash
python manage.py runserver
```

### 8. Открытие в браузере

- **Сайт:** http://127.0.0.1:8000/
- **Админка:** http://127.0.0.1:8000/admin/

## 📁 Структура проекта

```
django_project/
├── manage.py                 # Управление Django
├── requirements.txt          # Зависимости Python
├── populate_db.py           # Скрипт заполнения БД
├── ofisteh/                 # Настройки проекта
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── shop/                    # Приложение магазина
│   ├── models.py           # Модели БД
│   ├── views.py            # Представления (views)
│   ├── urls.py             # URL-маршруты
│   ├── forms.py            # Формы
│   ├── admin.py            # Настройки админки
│   ├── cart.py             # Логика корзины
│   └── context_processors.py
├── templates/              # HTML шаблоны
│   ├── base.html          # Базовый шаблон
│   └── shop/
│       ├── home.html
│       ├── catalog.html
│       ├── product_detail.html
│       ├── checkout.html
│       └── ...
└── static/                # Статические файлы
    └── js/
        └── main.js       # AJAX JavaScript
```

## 🔌 AJAX API Endpoints

| Метод | URL | Описание |
|-------|-----|----------|
| POST | `/api/cart/add/` | Добавить товар в корзину |
| POST | `/api/cart/remove/` | Удалить товар из корзины |
| POST | `/api/cart/update/` | Обновить количество |
| GET | `/api/cart/detail/` | Получить содержимое корзины |
| POST | `/api/order/create/` | Создать заказ |
| GET | `/api/search/` | Поиск с подсказками |
| GET | `/api/product/<slug>/reviews/` | Отзывы о товаре |
| POST | `/api/review/add/` | Добавить отзыв |

## 📦 Модели данных

### Category (Категория)
- name, slug, icon, description, image, is_active, order

### Product (Товар)
- name, slug, category, description, price, old_price, image, in_stock, is_available

### ProductSpec (Характеристика)
- product, name, value

### Review (Отзыв)
- product, author_name, author_role, rating, text, is_active

### Order (Заказ)
- first_name, last_name, email, phone, address, city, postal_code, comment, status

### OrderItem (Позиция заказа)
- order, product, price, quantity

## 🎨 Страницы сайта

1. **Главная** - Hero-секция, популярные товары, акции
2. **Каталог** - Фильтры, сортировка, поиск
3. **Товар** - Детальная информация, характеристики, отзывы
4. **Категория** - Товары конкретной категории
5. **О компании** - Информация о компании
6. **Доставка** - Условия доставки и оплаты
7. **Контакты** - Контактная информация, форма обратной связи
8. **Оформление заказа** - Форма заказа с AJAX

## 🔐 Админ-панель

После создания суперпользователя (`python manage.py createsuperuser`), войдите в админку:

- URL: http://127.0.0.1:8000/admin/
- Управление товарами, категориями, заказами, отзывами
- Встроенный редактор с предпросмотром

## 📝 Примечания

- Проект использует SQLite для простоты развертывания
- Для production рекомендуется PostgreSQL
- Статические файлы собираются через `python manage.py collectstatic`
- В production обязательно измените `SECRET_KEY` и `DEBUG = False`

## 👨‍💻 Разработка

Для разработки с автоматической перезагрузкой:

```bash
python manage.py runserver
```

Django автоматически перезагружает сервер при изменении кода.

## 📄 Лицензия

MIT License

## 🚀 Публикация на GitHub

Подробная инструкция по публикации проекта на GitHub находится в файлах:

- **[GITHUB_GUIDE.md](GITHUB_GUIDE.md)** - полное руководство с примерами
- **[QUICK_START.md](QUICK_START.md)** - шпаргалка с основными командами
- **publish_to_github.sh** - автоматический скрипт для Linux/macOS
- **publish_to_github.bat** - автоматический скрипт для Windows

### Быстрая публикация (Linux/macOS):

```bash
cd django_project
chmod +x publish_to_github.sh
./publish_to_github.sh
```

### Быстрая публикация (Windows):

```cmd
cd django_project
publish_to_github.bat
```

Или вручную:

```bash
cd django_project
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/ВАШ_ЛОГИН/ofisteh-shop.git
git branch -M main
git push -u origin main
```

---

**Разработано с ❤️ на Django**
