export default function MissionBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-bg/70 border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 h-12 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em]">
        <a href="/" className="flex items-center gap-3 group">
          <span className="signal-dot" />
          <span className="text-text group-hover:text-accent transition-colors">KULIBIN.TV</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-text-dim">
          <a href="#manifesto" className="hover:text-text transition-colors">Манифест</a>
          <a href="#protocols" className="hover:text-text transition-colors">Рубрики</a>
          <a href="#roadmap" className="hover:text-text transition-colors">План</a>
          <a href="#channels" className="hover:text-text transition-colors">Платформы</a>
        </nav>

        <div className="flex items-center gap-3 text-text-dim">
          <span className="hidden sm:inline">SEASON</span>
          <span className="text-text tabular-nums">2026</span>
        </div>
      </div>
    </header>
  )
}
