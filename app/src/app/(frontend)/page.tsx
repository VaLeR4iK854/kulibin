import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import Telemetry from '@/components/Telemetry'
import Manifesto from '@/components/Manifesto'
import Protocols from '@/components/Protocols'
import Roadmap from '@/components/Roadmap'
import Transmissions from '@/components/Transmissions'
import Channels from '@/components/Channels'
import FinalCTA from '@/components/FinalCTA'
import type { HeroData, ManifestoData, RoadmapPhase, MetricItem, ChannelItem, VideoCardItem } from '@/types/site'

export const dynamic = 'force-dynamic'

async function getSiteData(): Promise<{
  hero?: HeroData
  metrics?: MetricItem[]
  manifesto?: ManifestoData
  roadmap?: RoadmapPhase[]
  channels?: ChannelItem[]
  videos?: VideoCardItem[]
}> {
  try {
    const { getPayloadClient } = await import('@/lib/payload')
    const payload = await getPayloadClient()

    const [siteSettings, videosResult] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
      payload
        .find({
          collection: 'videos',
          where: { status: { equals: 'published' } },
          sort: '-publishedAt',
          limit: 3,
        })
        .catch(() => ({ docs: [] })),
    ])

    const videos: VideoCardItem[] = (videosResult.docs as Record<string, unknown>[]).map((v, i) => ({
      code: `EP-${String(i + 1).padStart(3, '0')}`,
      duration: (v.duration as string) || '—',
      title: (v.title as string) || '',
      subtitle: (v.description as string) || '',
      tag: ((v.category as string) || '').toUpperCase(),
      color:
        i === 0
          ? 'from-accent/20 to-transparent'
          : i === 1
            ? 'from-accent/15 to-transparent'
            : 'from-accent/10 to-transparent',
      slug: v.slug as string,
    }))

    const settings = siteSettings as Record<string, unknown> | null

    return {
      hero: settings?.hero as HeroData | undefined,
      metrics: settings?.metrics as MetricItem[] | undefined,
      manifesto: settings?.manifesto as ManifestoData | undefined,
      roadmap: settings?.roadmap as RoadmapPhase[] | undefined,
      channels: settings?.channels as ChannelItem[] | undefined,
      videos,
    }
  } catch {
    return {}
  }
}

export default async function HomePage() {
  const { hero, metrics, manifesto, roadmap, channels, videos } = await getSiteData()

  return (
    <main>
      <Hero data={hero} />
      <Ticker />
      <Telemetry metrics={metrics} />
      <Manifesto data={manifesto} />
      <Protocols />
      <Roadmap phases={roadmap} />
      <Transmissions videos={videos} />
      <Channels channels={channels} />
      <FinalCTA />
    </main>
  )
}
