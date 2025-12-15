import TextBlocks from '@/components/text-blocks'
import React from 'react'

const getTexts = (value, locale) => {
  const norwegianTexts = value.filter(x => x.language?.identifiedByISO6393 === 'no')
  const englishTexts = value.filter(x => x.language?.identifiedByISO6393 === 'en')
  const spanishTexts = value.filter(x => x.language?.identifiedByISO6393 === 'es')

  // Try requested locale first
  if (locale === 'en' && englishTexts.length > 0) return englishTexts
  if (locale === 'no' && norwegianTexts.length > 0) return norwegianTexts
  if (locale === 'es' && spanishTexts.length > 0) return spanishTexts

  // Fallback chain: English -> Norwegian -> Spanish
  if (locale !== 'en' && englishTexts.length > 0) return englishTexts
  if (norwegianTexts.length > 0) return norwegianTexts
  if (spanishTexts.length > 0) return spanishTexts

  // If no texts found in any language, return any available texts or null
  return value.length > 0 ? [value[0]] : null
}

export default function ReferredToBy({ value, locale = 'en' }) {

  if (!value || !Array.isArray(value)) {
    return null
  }

  const texts = getTexts(value, locale)

  return (
    <>
      {texts?.map((ref) => (
        <React.Fragment key={ref._key ? ref._key : ref._id}>
          <dt className="font-semibold pb-2 text-md md:text-lg lg:text-xl">
            {ref.hasType[0]?.label[locale]}
            <br />
            <small>{ref.language.label[locale]}</small>
          </dt>
          <dd className="flex flex-wrap gap-2 mb-0 lg:mb-0 ps-0 lg:ps-4 pb-4">
            <div>
              <TextBlocks
                value={ref.body}
                className="text-md md:text-md lg:text-md font-light"
              />
            </div>
          </dd>
        </React.Fragment>
      ))}
    </>
  )
}
