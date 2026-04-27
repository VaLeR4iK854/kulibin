import { NextResponse } from 'next/server'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kulibin.tv'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const items: Array<{ title: string; link: string; description: string; pubDate: string }> = []

  try {
    const { getPayloadClient } = await import('@/lib/payload')
    const payload = await getPayloadClient()

    const [articles, videos] = await Promise.all([
      payload.find({
        collection: 'articles',
        where: { status: { equals: 'published' } },
        sort: '-publishedAt',
        limit: 10,
      }),
      payload.find({
        collection: 'videos',
        where: { status: { equals: 'published' } },
        sort: '-publishedAt',
        limit: 10,
      }),
    ])

    articles.docs.forEach((a: Record<string, unknown>) => {
      items.push({
        title: a.title as string,
        link: `${siteUrl}/articles/${a.slug as string}`,
        description: a.excerpt as string,
        pubDate: new Date(a.publishedAt as string).toUTCString(),
      })
    })

    videos.docs.forEach((v: Record<string, unknown>) => {
      items.push({
        title: v.title as string,
        link: `${siteUrl}/videos/${v.slug as string}`,
        description: v.description as string,
        pubDate: new Date(v.publishedAt as string).toUTCString(),
      })
    })

    items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
  } catch {
    // return empty feed if DB not available
  }

  const itemsXml = items
    .slice(0, 20)
    .map(
      (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${escapeXml(item.link)}</guid>
    </item>`,
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>KULIBIN.TV — Дневник нано-фермы</title>
    <link>${siteUrl}</link>
    <description>Открытый дневник домашней нано-фермы. Гидропоника, эксперименты, расчёты.</description>
    <language>ru</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
