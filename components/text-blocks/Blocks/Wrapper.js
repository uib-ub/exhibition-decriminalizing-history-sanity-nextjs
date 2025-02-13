import { Container } from '@chakra-ui/react'

export default function Wrapper({ children }) {
  if (!children) {
    return null
  }

  return (
    <Container maxW="full" px="0" centerContent>
      {children}
    </Container>
  )
}
