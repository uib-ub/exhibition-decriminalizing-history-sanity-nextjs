import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter, NextRouter } from 'next/router'
import Image from 'next/image'
import { getClient, useImage } from '../lib/sanity.server'
import Sections from '../components/Sections/Sections'
import FrontPageLayout from '../components/Layout/FrontPageLayout'
import NavMegaMenu from '../components/Layout/NavMegaMenu'
import { arrayToTree } from 'performant-array-to-tree'
import { humanMadeObjectFields } from '../lib/queries/fragments'
import { siteNav } from '../lib/queries/fragments'
import { groq } from 'next-sanity'
import { siteSettings } from '../lib/queries/fragments/siteSettings'
import { Box, Container, Flex, Grid, GridItem, Heading, ListItem, Spacer, Text, UnorderedList } from '@chakra-ui/react'
import { urlFor } from '../lib/sanity'

const fields = groq`
  ...,
  content[] {
    disabled != true => {
      ...
    },
    _type == 'MiradorGallery' && disabled != true => @{
      ...,
      items[] {
        "manifest": coalesce(manifestRef->.subjectOfManifest, manifestUrl),
        canvasUrl,
      },
    },
    _type == 'SingleObject' && disabled != true => @{
      ...,
      item-> {
        _id,
        label,
        referredToBy[] {
          ...
        },
        image,
        "manifest": coalesce(subjectOfManifest, manifestUrl),
        canvasUrl,
      }
    },
    _type == 'EventSection' && disabled != true => @{
      ...,
      item-> {
        _id,
        label,
        timespan,
        location,
        referredToBy[] {
          ...
        },
        image,
      }
    },
    _type == 'Grid'  && disabled != true => @{
      ...,
      items[] {
        ...,
        "route": coalesce(landingPageRoute->.slug.current,landingPageRoute->.link,landingPageRoute->.route)
      }
    }
  }
`

const frontpageQuery = groq`
  {
    ${siteSettings},
    ${siteNav},
    "page": *[_id == "siteSettings"][0] {
      ...coalesce(
        *[__i18n_base._ref == ^.frontpage._ref && __i18n_lang == $language][0] {
          ${fields}
        },
        frontpage-> {
          ${fields}
        }
      )
    }
  }
  `

export const getStaticProps: GetStaticProps = async ({ locale, preview = false }) => {
  const data = await getClient(preview).fetch(frontpageQuery, { language: locale })
  // console.log(JSON.stringify(data, null, 2))
  return {
    props: {
      data,
      locale,
      preview,
      messages: (await import(`../messages/${locale}.json`)).default
    },
  }
}

const Home: NextPage = ({ data, locale, preview }: any) => {
  const { locales, defaultLocale }: NextRouter = useRouter()
  const { page, siteNav, siteSettings } = data

  return (
    <>
      <Head>
        <title>{siteSettings?.label[locale]}</title>
        <meta name="description" content={siteSettings?.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FrontPageLayout
        site={siteSettings}
        preview={preview}
        nav={siteNav}
      >
        <div className='scrollspy'>
          {/* <Grid
            templateColumns={[
              'repeat(16, 1fr)'
            ]}
            bgColor='#333e4e'
            maxH={'80vh'}
            overflow='hidden'
          >
            <Box
              gridColumn={{ base: '1 / 6', xl: '1/6', '2xl': '1/6' }}
              gridRow={'1/2'}
              bgColor='#333e4e'
              alignSelf={'center'}
              justifySelf={'center'}
              position={'relative'}
              w={'full'}
              h={'clamp(20rem, 80vh, 100%)'}
              display={['none', 'block']}
            >
              <Box
                position={'relative'}
                display='block'
                w={'full'}
                h={'full'}
              >
                <Image
                  {...useImage('image-ffe0010bd000b13d7335f4a826f5a2ff84a949f8-11799x18568-jpg')}
                  alt='Test'
                  layout='fill'
                  objectFit='contain'
                />
              </Box>
            </Box>

            <Flex
              px={3}
              py={6}
              gridColumn={{ base: '1 / 17', xl: '6 / 17', '2xl': '6/17' }}
              bgColor='#333e4e'
              justifyContent={'space-between'}
              direction={'column'}
              position='relative'
            >
              <Box>
                <Heading color={'white'} fontSize={locale === 'no' ? '4vw' : "clamp(2rem, 5vw, 7rem)"} textTransform="uppercase">
                  {siteSettings?.label[locale]}
                </Heading>
                <Text color={'white'} fontSize={"clamp(1rem, 2vw, 3rem)"} maxW={"6xl"}>{siteSettings?.description[locale]}</Text>
              </Box>

              <Flex alignItems={'center'}>
                <Spacer />
                <Box w={'clamp(220px, 19vw, 560px)'}>
                  <Image
                    {...useImage('image-39fb1a3516f84fa78ca9980ad1898e8914a4674d-8001x5334-png')}
                    alt='Test'
                    layout='responsive'
                  />
                </Box>
                <Box w={'clamp(100px, 10vw, 200px)'}>
                  <Image
                    {...useImage('image-e2e78c37304ad709d2c811625039d92a40fd3a2c-99x99-svg')}
                    alt='Test'
                    layout='responsive'
                  />
                </Box>
              </Flex>

            </Flex>
          </Grid> */}

          <Grid
            templateAreas={`
              'header'
            `}
          >
            <Flex
              gridArea={'header'}
              filter='contrast(40%) brightness(140%)'
            >
              <Box w={'full'}>
                <Image
                  {...useImage('image-7e9fb3f0c32f5c3fe4b62971d033fa643de29bfd-3402x6236-jpg')}
                  alt='Test'
                  layout='responsive'
                  objectFit='cover'
                />
              </Box>
              <Box w={'full'}>
                <Image
                  {...useImage('image-4aaf7fb6ac6100449789b1a04def1ccf8794c5d7-3402x6236-jpg')}
                  alt='Test'
                  layout='responsive'
                  objectFit='cover'
                />
              </Box>
              <Box w={'full'}>
                <Image
                  {...useImage('image-76d069d7f318c8fda66347fc4209e0cd4389c71e-3402x6236-jpg')}
                  alt='Test'
                  layout='responsive'
                  objectFit='cover'
                />
              </Box>
              <Box w={'full'}>
                <Image
                  {...useImage('image-ad22c6cbae98421ad7c5536b288530f4d7d8f1d0-3402x6236-jpg')}
                  alt='Test'
                  layout='responsive'
                  objectFit='cover'
                />
              </Box>
            </Flex>

            <Flex
              gridArea={'header'}
              px={3}
              py={6}

              justifyContent={'space-between'}
              direction={'column'}
              position='relative'
              zIndex={2}
            >
              <Box>
                <Heading
                  display={'inline'}
                  bgColor='black'
                  color={'white'}
                  p="3"
                  fontSize={locale === 'no' ? '4vw' : "clamp(1.5rem, 7vw, 40rem)"}
                  textTransform="uppercase"
                >
                  {siteSettings?.label[locale]}
                </Heading>
                <Text
                  textTransform="uppercase"
                  bgColor='black'
                  color={'white'}
                  lineHeight='1.2'
                  mt='5'
                  p={2}
                  fontSize={"clamp(0.8rem, 2vw, 3rem)"}
                  maxW={"3xl"}
                >
                  {siteSettings?.description[locale]}
                </Text>
              </Box>

              <Flex alignItems={'center'}>
                <Spacer />
                <Box w={'clamp(320px, 19vw, 560px)'}>
                  <Image
                    {...useImage('image-95a25d7f3e11d0f0b59be9ced8e2d41645213069-2521x1308-png')}
                    alt='Test'
                    layout='responsive'
                  />
                </Box>
                {/* <Box w={'clamp(320px, 19vw, 560px)'}>
                  <Image
                    {...useImage('image-39fb1a3516f84fa78ca9980ad1898e8914a4674d-8001x5334-png')}
                    alt='Test'
                    layout='responsive'
                  />
                </Box>
                <Box w={'clamp(150px, 10vw, 200px)'}>
                  <Image
                    {...useImage('image-e2e78c37304ad709d2c811625039d92a40fd3a2c-99x99-svg')}
                    alt='Test'
                    layout='responsive'
                  />
                </Box> */}
              </Flex>
            </Flex>
          </Grid>
          <Container
            maxW={'full'}
            bgColor={'pink.400'}
            color={'white'}
            centerContent
            p={4}
          >
            <Heading size={'md'}>Menu</Heading>
          </Container>
          {/* <NavMegaMenu value={siteNav} /> */}
          {/*  <Container maxW={"100%"} backgroundColor="yellow.300">
          <Box
            py={8}
          >
            <Heading fontSize={locale === 'no' ? '7vw' : "8vw"} textTransform="uppercase">
              {siteSettings?.label[locale]}
            </Heading>
          </Box>
        </Container> */}

          {/* {page?.content && page?.content.map((i: any) => (<TextBlocks key={i._key} value={i.content} />))} */}

          <Grid
            //py={[5, 10, 20]}
            templateColumns={[
              'repeat(16, 1fr)'
            ]}
            templateRows={[
              'repeat(18, minmax(30px, auto))'
            ]}
          >

            <Flex
              gridColumn={{ base: '1 / 8' }}
              gridRow={{ base: '1/3' }}
              bgColor='#fff2ab'
              minH={24}
              direction={['column']}
            >
              <Box w={'full'}>
                <Image
                  {...useImage('image-51627288c9a428a675897f2ea60b7d531fb15ae4-874x1240-jpg')}
                  alt='Test'
                  layout='responsive'
                  objectFit='contain'
                />
              </Box>
              <Box
                py={5}
                px={[2, 3, 5]}
              >
                <Heading color={'#e14b30'} fontSize={locale === 'no' ? '3vw' : "6vw"} lineHeight='0.8' textTransform="uppercase">
                  Genders & Genres
                </Heading>
                <Text color={'#e14b30'} fontSize={"1.5vw"} maxW={"6xl"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Box>
            </Flex>

            <Box
              gridColumn={{ base: '14 / 16' }}
              gridRow={{ base: '1/2' }}
              display={['none', 'block']}
            >
              <Image
                {...useImage('image-75bccfb6d13adf13bb37b230c0cf03a44e03dead-2160x2160-png')}
                alt='Test'
                layout='responsive'
              />
            </Box>

            <Flex
              gridColumn={{ base: '8 / 17' }}
              gridRow={{ base: '1/3' }}
              minH={24}
              zIndex='2'
              position={'relative'}
            >
              <Box w={'full'}>
                <Image
                  {...useImage('image-f215b22598b883732a41f542a5d7d8685a57f611-5454x8188-jpg')}
                  alt='Test'
                  layout='responsive'
                />
              </Box>
              <Box
                p={0}
                top='1'
                right='1'
                position={'absolute'}
                zIndex={1}
                transform={'rotate(2deg, 3deg)'}
              >
                <Heading px={3} color={'white'} bgColor='#d64a41' fontSize={locale === 'no' ? '3vw' : "6vw"} textTransform="uppercase" sx={{ writingMode: 'vertical-rl', textOrientation: 'sideways-right' }}>
                  Fuck the polite
                </Heading>
              </Box>
            </Flex>

            <Flex
              gridColumn={{ base: '1 / 17' }}
              gridRow={{ base: '3/6' }}
              h={'full'}
              zIndex='2'
            >
              <Box
                w={'full'}
                h={'full'}
              >
                <Image
                  {...useImage('image-7a3b0c3d45545416c98c91b66c0f9a7246151984-5137x2341-jpg')}
                  alt='Test'
                  layout='responsive'
                />
              </Box>
              <Box
                py={3}

                bgColor={'blue.600'}
              >
                <Heading color={'white'} fontSize={locale === 'no' ? '3vw' : "8vw"} textTransform="uppercase" sx={{ writingMode: 'vertical-rl', textOrientation: 'sideways-right' }} >
                  Aids/HIV
                </Heading>
              </Box>
            </Flex>

            <Flex
              gridColumn={{ base: '1 / 17' }}
              gridRow={{ base: '6/12' }}
              zIndex='2'
              direction={['row']}
            >
              <Box
                w={'full'}
                h={'full'}
                position='relative'
              >
                <Image
                  {...useImage('image-2b89431974991517e0beae16b17d9cadcdb34598-397x559-jpg')}
                  alt='Test'
                  layout='responsive'
                  objectFit='cover'
                />
              </Box>
              <Box
                p={2}
                px={3}
                zIndex={1}
                bgColor={'#fced48'}
              >
                <Heading color={'#bc337d'} fontSize={locale === 'no' ? '3vw' : "8vw"} textTransform="uppercase" fontWeight={'300'} lineHeight='0.9'>
                  We are <span style={{ fontSize: '10wv', fontWeight: '900' }}>here</span>, we are <span style={{ fontSize: '10wv', fontWeight: '900' }}>queer</span>, <br />we won’t <span style={{ fontSize: '10wv', fontWeight: '900' }}>disappear</span>
                </Heading>
              </Box>
            </Flex>


            <Flex
              gridColumn={{ base: '1 / 17' }}
              gridRow={{ base: '12/16' }}
              direction='column'
              h={'full'}
            >
              <Flex>
                <Box
                  w={'full'}
                  h={'full'}
                  //display={['none', 'block']}
                  position='relative'
                >
                  <Image
                    {...useImage('image-915f75972eafe8b38b8af5202d9b982f1c6a6f14-1572x2371-jpg')}
                    alt='Test'
                    layout='responsive'
                    objectFit='cover'
                  />
                </Box>

                <Box w={'full'}
                  //display={['none', 'block']}
                  position='relative'
                  filter='contrast(185%)'
                >
                  <Image
                    {...useImage('image-97a253e4e9fd1c6911fe2e5410ca51d12e7edd43-559x792-jpg')}
                    alt='Test'
                    layout='fill'
                    objectFit='cover'
                  />
                </Box>

                <Box w={'full'}
                  position='relative'
                >
                  <Image
                    {...useImage('image-3630c1457c77f3418a2baefb1a31a44d2eaf9bc0-710x1024-jpg')}
                    alt='Test'
                    layout='fill'
                    objectFit='cover'
                  />
                </Box>

                {/* <Box w={'full'}
                  position='relative'
                //display={['none', 'block']}

                >
                  <Image
                    {...useImage('image-05ff3e88a06195ed9c45d2e48feeeb5445d5cb61-3371x3287-jpg')}
                    alt='Test'
                    layout='fill'
                    objectFit='cover'
                  />
                </Box> */}
              </Flex>

              <Box
                p={1}
                bgColor='black'
              >
                <Heading color={'#e1ebeb'} fontSize={locale === 'no' ? '3vw' : "10.5vw"} textTransform="uppercase" textAlign={'center'}>
                  In the back room
                </Heading>
              </Box>
            </Flex>

          </Grid>


          {/*  <Container maxW={"100%"} backgroundColor="yellow.300" p={3}>
          <Text fontSize={"3vw"} maxW={"6xl"}>{siteSettings?.description[locale]}</Text>
        </Container> */}
          {/* <pre>{JSON.stringify(page, null, 2)}</pre> */}
        </div>
      </FrontPageLayout >
    </>
  )
}

export default Home
