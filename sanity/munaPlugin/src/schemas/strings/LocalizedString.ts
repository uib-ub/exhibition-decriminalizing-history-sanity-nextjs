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
  name: 'LocalizedString',
  type: 'object',
  title: 'Localized string',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {
        collapsible: true,
      },
    },
  ],
  fields: languages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'string',
    fieldset: lang.isDefault ? undefined : 'translations'
  })),
})
