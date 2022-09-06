import { Heading, Wrap, WrapItem, Tag } from '@chakra-ui/react'
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import Link from './Link';

export default function HasType({ types }) {
  const { locale, defaultLocale } = useRouter();
  const t = useTranslations('Item')

  if (!types) {
    return null
  }

  return (
    <>
      <Heading as="dt" fontWeight="semibold" pb="2" size={'md'}>
        {t('classification')}
      </Heading>
      <Wrap as="dd" mb={{ base: 8, lg: 0 }}>
        {types.map((type) => (
          <WrapItem key={type._id}>
            <Tag key={type._id} size="lg">
              <Link href={`/id/${type._id}`}>{type.label[locale] ?? type.label[defaultLocale]}</Link>
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </>
  )
}
