import { useRouter } from 'next/router';
import { urlFor } from '../lib/sanity'
import { Avatar, Heading, Wrap, Tag, TagLabel } from '@chakra-ui/react'
import Link from './Link'

export default function Depicts({ depicted }) {
  const { locale, defaultLocale } = useRouter();

  if (!depicted) {
    return null
  }

  return (
    <>
      <Heading as="dt" fontFamily="Montserrat" fontWeight="semibold" fontSize="sm" pb="2">
        Avbilder
      </Heading>
      <Wrap as="dd" fontFamily="Montserrat" marginBottom={5}>
        {depicted.map((actor) => (
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
    </>
  )
}
