import { imageBuilder } from '../lib/sanity'
import { Avatar, Box, Heading, Wrap, Tag, TagLabel } from '@chakra-ui/react'
import Link from './Link'

export default function Members({ data }) {
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
              name={actor.no}
              src={imageBuilder.image(actor.image).height(300).width(300).url()}
            />
            <TagLabel>
              <Link href={`/id/${actor._id}`}>{actor.label.no}</Link>
            </TagLabel>
          </Tag>
        ))}
      </Wrap>
    </Box>
  )
}
