import { Container, Heading } from '@chakra-ui/react'
import TextBlocks from '../'

export default function TextBlock(props) {
  if (!props || props.disabled === true) {
    return null
  }

  return (
    <Container maxW={['md', null, '2xl', null]}>
      {props?.title && <Heading fontSize="xl">{props.title}</Heading>}

      {props?.subtitle && <TextBlocks value={props.subtitle} />}

      <TextBlocks value={props.content} />
    </Container>
  )
}
