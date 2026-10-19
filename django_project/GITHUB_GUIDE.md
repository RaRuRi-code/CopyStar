# 📚 Публикация проекта на GitHub

Пошаговая инструкция по публикации Django проекта "ОфисТех" на GitHub.

## 🚀 Шаг 1: Установка Git

Если Git ещё не установлен, скачайте его с официального сайта:
- **Windows:** https://git-scm.com/download/win
- **macOS:** https://git-scm.com/download/mac
- **Linux:** `sudo apt-get install git` (Ubuntu/Debian) или `sudo yum install git` (CentOS/RHEL)

Проверьте установку:
```bash
git --version
```

## 🔧 Шаг 2: Настройка Git

Настройте имя и email (используйте те же, что при регистрации на GitHub):

```bash
git config --global user.name "Ваше Имя"
git config --global user.email "your.email@example.com"
```

Проверьте настройки:
```bash
git config --global user.name
git config --global user.email
```

## 📁 Шаг 3: Перейдите в директорию проекта

```bash
cd django_project
```

## 🎯 Шаг 4: Инициализация Git репозитория

```bash
git init
```

Эта команда создаст скрытую папку `.git` в вашем проекте.

## 📝 Шаг 5: Проверка .gitignore

Убедитесь, что файл `.gitignore` создан (он уже есть в проекте). Этот файл указывает Git, какие файлы не нужно отслеживать:
- `venv/` - виртуальное окружение
- `__pycache__/` - кэш Python
- `db.sqlite3` - база данных
- `.env` - переменные окружения
- `media/` - загруженные файлы
- `staticfiles/` - собранные статические файлы

## ➕ Шаг 6: Добавление файлов в Git

Добавьте все файлы проекта:

```bash
git add .
```

Проверьте статус:

```bash
git status
```

Вы должны увидеть список файлов, которые будут закоммичены (зелёным цветом).

## 💾 Шаг 7: Создание первого коммита

```bash
git commit -m "Initial commit: Django shop project"
```

Описание коммита должно быть информативным. Примеры:
- `"Initial commit"` - первый коммит
- `"Add shopping cart feature"` - добавление функционала
- `"Fix bug in checkout"` - исправление ошибки

## 🌐 Шаг 8: Создание репозитория на GitHub

1. Перейдите на https://github.com
2. Войдите в свой аккаунт (или зарегистрируйтесь)
3. Нажмите на зелёную кнопку **"New"** или перейдите на https://github.com/new
4. Заполните форму:
   - **Repository name:** `ofisteh-shop` (или любое другое имя)
   - **Description:** `Интернет-магазин оргтехники на Django`
   - **Public** (публичный) или **Private** (приватный)
   - ❌ **НЕ** ставьте галочку "Initialize this repository with a README"
   - ❌ **НЕ** добавляйте `.gitignore` (он уже есть)
   - ❌ **НЕ** добавляйте лицензию (можно добавить позже)
5. Нажмите **"Create repository"**

## 🔗 Шаг 9: Связывание локального и удалённого репозитория

После создания репозитория GitHub покажет команды. Скопируйте и выполните:

```bash
git remote add origin https://github.com/ВАШ_ЛОГИН/ofisteh-shop.git
```

Замените `ВАШ_ЛОГИН` на ваш логин GitHub.

Переименуйте ветку в `main` (современный стандарт):

```bash
git branch -M main
```

## 🚀 Шаг 10: Отправка кода на GitHub

```bash
git push -u origin main
```

Эта команда:
- Отправляет ваш код на GitHub
- Устанавливает связь между локальной веткой `main` и удалённой
- В следующий раз можно будет просто использовать `git push`

GitHub запросит авторизацию:
- **Если используется HTTPS:** введите логин и пароль (или Personal Access Token)
- **Если используется SSH:** убедитесь, что SSH ключ добавлен в GitHub

## 🔑 Альтернатива: Использование SSH (рекомендуется)

Для более удобной работы без ввода пароля:

### 1. Генерация SSH ключа:
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

### 2. Запуск SSH агента:
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### 3. Копирование публичного ключа:
```bash
# macOS
pbcopy < ~/.ssh/id_ed25519.pub

# Windows
cat ~/.ssh/id_ed25519.pub | clip

# Linux
cat ~/.ssh/id_ed25519.pub | xclip -selection clipboard
```

### 4. Добавление ключа в GitHub:
1. Перейдите в https://github.com/settings/keys
2. Нажмите **"New SSH key"**
3. Вставьте скопированный ключ
4. Нажмите **"Add SSH key"**

### 5. Используйте SSH URL вместо HTTPS:
```bash
git remote set-url origin git@github.com:ВАШ_ЛОГИН/ofisteh-shop.git
```

## 🔄 Обновление проекта на GitHub

После внесения изменений в код:

```bash
# 1. Проверьте изменения
git status

# 2. Добавьте изменённые файлы
git add .

# 3. Создайте коммит с описанием изменений
git commit -m "Add new feature: product reviews"

# 4. Отправьте изменения на GitHub
git push
```

## 📊 Полезные команды Git

### Просмотр истории коммитов:
```bash
git log
git log --oneline  # компактный вид
```

### Отмена изменений:
```bash
# Отменить изменения в файле (до коммита)
git checkout -- filename.py

# Отменить последний коммит (файлы останутся)
git reset --soft HEAD~1

# Отменить последний коммит (файлы тоже откатятся)
git reset --hard HEAD~1
```

### Создание веток:
```bash
# Создать новую ветку
git branch feature-name

# Переключиться на ветку
git checkout feature-name

# Создать и переключиться на новую ветку
git checkout -b feature-name

# Отправить ветку на GitHub
git push -u origin feature-name
```

### Слияние веток:
```bash
# Переключиться на main
git checkout main

# Слить ветку feature-name в main
git merge feature-name
```

## 🌟 Дополнительные рекомендации

### 1. Добавьте файл LICENSE
Создайте файл `LICENSE` с лицензией (например, MIT):
```bash
# На GitHub: New file -> LICENSE -> Choose a license template
```

### 2. Обновите README.md
Убедитесь, что README содержит:
- Описание проекта
- Инструкции по установке
- Скриншоты (опционально)
- Технологии
- Лицензию

### 3. Добавьте скриншоты
Создайте папку `screenshots/` и добавьте изображения интерфейса.

### 4. Настройте GitHub Pages (опционально)
Если хотите опубликовать документацию:
1. Перейдите в Settings -> Pages
2. Выберите ветку `main` и папку `/docs`
3. Сайт будет доступен по адресу `https://ваш-логин.github.io/ofisteh-shop/`

### 5. Добавьте бейджи статуса
В README можно добавить бейджи:
```markdown
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![Django](https://img.shields.io/badge/django-4.2-green.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)
```

## ❗ Частые проблемы

### Проблема: "Permission denied (publickey)"
**Решение:** Проверьте SSH ключ:
```bash
ssh -T git@github.com
```

### Проблема: "fatal: remote origin already exists"
**Решение:** Удалите старый remote и добавьте новый:
```bash
git remote remove origin
git remote add origin https://github.com/ВАШ_ЛОГИН/ofisteh-shop.git
```

### Проблема: "Updates were rejected because the remote contains work"
**Решение:** Сначала подтяните изменения:
```bash
git pull origin main --rebase
git push
```

### Проблема: Git запрашивает пароль каждый раз
**Решение:** Используйте SSH ключ или сохраните пароль:
```bash
git config --global credential.helper store
```

## 📚 Полезные ссылки

- [Официальная документация Git](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com/)
- [Интерактивный курс Git](https://learngitbranching.js.org/)
- [Шпаргалка по Git](https://education.github.com/git-cheat-sheet-education.pdf)

## ✅ Чек-лист перед публикацией

- [ ] Установлен Git
- [ ] Настроены имя и email
- [ ] Создан файл `.gitignore`
- [ ] Инициализирован Git репозиторий (`git init`)
- [ ] Добавлены файлы (`git add .`)
- [ ] Создан первый коммит (`git commit`)
- [ ] Создан репозиторий на GitHub
- [ ] Добавлен remote (`git remote add origin ...`)
- [ ] Отправлен код на GitHub (`git push`)
- [ ] README.md содержит полную информацию
- [ ] Проверено, что сайт открывается по ссылке

---

**🎉 Поздравляем! Ваш проект теперь на GitHub!**

Теперь вы можете:
- Делиться ссылкой на проект
- Сотрудничать с другими разработчиками
- Вносить изменения и отслеживать историю
- Развернуть проект на сервере
