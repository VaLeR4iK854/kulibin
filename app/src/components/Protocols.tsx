import type { CSSProperties } from 'react'

const protocols = [
  {
    code: 'PR-001',
    title: 'Эксперименты',
    desc: 'A/B тесты урожайности. 4 ведра, 4 метода, замеры через 90 дней. Графики, расчёты, выводы без воды.',
    items: ['Картофель в вёдрах vs грунт', 'Гидропоника vs аэропоника', 'Расход воды по методам'],
  },
  {
    code: 'PR-002',
    title: 'DIY-системы',
    desc: 'Сборки от нуля. Гидропоника, капельный полив, аэропоника, мини-теплица. С ценой каждой детали и ссылками.',
    items: ['NFT-установка для клубники', 'Капельный полив для балкона', 'Контроллер влажности на ESP32'],
  },
  {
    code: 'PR-003',
    title: 'Расчёты',
    desc: 'Калькуляторы окупаемости и потребления. Прежде чем сажать - считаем. Сколько метров, сколько часов, сколько кг.',
    items: ['Сколько вёдер нужно семье на год', 'Окупаемость гидропоники', 'Площадь для самообеспечения'],
  },
  {
    code: 'PR-004',
    title: 'Дневник',
    desc: 'Сезонная хроника. Что посеяли, что прижилось, что погибло, что переделали. Честно, без глянца.',
    items: ['Лог сезона 2026', 'Разборы факапов', 'Ответы подписчикам'],
  },
]

export default function Protocols() {
  return (
    <section id="protocols" className="relative py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">

        <div className="flex items-center justify-between mb-16 lg:mb-20 reveal">
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-accent/60" />
            <span className="label-accent">04 / РУБРИКИ</span>
          </div>
          <span className="hidden md:inline label">4 НАПРАВЛЕНИЯ ДНЕВНИКА</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {protocols.map((p, i) => (
            <div
              key={p.code}
              className="group relative bg-bg p-8 lg:p-10 hover:bg-bg-elevated transition-colors duration-500 reveal"
              style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}
            >
              <div className="absolute top-4 left-4 w-2 h-2 border-l border-t border-accent/40 group-hover:border-accent transition-colors" />
              <div className="absolute top-4 right-4 w-2 h-2 border-r border-t border-accent/40 group-hover:border-accent transition-colors" />
              <div className="absolute bottom-4 left-4 w-2 h-2 border-l border-b border-accent/40 group-hover:border-accent transition-colors" />
              <div className="absolute bottom-4 right-4 w-2 h-2 border-r border-b border-accent/40 group-hover:border-accent transition-colors" />

              <div className="flex items-center justify-between mb-8">
                <span className="label-accent">{p.code}</span>
                <span className="text-text-muted group-hover:text-accent transition-colors text-[14px]">→</span>
              </div>

              <h3 className="display text-[36px] lg:text-[44px] mb-4 text-text">{p.title}</h3>

              <p className="text-[15px] leading-[1.6] text-text-dim max-w-[44ch] mb-8">{p.desc}</p>

              <ul className="space-y-2 font-mono text-[12px] tracking-[0.05em] text-text-dim">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-accent mt-[4px] text-[10px]">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
