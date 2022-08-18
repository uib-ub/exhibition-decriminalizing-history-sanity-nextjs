import NextLink from 'next/link'
import { AspectRatio, Grid, Box, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react'
import TextBlocks from '../'
import Image from 'next/image'
import { urlFor } from '../../../lib/sanity'

export default function GridBlock(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const { items } = props

  return (
    <Grid
      /* templateColumns={[
        "1fr 1fr",
        "1fr 1fr",
        "1fr 1fr 1fr 1fr",
        "1fr 1fr 1fr 1fr",
      ]} */
      templateColumns={[
        'repeat(16, 1fr)'
      ]}
      maxW="full"
      gap={5}
    >
      {items &&
        items.map((item, i) => (
          <LinkBox
            key={item._key + i}
            position="relative"
            maxW={"full"}
            maxH={"full"}
            gridColumn={'span 4'}
          >
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
  )
}
