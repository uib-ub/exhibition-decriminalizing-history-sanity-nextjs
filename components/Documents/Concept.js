import { Box, Container, Heading } from '@chakra-ui/react'
import TextBlocks from '../TextBlocks'
import Cards from '../Cards'

export default function Concept(item) {
  return (
    <Container maxW="full" py="10" centerContent>
      <Heading pb="10" fontSize={['2xl', '4xl', '5xl', '6xl']}>
        {item.label.no}
      </Heading>

      <Box maxW="2xl">
        {item?.referredToBy?.map((ref) => (
          <TextBlocks key={ref._key} blocks={ref.body} />
        ))}
      </Box>

      {item.mentionedIn && <Cards items={item.mentionedIn} />}
    </Container>
  )
}
