import { Container } from '@chakra-ui/react'

const SectionWrapper = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      {children}
    </Container>
  )
}

export default SectionWrapper
