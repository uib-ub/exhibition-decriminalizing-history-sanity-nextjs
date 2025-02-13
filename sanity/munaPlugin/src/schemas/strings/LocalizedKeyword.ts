import { defineType } from 'sanity';

const languages = [
  {
    id: "en",
    title: "English",
    isDefault: true
  },
  {
    id: "no",
    title: "Norwegian (Bokmål)",
  },
  {
    id: "es",
    title: "Spanish"
  },
]

export const baseLanguage = languages.find(l => l.isDefault)


export default defineType({
  name: 'LocalizedKeyword',
  type: 'object',
  title: 'Localized keyword',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: languages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'array',
    of: [{ type: 'string' }],
    options: {
      layout: 'tags',
    },
    fieldset: lang.isDefault ? undefined : 'translations',
  })),
})
