import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'kulibin.tv' },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
