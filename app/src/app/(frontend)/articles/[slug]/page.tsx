import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

async function getArticle(slug: string) {
  try {
    const { getPayloadClient } = await import('@/lib/payload')
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'articles',
      where: {
        and: [
          { slug: { equals: slug } },
          { status: { equals: 'published' } },
        ],
      },
      limit: 1,
    })
    return result.docs[0] || null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: 'Статья не найдена — KULIBIN.TV' }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kulibin.tv'

  return {
    title: `${article.title as string} — KULIBIN.TV`,
    description: article.excerpt as string,
    openGraph: {
      title: article.title as string,
      description: article.excerpt as string,
      type: 'article',
      publishedTime: article.publishedAt as string,
      url: `${siteUrl}/articles/${slug}`,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kulibin.tv'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Кулибин',
    },
    publisher: {
      '@type': 'Organization',
      name: 'KULIBIN.TV',
      url: siteUrl,
    },
    url: `${siteUrl}/articles/${slug}`,
  }

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-[1400px] px-6 lg:px-10">

        <div className="max-w-[800px]">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-10 bg-accent/60" />
            <span className="label-accent">
              {new Date(article.publishedAt as string).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>

          <h1 className="display text-[clamp(36px,5vw,72px)] text-text mb-8 !leading-[1.05]">
            {article.title as string}
          </h1>

          <p className="text-[18px] leading-[1.6] text-text-dim mb-16 max-w-[60ch]">
            {article.excerpt as string}
          </p>
        </div>

        {(() => {
          const metrics = article.metrics as
            | Partial<{
                yieldKg: number
                waterUsedLiters: number
                timeSpentHours: number
                costRub: number
              }>
            | null
            | undefined
          if (!metrics) return null
          return (
            <div className="max-w-[800px] mb-16 grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.yieldKg != null && (
                <div className="border border-border-strong p-4">
                  <div className="label mb-2">УРОЖАЙ</div>
                  <div className="display text-[32px] text-accent tabular-nums">
                    {metrics.yieldKg}
                    <span className="text-[16px] ml-1">кг</span>
                  </div>
                </div>
              )}
              {metrics.waterUsedLiters != null && (
                <div className="border border-border-strong p-4">
                  <div className="label mb-2">ВОДА</div>
                  <div className="display text-[32px] text-accent tabular-nums">
                    {metrics.waterUsedLiters}
                    <span className="text-[16px] ml-1">л</span>
                  </div>
                </div>
              )}
              {metrics.timeSpentHours != null && (
                <div className="border border-border-strong p-4">
                  <div className="label mb-2">ВРЕМЯ</div>
                  <div className="display text-[32px] text-accent tabular-nums">
                    {metrics.timeSpentHours}
                    <span className="text-[16px] ml-1">ч</span>
                  </div>
                </div>
              )}
              {metrics.costRub != null && (
                <div className="border border-border-strong p-4">
                  <div className="label mb-2">БЮДЖЕТ</div>
                  <div className="display text-[32px] text-accent tabular-nums">
                    {metrics.costRub}
                    <span className="text-[16px] ml-1">₽</span>
                  </div>
                </div>
              )}
            </div>
          )
        })()}

        <div className="max-w-[800px] prose prose-invert prose-lg text-text-dim leading-[1.7]">
          <p className="text-text-muted font-mono text-[13px] tracking-[0.1em]">
            [Содержание статьи загружается из Payload CMS]
          </p>
        </div>

      </article>
    </main>
  )
}
