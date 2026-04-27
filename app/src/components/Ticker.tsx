const items = [
  'ДНЕВНИК НАНО-ФЕРМЫ',
  'УРОЖАЙ +94%',
  'ВРЕМЯ 1.2 Ч/НЕД',
  'ВОДЫ −94%',
  'БЕЗ ПЕСТИЦИДОВ',
  'ОТКРЫТЫЙ ПРОТОКОЛ',
  'СЕЗОН 2026',
  'КАРТОФЕЛЬ · КЛУБНИКА',
  'ГИДРОПОНИКА · КАПЕЛЬНЫЙ ПОЛИВ',
  'ON AIR',
]

export default function Ticker() {
  return (
    <div className="relative border-y border-border bg-bg-elevated/40 overflow-hidden">
      <div className="flex ticker-track whitespace-nowrap py-4 font-mono text-[11px] tracking-[0.22em] uppercase text-text-dim">
        {[0, 1].map((idx) => (
          <div key={idx} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span key={item} className="flex items-center px-6">
                <span className="signal-dot !w-[4px] !h-[4px] mr-3 opacity-70" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
