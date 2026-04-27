# Выбор движка для kulibin.tv

Сравнительное исследование CMS / контент-движков для kulibin.tv. Критерии: работа из РФ, простой UI для папы (не разработчик), интеграция с Astro + GitHub Pages, бесплатно или дёшево.

## Контекст

- Текущий стек: Astro 6 + Tailwind 4 + GitHub Pages + DNS Cloudflare (DNS only, без proxy)
- Деплой автоматический через GitHub Actions при push в main
- Контент: статьи, эмбеды видео (YouTube/Rutube/VK Video, не self-hosted), фото, чертежи, таблицы данных
- Редактор - папа, не разработчик. Доступ из РФ обязателен
- Бюджет - бесплатно или до $20/мес

## Критическое ограничение - блокировки в РФ (апрель 2026)

| Сервис | Статус в РФ | Влияние на CMS |
|---|---|---|
| **Cloudflare Workers / Pages** | заблокирован, throttling | нельзя использовать как OAuth backend |
| **Netlify** | заблокирован (с февраля 2026) | Decap CMS с Netlify Identity не работает |
| **Vercel** | частично работает, отдельные домены блокируются | риск использования Tina Cloud / Vercel-only |
| **GitHub** | работает с throttling, иногда замедления | git операции работают, но медленнее |
| **GitHub Pages** | работает | подтверждено - kulibin.tv открывается |

**Вывод:** любая зависимость от Cloudflare Workers, Netlify, Vercel-only сервисов = риск. Нужен путь через PAT (Personal Access Token) напрямую к GitHub API.

## Категории решений

### 1. Git-based CMS (commit прямо в репо)

Это идеальная категория для нас - admin UI живёт на самом сайте, контент в git, никаких отдельных баз данных.

#### Sveltia CMS ⭐ Рекомендация

- **Что это:** современный преемник Decap CMS / Netlify CMS. 5x меньше bundle (300KB), GraphQL вместо 50 REST вызовов, mobile-friendly, WCAG 2.2 accessibility
- **Где живёт admin:** на самом сайте по пути /admin (kulibin.tv/admin)
- **Авторизация:** GitHub OAuth ИЛИ Personal Access Token (PAT). PAT - самый простой и не требует внешних сервисов
- **Цена:** бесплатно, MIT license, open source
- **Статус:** beta, GA scheduled на mid-2026, но уже используется production проектами включая US government
- **Поддержка Astro:** прямая, есть готовая интеграция astro-sveltia-cms
- **Хранение медиа:** в git (или S3-совместимое опционально), GitHub лимит 100MB на файл
- **Минусы:** нет custom widgets как в Decap, beta status (но активно поддерживается)
- **Из РФ:** работает - всё через GitHub API напрямую, без CF Workers

#### Decap CMS

- **Что это:** прародитель git-based CMS, бывший Netlify CMS
- **Минусы:** maintenance заброшен, hundreds of open issues, dated UI, не mobile-friendly
- **OAuth:** обычно через Netlify (заблокирован в РФ) или CF Workers (заблокирован) - проблемно
- **Вердикт:** проигрывает Sveltia по всем фронтам

#### Keystatic (от Thinkmill)

- **Что это:** молодой git-based CMS, специально под Astro. TypeScript schemas, отличная типизация
- **Минусы:** admin UI требует Node.js runtime (нельзя deploy на pure GH Pages). Нужен dual-deploy: основной сайт на GH Pages + admin на Netlify/Vercel/own VPS
- **Из РФ:** admin будет на blocked-сервисе (Netlify) или отдельном VPS - усложнение
- **Вердикт:** хорош технически, но dual-deploy убивает простоту в нашем кейсе

#### Pages CMS

- **Что это:** open-source Pages CMS, простой WYSIWYG, дроп-зон для медиа, GitHub-интегрированный
- **Где admin:** pagescms.org (онлайн) или self-hosted на Vercel/etc
- **Цена:** бесплатно
- **Из РФ:** pagescms.org может работать или нет. Self-host на Vercel - риск блокировки. Можно self-host на VPS в РФ
- **Вердикт:** простой, но добавляет внешнюю зависимость, не идеален

### 2. Headless CMS (separate API)

#### TinaCMS

- **Что это:** мощный visual editor где папа кликает прямо в текст и редактирует поверх preview
- **Цена:** free tier 2 user / 100MB media. $29/мес Team plan, $49 Editorial Workflow
- **Минусы:** Tina Cloud это SaaS, требует постоянной синхронизации. Self-hosting backend - значительная инфраструктурная работа
- **Из РФ:** Tina Cloud размещён на AWS - обычно работает, но не гарантировано
- **Вердикт:** круто для бизнеса, overkill для одного автора

#### Sanity / Contentful / Storyblok / Hygraph

- Облачные SaaS. Платные тарифы $0-99+/мес
- Зависимость от чужой инфраструктуры
- Из РФ - неопределённо, возможны проблемы
- Vendor lock-in, миграция боль
- **Вердикт:** для нашего кейса избыточны

#### Strapi / Directus / Payload (self-hosted)

- Полнофункциональные backend CMS
- Требуют VPS, базу данных, DevOps
- Папа должен заходить в admin = нужен публично доступный URL
- **Вердикт:** слишком сложно для нашего масштаба

### 3. Традиционные CMS

#### WordPress

- Самый известный, миллионы плагинов
- Требует хостинг + база MySQL
- В РФ можно через Beget/Timeweb - работает 100%
- Минусы: тяжёлый, медленный, плагинная безопасность, не интегрируется с Astro без боли (можно через REST API но это лишний слой)
- **Вердикт:** проверенный, но сильно отдаляет от нашего быстрого статичного сайта

#### Ghost

- Заточен под медиа/блог. Красивый UI
- Self-hosted = $5-10/мес VPS, или Ghost Pro $9-25/мес
- Из РФ: надо self-host в РФ
- **Вердикт:** красиво, но дорого для одного автора и отдельный движок от Astro

### 4. Российские/no-code платформы

#### Tilda

- No-code, на 100% работает в РФ, удобно для не-разработчика
- Цена: 750-1500₽/мес
- Минусы: vendor lock-in полный, миграция почти невозможна, нет нашего текущего инженерного дизайна, потеря всей текущей работы
- **Вердикт:** не для нас - мы уже сделали кастомный сайт

#### Notion + super.so

- Notion блокируется в РФ (зависит от провайдера)
- Простой для папы
- Минусы: блокировка, vendor lock-in
- **Вердикт:** не подходит из-за РФ

## Рекомендация - Sveltia CMS + PAT auth

**Самый прагматичный путь для нашего кейса:**

1. Установить Sveltia CMS как dependency в наш Astro проект
2. Создать `/admin/index.html` с конфигом коллекций
3. Использовать PAT (Personal Access Token) для авторизации
4. Папа заходит на kulibin.tv/admin, вводит свой PAT один раз, дальше живёт в admin UI

### Почему именно так

**Плюсы:**
- ✅ Бесплатно навсегда
- ✅ Admin живёт на kulibin.tv/admin - всё в одном месте, тот же домен, тот же hosting
- ✅ Нет зависимости от CF Workers, Netlify, Vercel - всё через GitHub API напрямую
- ✅ Git-based - вся история редактирования в git, бэкапы автоматом, можно откатить
- ✅ Mobile-friendly - папа может постить с телефона
- ✅ Активная разработка, mature compatibility с Decap config
- ✅ Vendor lock-in минимальный - контент в нашем репо, можно сменить движок без потерь

**Минусы:**
- ⚠️ PAT auth - надо один раз создать токен в настройках GitHub. Помогу папе с этим
- ⚠️ Beta status - но 1.0 ожидается mid-2026, активно используется в production
- ⚠️ Нет visual editing как в Tina (но для нашего кейса не критично - редактируется markdown с preview)

### Альтернативы если Sveltia не зайдёт

| Вариант | Когда выбрать |
|---|---|
| **Decap CMS** | если нужны custom widgets и стабильность 1.0 (но maintenance вопрос) |
| **Keystatic** | если готов завести второй deploy (Netlify/own VPS) для admin UI |
| **WordPress на Beget** | если папе нужен максимально знакомый и проверенный UI а скорость сайта неважна |
| **TinaCMS** | если редактор critical и готов платить $29/мес за визуальный редактор |

## Технический план перехода на Sveltia CMS

1. `npm install sveltia-cms` (или подключить через CDN)
2. Создать `public/admin/index.html` с инициализацией CMS
3. Создать `public/admin/config.yml` с описанием collections (статьи, видео, эксперименты, дневник)
4. Перенести существующий контент в `src/content/` collections (Astro Content Collections)
5. Настроить GitHub PAT для папы
6. Обучить папу за 30 минут

Время реализации - 2-4 часа разработки.

## Структура контента (предлагаю)

```
src/content/
├── articles/         # длинные статьи, эксперименты с замерами
├── transmissions/    # видео-посты (заголовок + описание + youtube/rutube embed)
├── diary/            # короткие дневниковые записи
├── plans/            # чертежи, DIY-сборки
└── pages/            # статичные страницы (О проекте, Контакты)

public/uploads/       # картинки и PDF, drag-n-drop из админки
```

## Что НЕ хранить в репо

- Видео (используем embed с YouTube/Rutube/VK Video)
- Большие файлы > 50MB (GitHub предупреждает после 50MB, ругается на 100MB)
- Авторские чертежи в исходных форматах (только PDF/PNG для публикации)

---

**Дата отчёта:** 2026-04-27

## Источники

- [The Complete Astro CMS Guide - DEV Community](https://dev.to/opacedigitalagency/the-complete-headless-cms-guide-for-astro-comparing-13-jamstack-js-cms-platforms-566f)
- [Best 7 CMSs For Astro in 2026 - Themefisher](https://themefisher.com/best-cms-for-astro)
- [Decap CMS vs Tina CMS comparison 2026 - dasroot.net](https://dasroot.net/posts/2026/03/decap-cms-vs-tina-cms-vs-forestry-2026-comparison/)
- [Sveltia CMS GitHub repo](https://github.com/sveltia/sveltia-cms)
- [Sveltia CMS docs - GitHub Backend](https://sveltiacms.app/en/docs/backends/github)
- [Keystatic Astro integration](https://docs.astro.build/en/guides/cms/keystatic/)
- [Pages CMS official site](https://pagescms.org/)
- [Russia internet censorship 2026 - Zona Media](https://en.zona.media/article/2026/04/07/russian_internet_censorship_2026)
- [Cloudflare blocked in Russia - Cloudflare Community](https://community.cloudflare.com/t/cloudflare-is-blocked-in-russia-solution/811328)
- [Netlify blocking Roskomnadzor - Netlify Forums](https://answers.netlify.com/t/netlify-blocking-by-roskomnadzor/159800)
- [TinaCMS Plans & Pricing](https://tina.io/pricing)
