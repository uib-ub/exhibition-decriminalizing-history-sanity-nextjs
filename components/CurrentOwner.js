import { useRouter } from 'next/router';
import { Heading, Wrap, WrapItem } from '@chakra-ui/react'
import Link from './Link'
import { useTranslations } from 'next-intl';

export default function CurrentOwner({ owners }) {
  const { locale, defaultLocale } = useRouter();
  const t = useTranslations('Item')

  if (!owners) {
    return null
  }

  return (
    <>
      <Heading as="dt" fontWeight="semibold" pb="2" size={'md'}>
        {t('currentOwner')}
      </Heading>
      <Wrap as="dd" mb={{ base: 8, lg: 0 }}>
        {owners.map((owner) => (
          <WrapItem key={owner._id}>
            <Link fontSize="sm" key={owner._id} href={`/id/${owner._id}`}>
              {owner.label[locale] ?? owner.label[defaultLocale]}
            </Link>
          </WrapItem>
        ))}
      </Wrap>
    </>
  )
}
