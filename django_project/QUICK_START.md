# ⚡ Быстрые команды для публикации на GitHub

## 📋 Копируйте и выполняйте по порядку:

### 1. Установка Git (если не установлен)
```bash
# Проверить версию
git --version

# Если не установлен:
# Windows: скачать с https://git-scm.com/download/win
# macOS: brew install git
# Linux: sudo apt-get install git
```

### 2. Настройка Git
```bash
git config --global user.name "Ваше Имя"
git config --global user.email "your.email@example.com"
```

### 3. Переход в папку проекта
```bash
cd django_project
```

### 4. Инициализация Git
```bash
git init
```

### 5. Добавление файлов
```bash
git add .
```

### 6. Первый коммит
```bash
git commit -m "Initial commit: Django shop project"
```

### 7. Создание репозитория на GitHub
# Перейдите на https://github.com/new
# Создайте репозиторий с именем: ofisteh-shop

### 8. Связывание с GitHub
```bash
git remote add origin https://github.com/ВАШ_ЛОГИН/ofisteh-shop.git
git branch -M main
```

### 9. Отправка на GitHub
```bash
git push -u origin main
```

---

## 🔄 После внесения изменений:

```bash
git add .
git commit -m "Описание изменений"
git push
```

---

## 📌 Полезные команды:

```bash
# Статус
git status

# История коммитов
git log --oneline

# Отмена изменений в файле
git checkout -- filename.py

# Отмена последнего коммита
git reset --soft HEAD~1

# Создание ветки
git checkout -b feature-name

# Слияние веток
git checkout main
git merge feature-name
```

---

## 🔑 SSH ключ (для удобства):

```bash
# Генерация ключа
ssh-keygen -t ed25519 -C "your.email@example.com"

# Запуск агента
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Копирование ключа
# macOS: pbcopy < ~/.ssh/id_ed25519.pub
# Windows: cat ~/.ssh/id_ed25519.pub | clip
# Linux: cat ~/.ssh/id_ed25519.pub | xclip -selection clipboard

# Добавьте ключ на GitHub: https://github.com/settings/keys

# Переключение на SSH
git remote set-url origin git@github.com:ВАШ_ЛОГИН/ofisteh-shop.git
```
