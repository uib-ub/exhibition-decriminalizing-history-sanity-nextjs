import { Container } from '@chakra-ui/react'
import TextBlocks from '../TextBlocks'
import Sections from '../TextBlocks/Blocks/Sections'

/* Used for preview */
export default function Page(data) {
  return (
    <Container maxWidth="full" px="0" centerContent>
      {data.content && <Sections sections={data.content} />}

      {/* If LinguisticDocument the content is in the body field */}
      {data.body && <TextBlocks value={data.body} />}
    </Container>
  )
}
