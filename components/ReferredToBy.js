import { Box, Heading, Wrap, WrapItem } from '@chakra-ui/react'
import TextBlocks from './TextBlocks'
import { groupBy } from 'lodash'
import { useRouter } from 'next/router'
import React from 'react'

const getTexts = (value, locale) => {
  const norwegianTexts = value.filter(x => x.language.identifiedByISO6393 === 'no')
  const englishTexts = value.filter(x => x.language.identifiedByISO6393 === 'en')

  if (locale === 'en' && englishTexts.length > 0) {
    return englishTexts
  }
  if (locale === 'en' && englishTexts.length === 0 && norwegianTexts.length > 0) {
    return norwegianTexts
  }
  if (locale === 'no' && norwegianTexts.length > 0) {
    return norwegianTexts
  }
  if (locale === 'no' && norwegianTexts.length === 0 && englishTexts.length > 0) {
    return englishTexts
  }

  return null
}

export default function ReferredToBy({ value, description }) {
  const { locale, defaultLocale } = useRouter()

  if (!value || !Array.isArray(value)) {
    return null
  }

  const texts = getTexts(value, locale)

  return (
    <>
      {texts?.map((ref) => (
        <React.Fragment key={ref._key ? ref._key : ref._id}>
          <Heading as="dt" fontWeight="semibold" pb="2" size={'md'}>
            {ref.hasType[0]?.label[locale ?? defaultLocale]}
            <br />
            <small>{ref.language.label[locale ?? defaultLocale]}</small>
          </Heading>
          <Wrap as="dd" marginBottom={5}>
            <WrapItem>
              <TextBlocks
                value={ref.body}
                variant={'item-texts'}
              />
            </WrapItem>
          </Wrap>
        </React.Fragment>
      ))}

      {description && <TextBlocks value={description} />}
    </>
  )
}
