import { Container, Heading } from '@chakra-ui/react'
import TextBlocks from '../TextBlocks'

export default function SectionText(props) {
  if (!props || props.disabled === true) {
    return null
  }

  return (
    <Container maxW={['md', null, '2xl', null]}>
      {props?.title && <Heading fontSize="xl">{props.title}</Heading>}

      {props?.subtitle && <TextBlocks blocks={props.subtitle} />}

      <TextBlocks blocks={props.content} />
    </Container>
  )
}
