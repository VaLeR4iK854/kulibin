import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'url'
import path from 'path'
import sharp from 'sharp'

import Users from './collections/Users'
import Media from './collections/Media'
import Articles from './collections/Articles'
import Videos from './collections/Videos'
import Diary from './collections/Diary'
import SiteSettings from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [Users, Media, Articles, Videos, Diary],
  globals: [SiteSettings],
  editor: lexicalEditor({}),
  sharp,
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    push: true,
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
