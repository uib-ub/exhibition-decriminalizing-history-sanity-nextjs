import dynamic from 'next/dynamic'
import { Box, Button, Flex, Grid, Heading, Icon, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Spacer, Text } from '@chakra-ui/react'
import Block from './Block'
import Image from 'next/image'
import { GetImage } from '../../../lib/sanity.server'
import Link from '../../Link'
import TextBlocks from '..'
import Source from './shared/Source'
import { BsInfoCircle } from 'react-icons/bs'

const MiradorWithNoSSR = dynamic(() => import('../../IIIF/MiradorViewer'), {
  ssr: false,
})

const YithWithNoSSR = dynamic(() => import('../../IIIF/YithViewer'), {
  ssr: false,
})

const ObjectBlock = (props) => {
  if (!props || props.disabled === true) {
    return null
  }

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
                alt=""
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
                  alt=""
                  {...GetImage(i.image)}
                  objectFit={'contain'}
                />
              </Link>
            )}

            <Flex
              as='figcaption'
              direction="column"
              mx='auto'
              maxW={'2xl'}
              textAlign='center'
            >
              {i.label && (
                <Heading
                  fontWeight="800"
                  fontSize={{ base: "xl", md: '2xl' }}
                  mb={1}
                >
                  {i.label}
                </Heading>
              )}

              {i.description && (
                <TextBlocks
                  value={i.description}
                />
              )}

              <Spacer />
              <Box
                display={{ base: 'none', md: 'flex' }}
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
                    {...i.objectDescription}
                    display={{ base: 'none', md: 'block' }}

                  />
                )}
              </Box>

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
            </Flex>
          </Box>
        ))}
      </Flex>
    )
  }

  return (
    <Block
      key={item._key}
      as="figure"
      variant={variant}
    >
      {item?.length === 0 && <Flex>Missing figure</Flex>}

      {item && (
        <Box
          w="100%"
          position="relative"
          alignSelf={'start'}
          mb={4}
        >

          {variant === 'yith' && (
            <YithWithNoSSR id={item} />
          )}

          {variant === 'mirador' && (
            <MiradorWithNoSSR gridArea="image" variant="basic" manifests={item} height={height} />
          )}

          {variant === 'static' && (
            <Flex
              maxW='full'
              mb={10}
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
                      alt=""
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
                        alt=""
                        {...GetImage(i.image)}
                        objectFit={'contain'}
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
                      alt=""
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
                        alt=""
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

      <Flex
        as='figcaption'
        direction="column"
        maxW={'2xl'}
        mx='auto'
        textAlign='center'
      >
        {label && (
          <Heading
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

        {source && (
          <Flex
            fontSize={{ base: 'sm', sm: 'sm', md: 'md', xl: 'md' }}
            pb={{ base: '2', md: '0' }}
            mb="0"
            mx='auto'
            textAlign='center'
          >
            <TextBlocks
              value={source}
            />
          </Flex>
        )}
        {item && item.map((o) => (
          <Source
            key={o.objectDescription?._id ?? o._key}
            {...o.objectDescription}
          />
        ))}
      </Flex>
    </Block>
  )
}

export default ObjectBlock
