import type { GlobalConfig } from 'payload'

const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Настройки',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Главный экран',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: 'ДНЕВНИК НАНО-ФЕРМЫ / ВЫПУСК 01',
        },
        {
          name: 'titleLine1',
          type: 'text',
          defaultValue: 'Растим еду',
        },
        {
          name: 'titleLine2Prefix',
          type: 'text',
          defaultValue: 'как ',
        },
        {
          name: 'titleLine2Accent',
          type: 'text',
          defaultValue: 'технологию',
        },
        {
          name: 'titleLine2Suffix',
          type: 'text',
          defaultValue: '.',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'ctaPrimaryLabel',
          type: 'text',
        },
        {
          name: 'ctaSecondaryLabel',
          type: 'text',
        },
      ],
    },
    {
      name: 'metrics',
      type: 'array',
      label: 'Цифры сезона',
      fields: [
        {
          name: 'code',
          type: 'text',
        },
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'value',
          type: 'text',
        },
        {
          name: 'unit',
          type: 'text',
        },
        {
          name: 'caption',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'manifesto',
      type: 'group',
      label: 'Манифест',
      fields: [
        {
          name: 'heading',
          type: 'textarea',
        },
        {
          name: 'principles',
          type: 'array',
          fields: [
            {
              name: 'code',
              type: 'text',
            },
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'description',
              type: 'textarea',
            },
          ],
        },
      ],
    },
    {
      name: 'roadmap',
      type: 'array',
      label: 'План развития',
      fields: [
        {
          name: 'year',
          type: 'text',
        },
        {
          name: 'code',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'state',
          type: 'select',
          options: [
            { label: 'Сейчас', value: 'current' },
            { label: 'Следующий', value: 'next' },
            { label: 'Будущее', value: 'future' },
            { label: 'Горизонт', value: 'horizon' },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'channels',
      type: 'array',
      label: 'Платформы',
      fields: [
        {
          name: 'code',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'handle',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'status',
          type: 'text',
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Подвал',
      fields: [
        {
          name: 'tagline',
          type: 'textarea',
        },
        {
          name: 'season',
          type: 'text',
        },
      ],
    },
  ],
}

export default SiteSettings
