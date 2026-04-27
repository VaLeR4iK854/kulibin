import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

async function getVideo(slug: string) {
  try {
    const { getPayloadClient } = await import('@/lib/payload')
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'videos',
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

function getEmbedUrl(provider: string, videoId: string): string {
  switch (provider) {
    case 'youtube':
      return `https://www.youtube.com/embed/${videoId}`
    case 'rutube':
      return `https://rutube.ru/play/embed/${videoId}`
    case 'vk-video':
      return `https://vk.com/video_ext.php?oid=${videoId}`
    default:
      return ''
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const video = await getVideo(slug)
  if (!video) return { title: 'Видео не найдено — KULIBIN.TV' }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kulibin.tv'

  return {
    title: `${video.title as string} — KULIBIN.TV`,
    description: video.description as string,
    openGraph: {
      title: video.title as string,
      description: video.description as string,
      type: 'video.other',
      url: `${siteUrl}/videos/${slug}`,
    },
  }
}

export default async function VideoPage({ params }: Props) {
  const { slug } = await params
  const video = await getVideo(slug)

  if (!video) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kulibin.tv'
  const provider = video.videoProvider as string
  const videoId = video.videoId as string
  const embedUrl = getEmbedUrl(provider, videoId)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    uploadDate: video.publishedAt,
    duration: video.duration ? `PT${(video.duration as string).replace(':', 'M')}S` : undefined,
    author: {
      '@type': 'Person',
      name: 'Кулибин',
    },
    publisher: {
      '@type': 'Organization',
      name: 'KULIBIN.TV',
      url: siteUrl,
    },
    url: `${siteUrl}/videos/${slug}`,
  }

  const categoryLabels: Record<string, string> = {
    experiment: 'ЭКСПЕРИМЕНТ',
    build: 'СБОРКА',
    calculation: 'РАСЧЁТ',
    diary: 'ДНЕВНИК',
  }

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">

        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-10 bg-accent/60" />
          <span className="label-accent">
            {categoryLabels[video.category as string] || (video.category as string)}
          </span>
          {video.duration && (
            <span className="font-mono text-[11px] text-text-muted tabular-nums">
              {video.duration as string}
            </span>
          )}
        </div>

        <h1 className="display text-[clamp(36px,5vw,72px)] text-text mb-8 max-w-[900px] !leading-[1.05]">
          {video.title as string}
        </h1>

        <p className="text-[18px] leading-[1.6] text-text-dim mb-12 max-w-[60ch]">
          {video.description as string}
        </p>

        {embedUrl && (
          <div className="relative w-full aspect-video bg-bg-elevated border border-border mb-16 max-w-[1000px]">
            <iframe
              src={embedUrl}
              title={video.title as string}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        )}

        <div className="mt-4 font-mono text-[12px] tracking-[0.1em] uppercase text-text-muted">
          {new Date(video.publishedAt as string).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </div>

      </div>
    </main>
  )
}
