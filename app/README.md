# KULIBIN.TV

Дневник домашней нано-фермы. Next.js 16 + Payload CMS 3.

## Стек

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Payload CMS 3
- PostgreSQL 16
- Geist (шрифт)

## Разработка

Скопируй `.env.example` в `.env` и заполни переменные:

```bash
cp .env.example .env
```

Запусти базу данных и дев-сервер:

```bash
npm run dev
```

При первом запуске Payload создаст таблицы и попросит создать первого пользователя на `http://localhost:3000/admin`.

## Команды

```bash
npm run dev              # дев-сервер
npm run devsafe          # очистить кеш и запустить дев
npm run build            # билд для продакшена
npm run start            # запустить билд
npm run generate:types   # сгенерировать TypeScript типы из схемы Payload
npm run generate:importmap # сгенерировать карту импортов для Payload
```

## Деплой через Docker

Убедись, что `.env` заполнен, затем:

```bash
docker compose up -d
```

Приложение будет доступно на `http://localhost:3000`.

PostgreSQL слушает на `127.0.0.1:5435`.

## Структура

```
src/
  app/
    (frontend)/   # публичный сайт
    (payload)/    # Payload CMS роуты
  collections/   # схемы коллекций Payload
  globals/       # глобальные настройки Payload
  components/    # React компоненты
  lib/           # утилиты
```
