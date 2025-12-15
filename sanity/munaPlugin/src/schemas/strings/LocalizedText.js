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
  name: 'LocalizedText',
  type: 'object',
  title: 'Localized text',
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
    type: 'text',
    fieldset: lang.isDefault ? undefined : 'translations',
  })),
})
