import dynamic from 'next/dynamic'
import { Box, Flex, Grid, Heading, Icon, Spacer } from '@chakra-ui/react'
import Block from './Block'
import Image from 'next/image'
import { GetImage } from '../../../lib/sanity.server'
import Link from '../../Link'
import TextBlocks from '..'
import Source from './shared/Source'

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
  const height = 'clamp(40em, 50vh, 50em)'

  console.log(JSON.stringify(props, null, 2))

  if (variant === 'static-individual-captions') {
    return (
      <Flex
        gridColumn={'2/-2'}
        gap={4}
        flexWrap='0'
      >
        {item.map((i) => (
          <Box
            key={i._key}
            as='figure'
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
              overflowY={{ xl: 'scroll' }}
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

              {i.source && (
                <Flex
                  fontSize={{ base: 'sm', sm: 'sm', md: 'md', xl: 'md' }}
                  pb={{ base: '2', md: '0' }}
                  mb="0"
                >
                  <Icon as={BsInfoCircle} mr="2" mt="2" />
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
            </Flex>
          </Box>
        ))}
      </Flex>
    )
  }

  return (
    <Block
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

          {variant === 'yith' && item && (
            <YithWithNoSSR id={item} />
          )}

          {variant === 'mirador' && item && (
            <MiradorWithNoSSR gridArea="image" variant="basic" manifests={item} height={height} />
          )}

          {variant === 'static' && (
            <Flex
              gap={4}
              flexWrap='0'
              justify={'center'}
            >
              {item.map((i) => (
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
        overflowY={{ xl: 'scroll' }}
        mx='auto'
        maxW={'2xl'}
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
          >
            <Icon as={BsInfoCircle} mr="2" mt="2" />
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
