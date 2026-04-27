export interface HeroData {
  eyebrow?: string
  titleLine1?: string
  titleLine2Prefix?: string
  titleLine2Accent?: string
  titleLine2Suffix?: string
  description?: string
  ctaPrimaryLabel?: string
  ctaSecondaryLabel?: string
}

export interface MetricItem {
  code?: string
  label?: string
  value?: string
  unit?: string
  caption?: string
}

export interface Principle {
  code?: string
  title?: string
  description?: string
}

export interface ManifestoData {
  heading?: string
  principles?: Principle[]
}

export interface RoadmapPhase {
  year?: string
  code?: string
  title?: string
  state?: string
  description?: string
}

export interface ChannelItem {
  code?: string
  name?: string
  handle?: string
  url?: string
  description?: string
  status?: string
}

export interface VideoCardItem {
  code: string
  duration: string
  title: string
  subtitle: string
  tag: string
  color: string
  slug?: string
}

export interface FooterData {
  tagline?: string
  season?: string
}
