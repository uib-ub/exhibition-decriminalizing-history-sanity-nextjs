import { Heading, Wrap, WrapItem, Tag } from '@chakra-ui/react'
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React from 'react';

export default function Measurement({ value }) {
  const { locale, defaultLocale } = useRouter();
  const t = useTranslations('Item')

  if (!value) {
    return null
  }

  return (
    <>
      <Heading as="dt" fontWeight="semibold" pb="2" size={'md'}>
        {t('measurement')}
      </Heading>
      <Wrap as="dd" marginBottom={5}>
        {value.map((m) => (
          <React.Fragment key={m._key}>
            {m.observedDimension?.length > 0 && m.observedDimension.map((dimension) => (
              <WrapItem key={dimension._key}>
                <strong>{dimension.hasType.label[locale ?? defaultLocale]}:</strong>
                {dimension.value} {dimension.hasUnit.label[locale ?? defaultLocale]}
              </WrapItem>
            ))}
          </React.Fragment>
        ))}
      </Wrap>
    </>
  )
}

