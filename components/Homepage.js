import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Heading, Link, Wrap, WrapItem } from '@chakra-ui/react'

export default function Homepage(props) {
  if (!props) {
    return null
  }

  const { homepage } = props

  return (
    <>
      <Heading as="dt" fontFamily="Montserrat" fontWeight="semibold" fontSize="sm" pb="2">
        Hjemmeside
      </Heading>
      <Wrap as="dd" fontFamily="Montserrat" marginBottom={5}>
        <WrapItem>
          <Link fontSize="sm" href={homepage} isExternal>
            {homepage} <ExternalLinkIcon mx="2px" />
          </Link>
        </WrapItem>
      </Wrap>
    </>
  )
}
