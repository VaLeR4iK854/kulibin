import type { CSSProperties } from 'react'
import type { HeroData } from '@/types/site'

interface HeroProps {
  data?: HeroData
}

export default function Hero({ data }: HeroProps) {
  const eyebrow = data?.eyebrow || 'ДНЕВНИК НАНО-ФЕРМЫ / ВЫПУСК 01'
  const titleLine1 = data?.titleLine1 || 'Растим еду'
  const titleLine2Prefix = data?.titleLine2Prefix || 'как '
  const titleLine2Accent = data?.titleLine2Accent || 'технологию'
  const titleLine2Suffix = data?.titleLine2Suffix || '.'
  const description =
    data?.description ||
    'Дневник инженера, который выращивает картошку и клубнику дома. Гидропоника, капельный полив, замеры, расчёты. Не как бабушка, не по привычке — по протоколу с цифрами на руках.'
  const ctaPrimaryLabel = data?.ctaPrimaryLabel || 'Подписаться'
  const ctaSecondaryLabel = data?.ctaSecondaryLabel || 'Что внутри'

  return (
    <section className="relative pt-36 lg:pt-44 pb-24 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">

        <div className="flex items-center gap-3 mb-12 reveal">
          <div className="h-px w-10 bg-accent/60" />
          <span className="label-accent">{eyebrow}</span>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-10">
            <h1
              className="display text-[clamp(44px,7.6vw,128px)] !leading-[1.02] reveal"
              style={{ '--reveal-delay': '100ms' } as CSSProperties}
            >
              <span className="block text-text">{titleLine1}</span>
              <span className="block">
                <span className="text-text-muted">{titleLine2Prefix}</span>
                <span className="text-accent">{titleLine2Accent}</span>
                <span className="text-text">{titleLine2Suffix}</span>
              </span>
            </h1>
          </div>
        </div>

        <div className="mt-16 lg:mt-20 grid grid-cols-12 gap-6 lg:gap-10 items-end">
          <div
            className="col-span-12 lg:col-span-6 reveal"
            style={{ '--reveal-delay': '250ms' } as CSSProperties}
          >
            <p className="text-[18px] lg:text-[20px] leading-[1.5] text-text-dim max-w-[52ch]">
              {description}
            </p>
          </div>

          <div
            className="col-span-12 lg:col-span-6 flex flex-wrap items-center gap-4 lg:justify-end reveal"
            style={{ '--reveal-delay': '400ms' } as CSSProperties}
          >
            <a
              href="#channels"
              className="group inline-flex items-center gap-3 bg-accent text-bg px-6 h-12 font-mono text-[12px] tracking-[0.18em] uppercase font-medium hover:bg-signal transition-colors"
            >
              <span className="signal-dot !bg-bg !shadow-none" />
              {ctaPrimaryLabel}
              <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#manifesto"
              className="inline-flex items-center gap-3 px-6 h-12 font-mono text-[12px] tracking-[0.18em] uppercase text-text border border-border-strong hover:border-accent/60 hover:text-accent transition-colors"
            >
              {ctaSecondaryLabel}
              <span>↓</span>
            </a>
          </div>
        </div>

        <div
          className="mt-20 lg:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 reveal"
          style={{ '--reveal-delay': '550ms' } as CSSProperties}
        >
          <div className="border-l border-border-strong pl-4">
            <div className="label mb-2">МЕТОД</div>
            <div className="font-mono text-[13px] text-text">ОТКРЫТЫЙ ПРОТОКОЛ</div>
          </div>
          <div className="border-l border-border-strong pl-4">
            <div className="label mb-2">СЕЗОН</div>
            <div className="font-mono text-[13px] text-text">2026 / БАЛКОН</div>
          </div>
          <div className="border-l border-border-strong pl-4">
            <div className="label mb-2">КУЛЬТУРЫ</div>
            <div className="font-mono text-[13px] text-text">КАРТОФЕЛЬ · КЛУБНИКА</div>
          </div>
          <div className="border-l border-border-strong pl-4">
            <div className="label mb-2">АВТОР</div>
            <div className="font-mono text-[13px] text-text">КУЛИБИН</div>
          </div>
        </div>

      </div>

      <div className="absolute hidden lg:block top-32 right-10 text-text-muted">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="60" cy="60" r="58" />
          <circle cx="60" cy="60" r="40" />
          <circle cx="60" cy="60" r="22" />
          <circle cx="60" cy="60" r="2" fill="currentColor" />
          <line x1="0" y1="60" x2="120" y2="60" />
          <line x1="60" y1="0" x2="60" y2="120" />
        </svg>
      </div>
    </section>
  )
}
