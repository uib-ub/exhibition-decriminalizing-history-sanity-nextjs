import dynamic from 'next/dynamic'
import { Box, Button, Flex, Grid, Heading, Icon, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Spacer, Text } from '@chakra-ui/react'
import Block from './Block'
import Image from 'next/image'
import { GetImage } from '../../../lib/sanity.server'
import Link from '../../Link'
import TextBlocks from '..'
import Source from './shared/Source'
import { BsInfoCircle } from 'react-icons/bs'
import { useRouter } from 'next/router'

const MiradorWithNoSSR = dynamic(() => import('../../IIIF/MiradorViewer'), {
  ssr: false,
})

const YithWithNoSSR = dynamic(() => import('../../IIIF/YithViewer'), {
  ssr: false,
})

const FigCaption = ({ children, label, description, source, item }) => {
  return (
    <Flex
      as='figcaption'
      direction="column"
      maxW={'2xl'}
      mx='auto'
      textAlign='center'
      fontSize={{ base: 'md', sm: 'md', md: 'md', xl: 'lg' }}
    >
      {label && (
        <Heading
          as={'h3'}
          fontWeight="700"
          fontSize={{ base: "2xl", md: '3xl', lg: '4xl' }}
          mb={1}
        >
          {label}
        </Heading>
      )}

      {description && (
        <TextBlocks
          value={description}
        />
      )}

      <Spacer />

      {!item.internalRef && source && (
        <Flex

          pb={{ base: '2', md: '0' }}
          mb="0"
          mx='auto'
          textAlign='center'
        >
          <Icon
            as={BsInfoCircle}
            mr="2"
            mt="1"
            aria-hidden
          />
          <TextBlocks
            value={source}
          />
        </Flex>
      )}
      {!source && item && item.map((o) => (
        <Source
          key={o.objectDescription?._id ?? o._key}
          {...o.objectDescription}
        />
      ))}
      {children}
    </Flex>
  )
}

const ObjectBlock = (props) => {
  const { locale, defaultLocale } = useRouter()

  if (!props || props.disabled === true) {
    return null
  }

  /* console.log(JSON.stringify(props, null, 2)) */

  const { label, description, item, source, variant } = props
  const height = 'clamp(40em, 50vh, 20em)'

  if (variant === 'static-individual-captions') {
    return (
      <Flex
        gridColumn={'2/-2'}
        maxW='full'
        mb={10}
        align={'baseline'}
        justify={'space-evenly'}
        flexWrap={'wrap'}
        gap={4}
      >
        {item.map((i) => (
          <Box
            key={i._key}
            as='figure'
            flex={'0 0 30%'}
          >
            {!i.internalRef && (
              <Image
                {...GetImage(i.image)}
                objectFit={'contain'}
                alt={i.image?.alt?.[locale ?? defaultLocale] ?? ''}
              />
            )}
            {i.internalRef && (
              <Link
                key={i._key}
                href={`/id/${i.internalRef._ref}`}
              >
                <Image
                  {...GetImage(i.image)}
                  objectFit={'contain'}
                  alt={i.image?.alt?.[locale ?? defaultLocale] ?? ''}
                />
              </Link>
            )}

            <FigCaption label={i.label} description={i.description} source={i.source} item={[i]}>
              <Box
                display={{ base: 'block', md: 'none' }}
              >
                <Popover
                  color='black'
                >
                  <PopoverTrigger>
                    <Text
                      fontSize={{ base: 'sm', sm: 'sm', md: 'md', xl: 'md' }}
                    >
                      <a><Icon as={BsInfoCircle} mr="2" mt="3" /> Attribution</a>
                    </Text>
                  </PopoverTrigger>
                  <PopoverContent
                    m={'1em'}
                  >
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody
                      color='black'
                    >
                      {i.source && (
                        <Flex
                          fontSize={{ base: 'sm', sm: 'sm', md: 'md', xl: 'md' }}
                          pb={{ base: '2', md: '0' }}
                          mb="0"
                        >
                          <TextBlocks
                            value={i.source}
                          />
                        </Flex>
                      )}
                      {i.objectDescription && (
                        <Source
                          key={i.objectDescription?._id ?? i._key}
                          {...i.objectDescription}
                        />
                      )}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Box>

            </FigCaption>
          </Box>
        ))}
      </Flex>
    )
  }

  return (
    <Block
      as="figure"
      key={item._key}
      variant={variant}
      w='full'
    >
      {item?.length === 0 && <Flex>Missing figure</Flex>}

      {item && (
        <Box
          position="relative"
          alignSelf={'start'}
          mb={4}
        >

          {/* {variant === 'yith' && (
            <YithWithNoSSR items={item} />
          )} */}

          {variant === 'mirador' && (
            <MiradorWithNoSSR gridArea="image" variant="basic" manifests={item} height={height} />
          )}

          {variant === 'static' && (
            <Flex
              maxW='full'
              align={'baseline'}
              justify={'space-evenly'}
              flexWrap={'wrap'}
              gap={4}
            >
              {item.length > 1 && item.map((i) => (
                <Box
                  key={i._key}
                  as='figure'
                  flex={'0 0 30%'}
                >
                  {!i.internalRef && (
                    <Image
                      key={i._key}
                      {...GetImage(i.image)}
                      objectFit={'contain'}
                      alt={i.image?.alt?.[locale ?? defaultLocale] ?? ''}
                    />
                  )}
                  {i.internalRef && (
                    <Link
                      key={i._key}
                      href={`/id/${i.internalRef._ref}`}
                    >
                      <Image
                        {...GetImage(i.image)}
                        objectFit={'contain'}
                        alt={i.image?.alt?.[locale ?? defaultLocale] ?? ''}
                      />
                    </Link>
                  )}
                </Box>
              ))}

              {item.length === 1 && item.map((i) => (
                <>
                  {!i.internalRef && (
                    <Image
                      key={i._key}
                      alt={i.image?.alt?.[locale ?? defaultLocale] ?? ''}
                      {...GetImage(i.image)}
                      objectFit={'contain'}
                    />
                  )}
                  {i.internalRef && (
                    <Link
                      key={i._key}
                      href={`/id/${i.internalRef._ref}`}
                    >
                      <Image
                        alt={i.image?.alt?.[locale ?? defaultLocale] ?? ''}
                        {...GetImage(i.image)}
                        objectFit={'contain'}
                      />
                    </Link>
                  )}
                </>
              ))}
            </Flex>
          )}
        </Box>
      )}

      <FigCaption label={label} description={description} source={source} item={item} />

    </Block>
  )
}

export default ObjectBlock
