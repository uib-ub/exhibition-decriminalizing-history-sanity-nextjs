import { Heading, Wrap, WrapItem, Tag } from '@chakra-ui/react'
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import Link from './Link'

export default function Subject({ subjects }) {
  const { locale, defaultLocale } = useRouter();
  const t = useTranslations('Item')

  if (!subjects) {
    return null
  }

  return (
    <>
      <Heading as="dt" fontWeight="semibold" pb="2" size={'md'}>
        {t('subject')}
      </Heading>
      <Wrap as="dd" mb={{ base: 8, lg: 0 }}>
        {subjects.map((subject) => (
          <WrapItem key={subject._id}>
            <Tag size="lg" colorScheme={'cyan'}>
              <Link href={`/id/${subject._id}`}>{subject.label[locale] || subject.label[defaultLocale] || 'Missing default language label'}</Link>
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </>
  )
}
