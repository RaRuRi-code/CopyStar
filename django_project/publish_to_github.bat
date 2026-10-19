@echo off
chcp 65001 >nul
echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║  🚀 Публикация проекта ОфисТех на GitHub              ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

REM Проверка наличия Git
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git не установлен!
    echo.
    echo Скачайте Git с официального сайта:
    echo https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo ✅ Git установлен
echo.

REM Запрос данных пользователя
echo 📝 Настройка Git
echo.
set /p GIT_NAME="Введите ваше имя для Git: "
set /p GIT_EMAIL="Введите ваш email для Git: "

git config --global user.name "%GIT_NAME%"
git config --global user.email "%GIT_EMAIL%"

echo ✅ Git настроен
echo.

REM Инициализация Git
echo 📁 Инициализация Git репозитория...
git init
echo ✅ Git инициализирован
echo.

REM Добавление файлов
echo ➕ Добавление файлов...
git add .
echo ✅ Файлы добавлены
echo.

REM Создание коммита
echo 💾 Создание первого коммита...
git commit -m "Initial commit: Django shop project"
echo ✅ Коммит создан
echo.

REM Переименование ветки
echo 🌿 Переименование ветки в main...
git branch -M main
echo ✅ Ветка переименована
echo.

echo ╔══════════════════════════════════════════════════════════╗
echo ║  ⚠️  ВАЖНО: Следующие шаги нужно выполнить вручную    ║
echo ╚══════════════════════════════════════════════════════════╝
echo.
echo 1️⃣  Создайте репозиторий на GitHub:
echo    ➜ Перейдите на https://github.com/new
echo    ➜ Имя репозитория: ofisteh-shop
echo    ➜ НЕ ставьте галочки на инициализацию
echo    ➜ Нажмите "Create repository"
echo.
echo 2️⃣  Скопируйте URL репозитория (например):
echo    https://github.com/ВАШ_ЛОГИН/ofisteh-shop.git
echo.
set /p REPO_URL="Введите URL репозитория: "

echo.
echo 🔗 Связывание с GitHub...
git remote add origin %REPO_URL%
echo ✅ Репозиторий связан
echo.

echo 🚀 Отправка кода на GitHub...
git push -u origin main
echo.

if %errorlevel% equ 0 (
    echo ╔══════════════════════════════════════════════════════════╗
    echo ║  🎉 ПОЗДРАВЛЯЕМ! Проект успешно опубликован!          ║
    echo ╚══════════════════════════════════════════════════════════╝
    echo.
    echo 📌 Ваш проект доступен по адресу:
    echo    %REPO_URL%
    echo.
) else (
    echo ❌ Ошибка при отправке на GitHub
    echo.
    echo Возможные причины:
    echo - Неверный URL репозитория
    echo - Проблемы с авторизацией
    echo - Репозиторий не создан
    echo.
    echo Попробуйте выполнить команды вручную:
    echo   git remote add origin %REPO_URL%
    echo   git push -u origin main
    echo.
)

pause
