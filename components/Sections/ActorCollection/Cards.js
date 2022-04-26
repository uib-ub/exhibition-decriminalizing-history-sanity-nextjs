import { Container, Flex } from '@chakra-ui/react'

export default function ActorCollectionCards({ children }) {
  if (!children) {
    return null
  }

  return (
    <Container maxW={['md', null, '6xl', null]} pt="4" borderColor="blackAlpha.300">
      <Flex maxW="full" justifyContent="center" as="section" flexFlow="row wrap" flex="0 0">
        {children}
      </Flex>
    </Container>
  )
}
