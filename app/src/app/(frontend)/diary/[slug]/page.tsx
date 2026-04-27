import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

async function getDiaryEntry(id: string) {
  try {
    const { getPayloadClient } = await import('@/lib/payload')
    const payload = await getPayloadClient()
    const entry = await payload.findByID({ collection: 'diary', id })
    return entry
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const entry = await getDiaryEntry(slug)
  if (!entry) return { title: 'Запись не найдена — KULIBIN.TV' }

  return {
    title: `${entry.title as string} — KULIBIN.TV`,
    description: `Дневниковая запись от ${new Date(entry.date as string).toLocaleDateString('ru-RU')}`,
  }
}

export default async function DiaryEntryPage({ params }: Props) {
  const { slug } = await params
  const entry = await getDiaryEntry(slug)

  if (!entry) notFound()

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-[800px]">

          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-10 bg-accent/60" />
            <span className="label-accent">
              {new Date(entry.date as string).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>

          <h1 className="display text-[clamp(32px,4vw,60px)] text-text mb-12 !leading-[1.05]">
            {entry.title as string}
          </h1>

          <div className="text-text-muted font-mono text-[13px] tracking-[0.1em]">
            [Содержание записи загружается из Payload CMS]
          </div>

        </div>
      </div>
    </main>
  )
}
