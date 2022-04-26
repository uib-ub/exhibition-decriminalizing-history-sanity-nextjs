import NextLink from 'next/link'
import { Container, Grid, Box, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react'
import TextBlocks from '../TextBlocks'
import Image from 'next/image'
import { getNextSanityImage } from '../../lib/sanity.server'

export default function Hero(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const { items } = props

  return (
    <Container px={[5, 5, 5, 0]} maxW={['sm', '2xl', '2xl', '6xl']} centerContent>
      <Grid
        templateColumns="1fr 1fr"
        maxW="4xl"
        mb="10"
        boxSizing="border-box"
        gap={[5, null, 10, null]}
      >
        {items &&
          items.map((item) => (
            <LinkBox key={item._key} position="relative">
              {/* <Text
                display="block"
                position="absolute"
                bgColor="white"
                p="2"
                textTransform="lowercase"
              >
                {romanize(index + 1)}.
              </Text> */}
              {item.illustration && (
                <Image
                  alt=""
                  {...getNextSanityImage(item.illustration.image)}
                  layout="intrinsic"
                  /* sizes="(max-width: 800px) 100vw, 800px" */
                  objectFit="cover"
                  width={500}
                  height={500}
                />
              )}

              <Heading fontSize={['xl', '2xl', '4xl', '5xl']}>
                <NextLink href={`/${item.route}`} passHref>
                  <LinkOverlay>{item.title}</LinkOverlay>
                </NextLink>
              </Heading>

              {item.content && (
                <Box>
                  <TextBlocks fontSize={['md', 'xl']} blocks={item.content} />
                </Box>
              )}
            </LinkBox>
          ))}
      </Grid>
    </Container>
  )
}
