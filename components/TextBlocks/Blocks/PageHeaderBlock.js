import { Container, Heading, /* Image, */ useColorModeValue } from '@chakra-ui/react'
// import { urlFor } from '../../../lib/sanity'

import TextBlocks from '../'

export default function PageHeaderBlock(props) {
  if (!props || props.disabled === true) {
    return null
  }

  return (
    <Container
      centerContent
      pt="10"
      pb={['12', null, '14', null]}
      mb={['4', null, '8', null]}
      maxW={['90vw', '90vw', '2xl', '3xl']}
    >
      {/* {props.illustration?.image && (
        <Image
          mb="5"
          maxH="50vh"
          justifyContent="end"
          overflow="hidden"
          src={urlFor(props.illustration?.image).width('800').fit('min').url()}
          alt={''}
        />
      )} */}
      <Heading
        fontSize={['2xl', '3xl', '4xl', '5xl', null]}
        textAlign="center"
        textTransform="uppercase"
      >
        {props.title}
      </Heading>
      {props?.subtitle && <TextBlocks textAlign="center" value={props.subtitle} />}
    </Container>
  )
}
