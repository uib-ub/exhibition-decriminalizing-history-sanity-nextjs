import { Box, Container, Heading } from '@chakra-ui/react'
import TextBlocks from '../TextBlocks'
import Cards from '../Cards'
import { useRouter } from 'next/router'

export default function Concept(item) {
  const { locale, defaultLocale } = useRouter()

  return (
    <Container maxW="full" py="10">
      <Heading
        as={h2}
        pb="10"
        fontSize={['2xl', '4xl', '5xl', '6xl']}
      >
        {item?.label?.[locale] ?? item?.label?.[defaultLocale]}
      </Heading>

      <Box maxW="2xl">
        {item?.referredToBy?.map((ref) => (
          <TextBlocks key={ref._key} value={ref.body} />
        ))}
      </Box>

      {item.mentionedIn && <Cards items={item.mentionedIn} />}
    </Container>
  )
}
