import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kulibin.tv'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/articles`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/diary`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
  ]

  try {
    const { getPayloadClient } = await import('@/lib/payload')
    const payload = await getPayloadClient()

    const [articles, videos, diary] = await Promise.all([
      payload.find({ collection: 'articles', where: { status: { equals: 'published' } }, limit: 1000 }),
      payload.find({ collection: 'videos', where: { status: { equals: 'published' } }, limit: 1000 }),
      payload.find({ collection: 'diary', limit: 1000 }),
    ])

    const articleUrls: MetadataRoute.Sitemap = articles.docs.map((a: Record<string, unknown>) => ({
      url: `${siteUrl}/articles/${a.slug as string}`,
      lastModified: new Date(a.publishedAt as string),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

    const videoUrls: MetadataRoute.Sitemap = videos.docs.map((v: Record<string, unknown>) => ({
      url: `${siteUrl}/videos/${v.slug as string}`,
      lastModified: new Date(v.publishedAt as string),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    const diaryUrls: MetadataRoute.Sitemap = diary.docs.map((d: Record<string, unknown>) => ({
      url: `${siteUrl}/diary/${d.id as string}`,
      lastModified: new Date(d.date as string),
      changeFrequency: 'never' as const,
      priority: 0.5,
    }))

    return [...staticPages, ...articleUrls, ...videoUrls, ...diaryUrls]
  } catch {
    return staticPages
  }
}
