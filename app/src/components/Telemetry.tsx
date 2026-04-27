import type { CSSProperties } from 'react'
import type { MetricItem } from '@/types/site'

interface TelemetryProps {
  metrics?: MetricItem[]
}

const defaultMetrics: MetricItem[] = [
  {
    code: '01',
    label: 'УРОЖАЙ',
    value: '12.4',
    unit: 'КГ',
    caption: 'С одного ведра картофеля за сезон. Метод KU-V1 против 6.2 кг в открытом грунте.',
  },
  {
    code: '02',
    label: 'ВРЕМЯ / НЕДЕЛЯ',
    value: '1.2',
    unit: 'Ч',
    caption: 'Среднее время на уход. Автополив и сенсоры влажности убирают рутину.',
  },
  {
    code: '03',
    label: 'ЭКОНОМИЯ ВОДЫ',
    value: '94',
    unit: '%',
    caption: 'Капельный полив и замкнутый контур гидропоники против поливочного шланга.',
  },
  {
    code: '04',
    label: 'ПЕСТИЦИДОВ',
    value: '0',
    unit: '',
    caption: 'В системе. Ноль. Закрытому контуру они просто не нужны.',
  },
]

export default function Telemetry({ metrics }: TelemetryProps) {
  const stats = metrics && metrics.length > 0 ? metrics : defaultMetrics

  return (
    <section className="relative py-24 lg:py-32 border-t border-border">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">

        <div className="flex items-center justify-between mb-16 lg:mb-20 reveal">
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-accent/60" />
            <span className="label-accent">02 / ЦИФРЫ СЕЗОНА</span>
          </div>
          <span className="hidden md:inline label">ЦЕЛЕВЫЕ ПОКАЗАТЕЛИ 2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border-strong">
          {stats.map((stat, i) => (
            <div
              key={stat.code || i}
              className="relative py-10 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0 reveal"
              style={{ '--reveal-delay': `${i * 120}ms` } as CSSProperties}
            >
              <div className="flex items-center justify-between mb-6 lg:mb-8">
                <span className="label-accent">№ {stat.code}</span>
                <span className="label">{stat.label}</span>
              </div>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="display text-[72px] lg:text-[96px] text-text tabular-nums">
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="font-mono text-[18px] lg:text-[22px] text-accent ml-1">
                    {stat.unit}
                  </span>
                )}
              </div>

              <p className="text-[14px] leading-[1.55] text-text-dim max-w-[28ch]">{stat.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
