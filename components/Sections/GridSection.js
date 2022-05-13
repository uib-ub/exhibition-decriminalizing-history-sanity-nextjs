import NextLink from 'next/link'
import { Container, Grid, Box, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react'
import TextBlocks from '../TextBlocks'
import Image from 'next/image'
import { urlFor } from '../../lib/sanity'

export default function GridSection(props) {
  console.log(JSON.stringify(props, null, 2))
  if (!props || props.disabled === true) {
    return null
  }

  const { items } = props

  return (
    <Container px={[5, 5, 5, 0]} maxW={['sm', '2xl', 'full', 'full']} centerContent>
      <Grid
        templateColumns="1fr 1fr"
        maxW="full"
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
              {item.illustration?.image && (
                <Image
                  alt=""
                  src={urlFor(item.illustration.image).url()}
                  layout="intrinsic"
                  objectFit="contain"
                  width={500}
                  height={500}
                />
              )}

              {item.route && item.label && (
                <Heading fontSize={['xl', '2xl', '4xl', '5xl']}>
                  <NextLink href={`/${item.route}`} passHref>
                    <LinkOverlay>{item.label}</LinkOverlay>
                  </NextLink>
                </Heading>
              )}
              {!item.route && item.label && (
                <Heading fontSize={['xl', '2xl', '4xl', '5xl']}>
                  {item.label}
                </Heading>
              )}

              {item.content && (
                <Box>
                  <TextBlocks fontSize={['md', 'xl']} value={item.content} />
                </Box>
              )}
            </LinkBox>
          ))}
      </Grid>
    </Container>
  )
}
