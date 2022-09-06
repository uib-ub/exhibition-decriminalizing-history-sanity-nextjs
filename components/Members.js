import { urlFor } from '../lib/sanity'
import { Avatar, Box, Heading, Wrap, Tag, TagLabel } from '@chakra-ui/react'
import Link from './Link'
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';

export default function Members({ data }) {
  const { locale, defaultLocale } = useRouter();
  const t = useTranslations('Item')

  if (!data) {
    return null
  }

  return (
    <Box mt="6">
      <Heading as="dt" fontWeight="semibold" pb="2" size={'md'}>
        {t('members')}
      </Heading>
      <Wrap as="dd" marginBottom={5}>
        {data.map((actor) => (
          <Tag key={actor._id} size="sm" colorScheme="">
            <Avatar
              size="xs"
              ml={-1}
              mr={2}
              name={actor[locale] ?? actor[defaultLocale]}
              src={urlFor(actor.image).height(300).width(300).url()}
            />
            <TagLabel>
              <Link href={`/id/${actor._id}`}>{actor.label[locale] ?? actor.label[defaultLocale]}</Link>
            </TagLabel>
          </Tag>
        ))}
      </Wrap>
    </Box>
  )
}
