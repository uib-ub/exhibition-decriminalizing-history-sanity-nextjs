import { Heading, Wrap, WrapItem, Tag } from '@chakra-ui/react'
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import Link from './Link'

export default function ConsistsOf({ value }) {
  const { locale, defaultLocale } = useRouter();
  const t = useTranslations('Item')

  if (!value) {
    return null
  }

  return (
    <>
      <Heading as="dt" fontWeight="semibold" pb="2" size={'md'}>
        {t('material')}
      </Heading>
      <Wrap as="dd" marginBottom={5}>
        {value.map((m) => (
          <WrapItem key={m._id}>
            <Tag size="lg" colorScheme={'cyan'}>
              <Link href={`/id/${m._id}`}>{m.label[locale] || m.label[defaultLocale] || 'Missing default language label'}</Link>
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </>
  )
}
