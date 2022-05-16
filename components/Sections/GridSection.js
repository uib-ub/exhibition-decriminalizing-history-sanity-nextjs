import NextLink from 'next/link'
import { AspectRatio, Grid, Box, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react'
import TextBlocks from '../TextBlocks'
import Image from 'next/image'
import { urlFor } from '../../lib/sanity'

export default function GridSection(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const { items } = props

  return (
    <AspectRatio ratio={24 / 11}>
      <Grid
        templateColumns={[
          "1fr 1fr",
          "1fr 1fr",
          "1fr 1fr 1fr 1fr",
        ]}
        maxW="full"
        boxSizing="border-box"
        backgroundColor={"green.200"}
      >
        {items &&
          items.map((item, i) => (
            <LinkBox key={item._key + i} backgroundColor={`yellow.${i + 2}00`} position="relative" maxW={"full"} maxH={"full"}>
              {item.illustration?.image && (
                <Image
                  alt=""
                  src={urlFor(item.illustration.image).url()}
                  layout="intrinsic"
                  height={3667}
                  width={2000}
                  objectFit={'contain'}
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
    </AspectRatio>
  )
}
