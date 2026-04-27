# kulibin.tv

Дневник домашней нано-фермы. Гидропоника, капельный полив, эксперименты, расчёты.

## Структура

```
kulibin/
├── app/        ← Next.js 15 + Payload CMS 3 (frontend + admin + API)
└── docs/       ← исследования, заметки, гайды
```

## Стек

- Next.js 15 (App Router)
- Payload CMS 3 (встроена в /app)
- Tailwind 4 + Geist Sans/Mono
- PostgreSQL 16
- Caddy 2 (reverse proxy + SSL) - на сервере поверх mailcow nginx
- Hetzner CCX (Helsinki) + Docker Compose

## Развёртывание

Production: kulibin.tv (Hetzner 89.167.28.164, изолированный Docker stack)

См. `docs/` для подробностей.
