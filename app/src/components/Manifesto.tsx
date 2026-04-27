import type { CSSProperties } from 'react'
import type { ManifestoData } from '@/types/site'

interface ManifestoProps {
  data?: ManifestoData
}

const defaultPrinciples = [
  {
    code: 'ПРИНЦИП 01',
    title: 'Меряем всё',
    description:
      'Урожай в килограммах, время в часах, расходы в рублях. Не "у меня выросло хорошо" — а 12.4 кг с ведра, 1.2 часа в неделю, окупилось за 3 месяца.',
  },
  {
    code: 'ПРИНЦИП 02',
    title: 'Открытый протокол',
    description:
      'Каждая система — чертёж в открытом доступе. Что работает, что нет, почему. Реплицируется на любом балконе мира.',
  },
  {
    code: 'ПРИНЦИП 03',
    title: 'Минимум ресурсов',
    description:
      'Минимум воды, площади и времени на максимум урожая. Замкнутый контур, автоматизация, расчёт каждой детали — против "лей побольше".',
  },
]

const borders = ['border-accent', 'border-accent/50', 'border-accent/30']

export default function Manifesto({ data }: ManifestoProps) {
  const principles = data?.principles && data.principles.length > 0 ? data.principles : defaultPrinciples

  return (
    <section id="manifesto" className="relative py-32 lg:py-44 border-t border-border overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">

        <div className="flex items-center gap-3 mb-16 lg:mb-24 reveal">
          <div className="h-px w-10 bg-accent/60" />
          <span className="label-accent">03 / МАНИФЕСТ</span>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-10">
            <p className="display text-[clamp(36px,5.5vw,84px)] leading-[1.05] reveal">
              <span className="text-text-muted">Огород — это</span>
              <span className="text-text"> не магия и не привычка.</span>
              <br className="hidden sm:block" />
              <span className="text-text-muted">Это </span>
              <span className="text-accent">инженерная задача</span>
              <span className="text-text"> с измеримым результатом.</span>
            </p>
          </div>
        </div>

        <div className="mt-20 lg:mt-28 grid grid-cols-12 gap-6 lg:gap-12">
          {principles.map((p, i) => (
            <div
              key={p.code || i}
              className="col-span-12 lg:col-span-4 reveal"
              style={{ '--reveal-delay': `${(i + 1) * 100}ms` } as CSSProperties}
            >
              <div className={`border-l-2 ${borders[i] ?? 'border-accent/20'} pl-6`}>
                <span className="label-accent block mb-3">{p.code}</span>
                <h3 className="text-[20px] font-medium text-text mb-3">{p.title}</h3>
                <p className="text-[15px] leading-[1.6] text-text-dim">{p.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
