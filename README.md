# 🖥️ ОфисТех - Интернет-магазин оргтехники

Полноценный интернет-магазин оргтехники на **Django** с **Bootstrap 5** и **AJAX**.

## 🚀 Быстрая установка

### Шаг 1: Запустите скрипт установки

```bash
chmod +x setup_complete.sh
./setup_complete.sh
```

Этот скрипт автоматически создаст ВСЕ файлы Django проекта:
- ✅ Настройки Django (ofisteh/)
- ✅ Приложение магазина (shop/)
- ✅ HTML шаблоны (templates/)
- ✅ JavaScript файлы (static/js/)

### Шаг 2: Установите зависимости

```bash
pip install -r requirements.txt
```

### Шаг 3: Создайте базу данных

```bash
python manage.py migrate
```

### Шаг 4: Заполните тестовыми данными

```bash
python manage.py shell < populate_db.py
```

### Шаг 5: Создайте суперпользователя

```bash
python manage.py createsuperuser
```

### Шаг 6: Запустите сервер

```bash
python manage.py runserver
```

Откройте браузер: **http://127.0.0.1:8000**

## 📦 Структура проекта

```
├── manage.py                 # Управление Django
├── requirements.txt          # Зависимости Python
├── populate_db.py           # Скрипт заполнения БД
├── setup_complete.sh        # Автоматическая установка
├── ofisteh/                 # Настройки проекта
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── shop/                    # Приложение магазина
│   ├── models.py           # Модели БД
│   ├── views.py            # Представления + AJAX API
│   ├── urls.py             # Маршруты
│   ├── forms.py            # Формы
│   ├── admin.py            # Админ-панель
│   ├── cart.py             # Логика корзины
│   └── context_processors.py
├── templates/              # HTML шаблоны
│   ├── base.html
│   └── shop/
│       ├── home.html
│       ├── catalog.html
│       ├── product_detail.html
│       └── ...
└── static/js/             # JavaScript
    └── main.js           # AJAX функционал
```

## 🌟 Возможности

### Backend (Django)
- ✅ 6 моделей: Категории, Товары, Характеристики, Отзывы, Заказы
- ✅ Админ-панель Django
- ✅ REST API для AJAX запросов
- ✅ Корзина на сессиях
- ✅ Формы с валидацией

### Frontend (Bootstrap 5 + AJAX)
- ✅ Адаптивный дизайн
- ✅ AJAX корзина (без перезагрузки)
- ✅ Поиск с автодополнением
- ✅ Фильтрация и сортировка
- ✅ Модальные окна

## 🔌 AJAX API Endpoints

| Метод | URL | Описание |
|-------|-----|----------|
| POST | `/api/cart/add/` | Добавить в корзину |
| POST | `/api/cart/remove/` | Удалить из корзины |
| POST | `/api/cart/update/` | Обновить количество |
| POST | `/api/order/create/` | Создать заказ |
| GET | `/api/search/` | Поиск с подсказками |

## 📄 Страницы сайта

1. **Главная** - Hero, популярные товары, акции
2. **Каталог** - Фильтры, сортировка, поиск
3. **Товар** - Детали, характеристики, отзывы
4. **Категория** - Товары категории
5. **О компании** - Информация
6. **Доставка** - Условия
7. **Контакты** - Форма обратной связи
8. **Оформление заказа** - Форма заказа

## 🔐 Админ-панель

После создания суперпользователя:
- URL: http://127.0.0.1:8000/admin/
- Управление товарами, категориями, заказами

## 📚 Технологии

- **Backend:** Django 4.2 (Python)
- **Frontend:** HTML5, CSS3, Bootstrap 5, JavaScript
- **AJAX:** Fetch API
- **База данных:** SQLite

## 🚀 Публикация на GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/ВАШ_ЛОГИН/ofisteh-shop.git
git branch -M main
git push -u origin main
```

## 📝 Примечания

- Проект использует SQLite (для production рекомендуется PostgreSQL)
- В production измените `SECRET_KEY` и установите `DEBUG = False`
- Статические файлы: `python manage.py collectstatic`

## 👨‍💻 Разработка

```bash
python manage.py runserver
```

Django автоматически перезагружает сервер при изменении кода.

---

**Разработано с ❤️ на Django**
