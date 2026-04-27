import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Дневник — KULIBIN.TV',
  description: 'Хроника домашней нано-фермы. Ежедневные записи, наблюдения, открытия.',
}

async function getDiaryEntries() {
  try {
    const { getPayloadClient } = await import('@/lib/payload')
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'diary',
      sort: '-date',
      limit: 30,
    })
    return result.docs
  } catch {
    return []
  }
}

export default async function DiaryPage() {
  const entries = await getDiaryEntries()

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">

        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-10 bg-accent/60" />
          <span className="label-accent">ДНЕВНИК</span>
        </div>

        <h1 className="display text-[clamp(44px,6vw,96px)] text-text mb-16">
          Хроника сезона
        </h1>

        {entries.length === 0 ? (
          <div className="border border-border p-12 text-center">
            <p className="font-mono text-[13px] tracking-[0.1em] uppercase text-text-muted">
              Первые записи появятся скоро
            </p>
          </div>
        ) : (
          <div className="space-y-px bg-border">
            {entries.map((entry: Record<string, unknown>) => (
              <article key={entry.id as string} className="group bg-bg p-8 hover:bg-bg-elevated transition-colors">
                <Link href={`/diary/${entry.id as string}`}>
                  <div className="flex items-start gap-8">
                    <div className="shrink-0">
                      <div className="label-accent tabular-nums">
                        {new Date(entry.date as string).toLocaleDateString('ru-RU', {
                          day: '2-digit',
                          month: '2-digit',
                        })}
                      </div>
                      <div className="font-mono text-[11px] text-text-muted">
                        {new Date(entry.date as string).getFullYear()}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="display text-[24px] text-text mb-2 group-hover:text-accent transition-colors">
                        {entry.title as string}
                      </h2>
                    </div>
                    <span className="font-mono text-[14px] text-text-muted group-hover:text-accent transition-all">→</span>
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
