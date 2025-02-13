
export const label = {
  name: 'label',
  title: 'Title',
  type: 'LocalizedString',
  validation: (Rule: any) => Rule.required(),
  options: {
    semanticSanity: {
      '@id': 'rdfs:label',
      '@container': '@language'
    }
  },
};
