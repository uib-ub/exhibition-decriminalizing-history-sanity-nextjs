import { useRouter } from 'next/router'
import { getClient } from '../../lib/sanity.server'
import { groq } from 'next-sanity'
import { Box, Container, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { urlFor } from '../../lib/sanity'

function convertToArray(obj) {
  if (!obj) return null
  return Object.keys(obj).map(key => ({
    name: key,
    ...obj[key],
  }));
}

const colourQuery = groq`
  *[_type == "sanity.imageAsset"] { 
    _id,
    _type,
    description,
    "palette": metadata.palette{
      darkMuted {
        background,
        foreground,
        population,
        title,
      },
      darkVibrant {
        background,
        foreground,
        population,
        title,
      },
      dominant {
        background,
        foreground,
        population,
        title,
      },
      lightMuted {
        background,
        foreground,
        population,
        title,
      },
      lightVibrant {
        background,
        foreground,
        population,
        title,
      },
      muted {
        background,
        foreground,
        population,
        title,
      },
      vibrant {
        background,
        foreground,
        population,
        title,
      }
    }
  }
`

export const getStaticProps = async ({ locale, preview = false }) => {
  const data = await getClient(preview).fetch(colourQuery)
  // console.log(JSON.stringify(data, null, 2))
  return {
    props: {
      data,
      locale,
    },
  }
}

const Colours = ({ data, locale, preview }) => {
  const { locales, defaultLocale } = useRouter()

  return (
    <Box
      p={4}
      bgColor='gray.800'
      color={'whitesmoke'}
    >
      <Container
        centerContent
        mb={5}
      >
        <Heading as="h1" my={3} >Farger</Heading>
        <Text fontSize='xl'>foreground, background, title</Text>
      </Container>

      <Grid
        maxW={'full'}
        templateColumns={'auto 1fr'}
        autoRows='minmax(200px, 1fr)'
        gap={2}
      >

        {data && data.map((item) => {
          const paletteArray = convertToArray(item.palette);
          return (
            <>
              <Box>
                <Text >{item.description ?? 'Uten tittel'}</Text>
                <Image
                  alt=''
                  src={urlFor(item).height(200).width(200).url()}
                  layout="intrinsic"
                  height={200}
                  width={200}
                  objectFit={'contain'}
                />
              </Box>
              <Grid
                templateColumns={'repeat(7, 1fr)'}
                autoRows='auto'
                gap={2}
                borderRadius={5}
              >
                {paletteArray && paletteArray.map((colour) => (
                  <Flex
                    my={5}
                    borderRadius={3}
                    py={15}
                    alignContent={'center'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    justifyItems={'center'}
                    alignSelf={'center'}
                    justifySelf={'center'}
                    w={'full'}
                    h={'full'}
                    key={colour.name}
                    bgColor={colour.foreground}
                  >
                    <Text
                      m={3}
                      px={3}
                      py={16}
                      display={'block'}
                      bgColor={colour.background}
                      color={colour.title}
                    >{colour.name}</Text>
                  </Flex>

                ))}
              </Grid>
            </>
          )
        })}
      </Grid >
    </Box >
  )
}

export default Colours