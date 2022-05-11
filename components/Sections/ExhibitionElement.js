import Image from 'next/image'
import { Box, Grid, Flex, Heading, Spacer } from '@chakra-ui/react'
import Source from './Source'
import TextBlocks from '../TextBlocks'
import { GetImage } from '../../lib/sanity.server'
import { useRouter } from 'next/router'

export default function SingleObject(props) {
  const { locale, defaultLocale } = useRouter
    ()
  if ((!props && !props.item) || props.disabled === true) {
    return null
  }

  const { title, content, item, forseesUseOf } = props

  return (
    <Grid
      maxW={['xl', 'xl', 'xl', '6xl']}
      my={{ base: '6', md: '8', xl: '10' }}
      p={{ base: '6', md: '8', xl: '10' }}
      border={{ base: 'solid 5px' }}
      borderColor="gray.800"
      gridGap={5}
      gridTemplateAreas={{ base: '"content" "design"', xl: '"content design"' }}
      gridTemplateColumns={{ base: '3xl', xl: '10fr 4fr' }}
      gridTemplateRows="1fr auto"
    >
      <Box gridArea="content">
        {item?.image && (
          <Box mb="10" maxH="50vh">
            <Image alt={title ?? ''} {...GetImage(item.image)} layout="responsive" />
            <Source {...item} />
          </Box>
        )}

        <Flex
          h="full"
          flexDirection="column"
          fontFamily="Montserrat"
          gridArea="metadata"
          pr={{ base: 0, md: 10 }}
          alignSelf="flex-end"
        >
          <Heading
            fontFamily="Montserrat"
            fontWeight="semibold"
            color="red.600"
            fontSize={{ base: 'sm', sm: 'sm', md: 'md', xl: 'xl' }}
            mb={1}
          >
            {title}
          </Heading>

          {content && (
            <TextBlocks
              fontSize={{ base: 'sm', sm: 'sm', md: 'sm', xl: 'md' }}
              fontWeight="200"
              value={content}
            />
          )}
          <Spacer />
        </Flex>
      </Box>
      <Box gridArea="design">
        <Heading
          fontFamily="Montserrat"
          fontWeight="semibold"
          color="red.600"
          fontSize={{ base: 'sm', sm: 'sm', md: 'md', xl: 'xl' }}
          mb={1}
        >
          {forseesUseOf.label[locale] ?? forseesUseOf.label[defaultLocale]}
        </Heading>

        {forseesUseOf?.referredToBy && (
          <TextBlocks
            fontSize={{ base: 'sm', sm: 'sm', md: 'sm', xl: 'md' }}
            fontWeight="200"
            value={forseesUseOf.referredToBy[0].body}
          />
        )}

        {/* TODO: Fix grid and image size */}
        {forseesUseOf?.image && (
          <Box maxW="full" position="relative">
            <Image alt={''} {...GetImage(forseesUseOf.image)} layout="responsive" />
          </Box>
        )}
      </Box>
    </Grid>
  )
}
