import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { pushDevSchema } from '@payloadcms/drizzle'
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
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  onInit: async (payload) => {
    if (process.env.PAYLOAD_AUTO_SCHEMA === 'false') return
    try {
      await payload.db.drizzle.execute('SELECT 1 FROM users LIMIT 1' as never)
    } catch (err) {
      const code = (err as { code?: string }).code
      if (code !== '42P01') throw err
      payload.logger.info('users table missing — running schema push')
      await pushDevSchema(payload.db as never)
      payload.logger.info('schema push complete')
    }
  },
})
