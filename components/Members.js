import { urlFor } from '../lib/sanity'
import { Avatar, Box, Heading, Wrap, Tag, TagLabel } from '@chakra-ui/react'
import Link from './Link'
import { useRouter } from 'next/router';

export default function Members({ data }) {
  const { locale, defaultLocale } = useRouter();

  if (!data) {
    return null
  }

  return (
    <Box mt="6">
      <Heading as="dt" fontFamily="Montserrat" fontWeight="semibold" fontSize="sm" pb="2">
        Medlemmer
      </Heading>
      <Wrap as="dd" fontFamily="Montserrat" marginBottom={5}>
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
