#!/bin/bash

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║  🚀 Публикация проекта ОфисТех на GitHub              ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Проверка наличия Git
if ! command -v git &> /dev/null; then
    echo "❌ Git не установлен!"
    echo ""
    echo "Установите Git:"
    echo "  Ubuntu/Debian: sudo apt-get install git"
    echo "  CentOS/RHEL:   sudo yum install git"
    echo "  macOS:         brew install git"
    echo ""
    exit 1
fi

echo "✅ Git установлен: $(git --version)"
echo ""

# Запрос данных пользователя
echo "📝 Настройка Git"
echo ""
read -p "Введите ваше имя для Git: " GIT_NAME
read -p "Введите ваш email для Git: " GIT_EMAIL

git config --global user.name "$GIT_NAME"
git config --global user.email "$GIT_EMAIL"

echo "✅ Git настроен"
echo ""

# Инициализация Git
echo "📁 Инициализация Git репозитория..."
git init
echo "✅ Git инициализирован"
echo ""

# Добавление файлов
echo "➕ Добавление файлов..."
git add .
echo "✅ Файлы добавлены"
echo ""

# Создание коммита
echo "💾 Создание первого коммита..."
git commit -m "Initial commit: Django shop project"
echo "✅ Коммит создан"
echo ""

# Переименование ветки
echo "🌿 Переименование ветки в main..."
git branch -M main
echo "✅ Ветка переименована"
echo ""

echo "╔══════════════════════════════════════════════════════════╗"
echo "║  ⚠️  ВАЖНО: Следующие шаги нужно выполнить вручную    ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
echo "1️⃣  Создайте репозиторий на GitHub:"
echo "   ➜ Перейдите на https://github.com/new"
echo "   ➜ Имя репозитория: ofisteh-shop"
echo "   ➜ НЕ ставьте галочки на инициализацию"
echo "   ➜ Нажмите \"Create repository\""
echo ""
echo "2️⃣  Скопируйте URL репозитория (например):"
echo "   https://github.com/ВАШ_ЛОГИН/ofisteh-shop.git"
echo ""
read -p "Введите URL репозитория: " REPO_URL

echo ""
echo "🔗 Связывание с GitHub..."
git remote add origin "$REPO_URL"
echo "✅ Репозиторий связан"
echo ""

echo "🚀 Отправка кода на GitHub..."
git push -u origin main
echo ""

if [ $? -eq 0 ]; then
    echo "╔══════════════════════════════════════════════════════════╗"
    echo "║  🎉 ПОЗДРАВЛЯЕМ! Проект успешно опубликован!          ║"
    echo "╚══════════════════════════════════════════════════════════╝"
    echo ""
    echo "📌 Ваш проект доступен по адресу:"
    echo "   $REPO_URL"
    echo ""
else
    echo "❌ Ошибка при отправке на GitHub"
    echo ""
    echo "Возможные причины:"
    echo "- Неверный URL репозитория"
    echo "- Проблемы с авторизацией"
    echo "- Репозиторий не создан"
    echo ""
    echo "Попробуйте выполнить команды вручную:"
    echo "  git remote add origin $REPO_URL"
    echo "  git push -u origin main"
    echo ""
fi
