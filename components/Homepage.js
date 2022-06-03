import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Heading, Link, Wrap, WrapItem } from '@chakra-ui/react'

export default function Homepage(props) {
  if (!props) {
    return null
  }

  const { homepage } = props

  return (
    <>
      <Heading as="dt" fontWeight="semibold" fontSize="md" pb="2">
        Hjemmeside
      </Heading>
      <Wrap as="dd" marginBottom={5}>
        <WrapItem>
          <Link fontSize="md" href={homepage} isExternal>
            {homepage} <ExternalLinkIcon mx="2px" />
          </Link>
        </WrapItem>
      </Wrap>
    </>
  )
}
