import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const Videos: CollectionConfig = {
  slug: 'videos',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt', 'category'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return (data.title as string)
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Черновик', value: 'draft' },
        { label: 'Опубликовано', value: 'published' },
      ],
    },
    {
      name: 'videoProvider',
      type: 'select',
      required: true,
      options: [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Rutube', value: 'rutube' },
        { label: 'VK Video', value: 'vk-video' },
      ],
    },
    {
      name: 'videoId',
      type: 'text',
      required: true,
    },
    {
      name: 'duration',
      type: 'text',
      admin: {
        description: 'Формат MM:SS, например 14:22',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      maxLength: 280,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Эксперимент', value: 'experiment' },
        { label: 'Сборка', value: 'build' },
        { label: 'Расчёт', value: 'calculation' },
        { label: 'Дневник', value: 'diary' },
      ],
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor({}),
    },
    {
      name: 'relatedArticles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
    },
  ],
}

export default Videos
