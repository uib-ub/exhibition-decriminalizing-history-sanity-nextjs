import Image from 'next/image'
import { Flex, Box, useColorModeValue } from '@chakra-ui/react'
import Caption from '../shared/Caption'
import { GetImage } from '../../../../lib/sanity.server'
import WrapperGrid from '../WrapperGrid'

export default function IllustrationWithCaption(props) {
  const bg = useColorModeValue('blackAlpha.100', 'black')

  if ((!props && !props.illustration) || props.disabled === true) {
    return null
  }

  const { image } = props

  return (
    <WrapperGrid>
      {image ? (
        <Box minH="50vh" w="100%" gridArea="image" bgColor={bg} color="" position="relative">
          {image && (
            <Image
              alt=""
              {...GetImage(image)}
              layout="fill"
              objectFit={'contain'}
            />
          )}
        </Box>
      ) : (
        <Flex gridArea="image">Mangler illustrasjon</Flex>
      )}
    </WrapperGrid>
  )
}
