import type { FooterData } from '@/types/site'

interface FooterProps {
  data?: FooterData
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="relative border-t border-border-strong py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">

        <div className="grid grid-cols-12 gap-6 mb-12">
          <div className="col-span-12 md:col-span-5">
            <div className="display text-[40px] text-text mb-4">
              KULIBIN<span className="text-accent">.</span>TV
            </div>
            <p className="text-[13px] leading-[1.55] text-text-dim max-w-[36ch]">
              {data?.tagline ||
                'Открытый дневник домашней нано-фермы. Гидропоника, капельный полив, эксперименты, расчёты.'}
            </p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="label mb-5">ПЛАТФОРМЫ</div>
            <ul className="space-y-3 font-mono text-[13px]">
              <li><a href="#" className="text-text-dim hover:text-accent transition-colors">YouTube ↗</a></li>
              <li><a href="#" className="text-text-dim hover:text-accent transition-colors">Telegram ↗</a></li>
              <li><a href="#" className="text-text-dim hover:text-accent transition-colors">TikTok ↗</a></li>
              <li><a href="#" className="text-text-dim hover:text-accent transition-colors">Дзен ↗</a></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-4">
            <div className="label mb-5">ДНЕВНИК</div>
            <ul className="space-y-3 font-mono text-[13px]">
              <li className="flex items-center justify-between">
                <span className="text-text-dim">Статус</span>
                <span className="flex items-center gap-2 text-accent">
                  <span className="signal-dot !w-[4px] !h-[4px]" />
                  ON AIR
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-text-dim">Сезон</span>
                <span className="text-text">{data?.season || '2026 / БАЛКОН'}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-text-dim">Метод</span>
                <span className="text-text">ОТКРЫТЫЙ ПРОТОКОЛ</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-mono text-[11px] tracking-[0.18em] uppercase text-text-muted">
          <div className="flex items-center gap-3">
            <span>KULIBIN.TV © 2026</span>
            <span className="text-text-muted/50">/</span>
            <span>OPEN GROW PROTOCOL</span>
          </div>
          <div className="flex items-center gap-3">
            <span>made by hand · 55.7558°N 37.6173°E</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
