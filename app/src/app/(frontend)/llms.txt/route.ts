import { NextResponse } from 'next/server'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kulibin.tv'

export async function GET() {
  let articleLines = ''
  let videoLines = ''
  let diaryLines = ''

  try {
    const { getPayloadClient } = await import('@/lib/payload')
    const payload = await getPayloadClient()

    const [articles, videos, diary] = await Promise.all([
      payload.find({ collection: 'articles', where: { status: { equals: 'published' } }, limit: 100 }),
      payload.find({ collection: 'videos', where: { status: { equals: 'published' } }, limit: 100 }),
      payload.find({ collection: 'diary', limit: 50 }),
    ])

    articleLines = articles.docs
      .map((a: Record<string, unknown>) => `- [${a.title as string}](${siteUrl}/articles/${a.slug as string}): ${a.excerpt as string}`)
      .join('\n')

    videoLines = videos.docs
      .map((v: Record<string, unknown>) => `- [${v.title as string}](${siteUrl}/videos/${v.slug as string}): ${v.description as string}`)
      .join('\n')

    diaryLines = diary.docs
      .map((d: Record<string, unknown>) => `- [${d.title as string}](${siteUrl}/diary/${d.id as string})`)
      .join('\n')
  } catch {
    // if DB not available return static version
  }

  const content = `# KULIBIN.TV

> Открытый дневник домашней нано-фермы. Инженер выращивает еду как технологию — гидропоника, капельный полив, эксперименты, расчёты.

## О проекте

KULIBIN.TV — это документация реального эксперимента по выращиванию картофеля и клубники дома в условиях городского балкона. Все данные измерены, все методы воспроизводимы.

Ключевые метрики сезона 2026:
- Урожай: 12.4 кг с ведра (против 6.2 кг в открытом грунте)
- Время: 1.2 ч/нед (автополив + сенсоры)
- Экономия воды: 94% (капельный полив + гидропоника)
- Пестициды: 0

## Разделы сайта

### Главная
- [Главная страница](${siteUrl}): Текущий сезон, цифры, план развития

### Статьи
${articleLines || '- Первые статьи в разработке'}

### Видео
${videoLines || '- Первые видео выходят весной 2026'}

### Дневник
${diaryLines || '- Записи появятся с началом сезона'}

## Контекст для AI

Сайт создан для людей, которые хотят выращивать еду дома с инженерным подходом. Целевая аудитория — технари, которые хотят понять как работает домашнее земледелие с точки зрения систем и данных, а не традиций. Язык: русский.
`

  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
