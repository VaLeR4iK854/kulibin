import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Статьи — KULIBIN.TV',
  description: 'Все статьи и эксперименты дневника домашней нано-фермы.',
}

async function getArticles() {
  try {
    const { getPayloadClient } = await import('@/lib/payload')
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'articles',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 20,
    })
    return result.docs
  } catch {
    return []
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">

        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-10 bg-accent/60" />
          <span className="label-accent">СТАТЬИ</span>
        </div>

        <h1 className="display text-[clamp(44px,6vw,96px)] text-text mb-16">
          Все эксперименты
        </h1>

        {articles.length === 0 ? (
          <div className="border border-border p-12 text-center">
            <p className="font-mono text-[13px] tracking-[0.1em] uppercase text-text-muted">
              Скоро — первые статьи в разработке
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {articles.map((article: Record<string, unknown>) => (
              <article
                key={article.id as string}
                className="group bg-bg p-8 hover:bg-bg-elevated transition-colors"
              >
                <Link href={`/articles/${article.slug as string}`}>
                  <div className="label-accent mb-4">
                    {new Date(article.publishedAt as string).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                  <h2 className="display text-[24px] lg:text-[28px] text-text mb-4 group-hover:text-accent transition-colors leading-[1.1]">
                    {article.title as string}
                  </h2>
                  <p className="text-[14px] leading-[1.6] text-text-dim">
                    {article.excerpt as string}
                  </p>
                  <div className="mt-6 font-mono text-[12px] tracking-[0.1em] uppercase text-accent">
                    Читать →
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

      </div>
    </main>
  )
}
