'use client'

import { useState, type FormEvent, type CSSProperties } from 'react'

export default function FinalCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="relative py-32 lg:py-44 border-t border-border overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-4xl mx-auto text-center">

          <div className="flex items-center justify-center gap-3 mb-12 reveal">
            <span className="signal-dot" />
            <span className="label-accent">СТАРТУЕМ ВЕСНОЙ 2026</span>
            <span className="signal-dot" />
          </div>

          <h2
            className="display text-[clamp(40px,7vw,112px)] mb-12 reveal"
            style={{ '--reveal-delay': '100ms' } as CSSProperties}
          >
            <span className="text-text">Будь первым, кто</span>
            <br />
            <span className="text-accent">увидит первый выпуск.</span>
          </h2>

          <p
            className="text-[18px] lg:text-[20px] leading-[1.5] text-text-dim max-w-[52ch] mx-auto mb-16 reveal"
            style={{ '--reveal-delay': '200ms' } as CSSProperties}
          >
            Пиши почту — пришлю одно письмо, когда выйдет первый эксперимент. Никакого спама, никаких рекламных рассылок.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-3 py-6 reveal">
              <span className="signal-dot" />
              <span className="font-mono text-[14px] tracking-[0.1em] uppercase text-accent">
                Отлично! Пришлю письмо когда выйдет первый выпуск
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-[500px] mx-auto reveal"
              style={{ '--reveal-delay': '300ms' } as CSSProperties}
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 px-4 bg-bg-elevated border border-border-strong text-text placeholder:text-text-muted font-mono text-[14px] focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 h-12 px-6 bg-accent text-bg font-mono text-[12px] tracking-[0.18em] uppercase font-medium hover:bg-signal transition-colors"
              >
                Подписаться
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </form>
          )}

          <p
            className="mt-6 font-mono text-[11px] tracking-[0.18em] uppercase text-text-muted reveal"
            style={{ '--reveal-delay': '400ms' } as CSSProperties}
          >
            Или сразу в Telegram — там ежедневный дневник
          </p>

        </div>
      </div>
    </section>
  )
}
