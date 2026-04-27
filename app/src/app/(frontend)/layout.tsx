import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '../globals.css'
import MissionBar from '@/components/MissionBar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'KULIBIN.TV — Дневник домашней нано-фермы',
  description:
    'Дневник инженера, который выращивает еду как технологию. Гидропоника, капельный полив, эксперименты, расчёты. Не как бабушка — по протоколу.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kulibin.tv'),
  openGraph: {
    title: 'KULIBIN.TV — Дневник домашней нано-фермы',
    description:
      'Дневник инженера, который выращивает еду как технологию. Гидропоника, капельный полив, эксперименты, расчёты.',
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KULIBIN.TV — Дневник домашней нано-фермы',
    description: 'Дневник инженера, который выращивает еду как технологию.',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0E0C',
}

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ru"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="grain relative">
        <MissionBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
