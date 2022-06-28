import Image from 'next/image'
import { Container, Divider, Box, Heading, Badge } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'
import TextBlocks from '../TextBlocks'
import { GetImage } from '../../lib/sanity.server'

export default function HeroBlock(props) {
  const bg = useColorModeValue('gray.800', 'gray.300')
  const color = useColorModeValue('white', 'gray.800')

  if (!props || props.disabled === true) {
    return null
  }

  const image = props.illustration.image

  return (
    <Container maxW={['sm', '2xl', '4xl', '6xl']}>
      <Box
        borderColor="gray.800"
        borderWidth="1px"
        mb="2"
        mt="4"
        maxW="full"
        h={['50vh', null, null, '65vh', null]}
        position="relative"
      >
        {image && <Image alt="" {...GetImage(image)} layout="fill" objectFit="cover" />}
      </Box>
      <Container
        maxW="full"
        d="flex"
        /* color={color} */
        zIndex="1"
        centerContent
      >
        {props.label && (
          <Badge backgroundColor={bg} color={color}>
            {props.label}
          </Badge>
        )}

        <Heading
          fontSize={['xl', '4xl', '4xl', '6xl']}
          textTransform="uppercase"
          textAlign="center"
        >
          {props.title}
        </Heading>

        {props?.tagline && (
          <Box>
            <TextBlocks
              fontSize={['xl', null, '2xl', '3xl']}
              textAlign="center"
              value={props.tagline}
            />
          </Box>
        )}
      </Container>

      <Divider opacity="1" mb="6" />
    </Container>
  )
}
