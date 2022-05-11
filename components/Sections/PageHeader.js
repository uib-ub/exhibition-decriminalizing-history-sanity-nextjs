import { Container, Heading, /* Image, */ useColorModeValue } from '@chakra-ui/react'
// import { urlFor } from '../../lib/sanity'

import TextBlocks from '../TextBlocks'

export default function PageHeader(props) {
  const border = useColorModeValue(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/img/taakeheimen-border/light.svg`,
    `${process.env.NEXT_PUBLIC_BASE_PATH}/img/taakeheimen-border/dark.svg`,
  )

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
      backgroundImage={`url('${border}')`}
      backgroundPosition="40% 100%"
      backgroundRepeat="no-repeat"
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
