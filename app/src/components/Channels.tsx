import type { CSSProperties } from 'react'
import type { ChannelItem } from '@/types/site'

interface ChannelsProps {
  channels?: ChannelItem[]
}

const defaultChannels: ChannelItem[] = [
  {
    code: '№ 01',
    name: 'YouTube',
    handle: '@kulibin',
    description: 'Длинные эксперименты, сборки, разборы',
    status: 'СКОРО',
  },
  {
    code: '№ 02',
    name: 'Telegram',
    handle: '@kulibin',
    description: 'Ежедневный дневник, чертежи, ответы',
    status: 'СКОРО',
  },
  {
    code: '№ 03',
    name: 'TikTok',
    handle: '@kulibin',
    description: 'Короткие лайфхаки, результаты',
    status: 'СКОРО',
  },
  {
    code: '№ 04',
    name: 'Дзен',
    handle: '@kulibin',
    description: 'Текстовые версии экспериментов',
    status: 'СКОРО',
  },
]

export default function Channels({ channels }: ChannelsProps) {
  const items = channels && channels.length > 0 ? channels : defaultChannels

  return (
    <section id="channels" className="relative py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">

        <div className="flex items-end justify-between mb-16 lg:mb-20 reveal">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-accent/60" />
              <span className="label-accent">07 / ПЛАТФОРМЫ</span>
            </div>
            <h2 className="display text-[40px] lg:text-[64px] text-text">
              Где смотреть<span className="text-accent">.</span>
            </h2>
          </div>
          <span className="hidden md:inline label">4 ПЛАТФОРМЫ · 1 НИК</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {items.map((ch, i) => (
            <a
              key={ch.code || i}
              href={ch.url || '#'}
              className="group relative bg-bg p-8 lg:p-10 hover:bg-bg-elevated transition-colors reveal"
              style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}
            >
              <div className="flex items-start justify-between mb-12">
                <div className="flex items-center gap-3">
                  <span className="signal-dot opacity-60 group-hover:opacity-100" />
                  <span className="label-accent">{ch.code}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted">
                    {ch.status}
                  </span>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <h3 className="display text-[44px] lg:text-[56px] text-text mb-2 group-hover:text-accent transition-colors">
                    {ch.name}
                  </h3>
                  <p className="font-mono text-[13px] text-text-dim mb-3">{ch.handle}</p>
                  <p className="text-[14px] text-text-dim max-w-[36ch]">{ch.description}</p>
                </div>
                <span className="font-mono text-[24px] text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all">
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
