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

const FigCaption = ({ children, label, description, item }) => {
  return (
    <Box
      as='figcaption'
      direction="column"
      maxW={'2xl'}
      mx='auto'
      textAlign='center'
      fontSize={{ base: 'md', sm: 'md', md: 'md', xl: 'lg' }}
    >
      {label && (
        <Heading
          as={'h2'}
          fontWeight="700"
          fontSize={{ base: "2xl", md: '3xl', lg: '4xl' }}
          mb={1}
        >
          {label}
        </Heading>
      )}

      {description && (
        <Box mb={4}>
          <TextBlocks
            value={description}
          />
        </Box>
      )}

      {item && <Source {...item} />}

      {children}
    </Box>
  )
}

const ObjectBlock = (props) => {
  const { locale, defaultLocale } = useRouter()

  if (!props || props.disabled === true) {
    return null
  }

  const { _key, label, description, item, source, variant } = props
  const height = 'clamp(40em, 50vh, 20em)'

  if (variant === 'static-individual-captions') {
    return (
      <Flex
        key={_key}
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
            flex={{ base: '0 0 100%', md: '0 0 30%' }}
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
                ariaLabelledBy={i._key}
                href={`/id/${i.internalRef._ref}`}
              >
                <Image
                  id={i._key}
                  {...GetImage(i.image)}
                  objectFit={'contain'}
                  alt={i.image?.alt?.[locale ?? defaultLocale] ?? ''}
                />
              </Link>
            )}

            <FigCaption label={i.label} description={i.description} item={[i]}>
              <Box
                fontSize={{ base: 'md', sm: 'md', md: 'md', xl: 'lg' }}
                pb={{ base: '2', md: '0' }}
                mx='auto'
                mt={2}
                mb={0}
                maxW={'full'}
              >
                <TextBlocks
                  value={i.source}
                />
              </Box>
            </FigCaption>
          </Box>
        ))}
      </Flex>
    )
  }

  if (variant === 'static-compare') {
    return (
      <Block
        as="figure"
        key={item._key}
        variant={variant}
        w='full'
      >
        {item?.length === 0 && <Flex>Missing figures or not exactly two figures!</Flex>}

        {item.length === 2 && (
          <Box
            position="relative"
            alignSelf={'start'}
            mb={4}
          >
            <Flex
              maxW='full'
              align={'baseline'}
              justify={'space-evenly'}
              gap={0}
            >
              {item.map((i) => (
                <Box
                  position="relative"
                  key={i._key}
                  as='figure'
                  maxH='70vh'
                >
                  {i.image && (
                    <Image
                      key={i._key}
                      {...GetImage(i.image)}
                      objectFit={'contain'}
                      alt={i.image?.alt?.[locale ?? defaultLocale] ?? ''}
                    />
                  )}
                </Box>
              ))}
            </Flex>
          </Box >
        )}

        <FigCaption label={label} description={description} source={source}>
          <Box
            display={{ base: 'none', md: 'block' }}
            fontSize={{ base: 'md', sm: 'md', md: 'md', xl: 'lg' }}
            pb={{ base: '2', md: '0' }}
            mx='auto'
            mt={2}
            mb={0}
            maxW={'full'}
          >
            <TextBlocks
              value={source}
            />
          </Box>
        </FigCaption>
      </Block >
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
                      ariaLabelledBy={i._key}
                      href={`/id/${i.internalRef._ref}`}
                    >
                      <Image
                        id={i._key}
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
                      ariaLabelledBy={i._key}
                      href={`/id/${i.internalRef._ref}`}
                    >
                      <Image
                        id={i._key}
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

      <FigCaption label={label} description={description}>
        {item && item.filter(i => i.objectDescription).map((item, i) => (
          <Box
            key={item.objectDescription?._id}
            fontSize={{ base: 'md', sm: 'md', md: 'lg', xl: 'lg' }}
            pb={{ base: '2', md: '0' }}
            mx='auto'
            mt={2}
            mb={0}
            maxW={'full'}
          >
            <Text>
              <Icon
                as={BsInfoCircle}
                mr="2"
                mt="0"
                display={'inline'}
                aria-hidden
              />
              <i>
                <Link href={`/id/${item.objectDescription?._id}`} color='unset' isExternal>
                  {item.objectDescription?.label[locale] || item.objectDescription?.label[defaultLocale] || 'Missing default language label'}
                </Link>
              </i>

              {item.objectDescription?.hasCurrentOwner?.length && `. ${item.objectDescription?.hasCurrentOwner[0].label[locale] ?? item.objectMetadata?.hasCurrentOwner[0].label[defaultLocale]}.`}
            </Text>
          </Box>
        ))}

        <Box
          display={{ base: 'none', md: 'block' }}
          fontSize={{ base: 'md', sm: 'md', md: 'md', xl: 'lg' }}
          pb={{ base: '2', md: '0' }}
          mx='auto'
          mt={2}
          mb={0}
          maxW={'full'}
        >
          <TextBlocks
            value={source}
          />
        </Box>
      </FigCaption>

    </Block>
  )
}

export default ObjectBlock
