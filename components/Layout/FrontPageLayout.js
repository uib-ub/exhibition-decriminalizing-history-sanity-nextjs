import { Box, Container, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import { SkipNavLink, SkipNavContent } from '@chakra-ui/skip-nav'
import { useTranslations } from 'next-intl';
import Header from './Header'
import PreviewAlert from './PreviewAlert'
import Footer from './Footer'
import Nav from './Nav'
import Meta from './Meta'
import Image from 'next/image';
import { GetImage } from '../../lib/sanity.server';
import { useRouter } from 'next/router';

const Wrapper = ({ children }) => {
  return (
    <Grid
      maxW={"full"}
      display="grid"
      templateColumns={'auto 1fr'}
      templateAreas={`
        "hero hero"
        "header header"
        "main main"
        "footer footer"
      `}
    >
      {children}
    </Grid>
  )
}

export default function FrontPageLayout({ children, siteSettings, siteNav, locale, preview = false }) {
  const t = useTranslations("Layout");
  const { locales, defaultLocale } = useRouter()

  return (
    <>
      <Meta />
      <SkipNavLink>{t("skipToContent")}</SkipNavLink>
      <Wrapper>
        {preview && <PreviewAlert />}
        <Flex
          w={'full'}
          position={'sticky'}
          top='0'
          gridArea="header"
          zIndex={10}
          boxShadow='md'
          p={2}
          bgColor={'pink.300'}
        >
          <Header
            data={{ ...siteSettings, siteNav }}
          />

          <Nav value={siteNav} />
        </Flex>

        <Grid
          gridArea={'hero'}
          templateAreas={`
              'heroContent'
            `}
          h={['auto', 'auto', 'auto', 'auto']}
        >
          <Flex
            //h={['auto', 'auto', 'auto', '100vh']}
            gridArea={'heroContent'}
            filter='contrast(80%) brightness(140%) grayscale(100%)'
          >
            <Box w={'full'}>
              <Image
                {...GetImage('image-7e9fb3f0c32f5c3fe4b62971d033fa643de29bfd-3402x6236-jpg')}
                alt='Test'
                layout='responsive'
                objectFit='cover'
              />
            </Box>
            <Box w={'full'}>
              <Image
                {...GetImage('image-4aaf7fb6ac6100449789b1a04def1ccf8794c5d7-3402x6236-jpg')}
                alt='Test'
                layout='responsive'
                objectFit='cover'
              />
            </Box>
            <Box w={'full'}>
              <Image
                {...GetImage('image-76d069d7f318c8fda66347fc4209e0cd4389c71e-3402x6236-jpg')}
                alt='Test'
                layout='responsive'
                objectFit='cover'
              />
            </Box>
            <Box w={'full'}>
              <Image
                {...GetImage('image-ad22c6cbae98421ad7c5536b288530f4d7d8f1d0-3402x6236-jpg')}
                alt='Test'
                layout='responsive'
                objectFit='cover'
              />
              {/* <Image
                  {...GetImage('image-ad22c6cbae98421ad7c5536b288530f4d7d8f1d0-3402x6236-jpg')}
                  alt='Test'
                  layout='responsive'
                  objectFit='cover'
                /> */}

            </Box>
          </Flex>

          <Box
            gridArea={'heroContent'}
            position='relative'
            zIndex={2}
          >
            <Box
              maxW={"6xl"}
              position={'absolute'}
              bottom={[2, 5, 5, 10]}
              left={[2, 5, 5, 10]}
              zIndex={30}
            >
              <Heading
                display={'inline'}
                color='rgba(255,255,255)'
                bgColor={'rgba(134, 112,178)'}
                lineHeight='1'
                fontSize={locale === 'no' ? 'clamp(1.5rem, 8vw, 6rem)' : "clamp(1.5rem, 8vw, 8rem)"}
                textTransform="uppercase"
                fontWeight={'800'}
              >
                {siteSettings?.label[locale]}
              </Heading>
              {/* <Text
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
                </Text> */}
            </Box>

            <Box
              position={'absolute'}
              top={[2, 5, 5, 10]}
              right={[2, 5, 5, 10]}
              w={'clamp(150px, 22vw, 400px)'}
            >
              <Image
                {...GetImage('image-95a25d7f3e11d0f0b59be9ced8e2d41645213069-2521x1308-png')}
                alt='Test'
                layout='responsive'
              />
            </Box>
          </Box>
        </Grid>


        {/* {page?.content && page?.content.map((i: any) => (<TextBlocks key={i._key} value={i.content} />))} */}

        <Grid
          gridArea={'main'}
          templateColumns={[
            'repeat(16, 1fr)'
          ]}
          templateRows={{
            base: 'repeat(13, minmax(30px, auto))',
            xl: 'repeat(5, minmax(30px, auto))'
          }}
          bgColor='RGB(241, 239, 238)'
        //pt={10}
        //gap={6}
        >
          <SkipNavContent />

          <Flex
            gridColumn={{ base: '1 / 8', 'xl': '1/5' }}
            gridRow={{ base: '1/3', 'xl': '1/4' }}
            minH={24}
            direction={['column']}
            boxSizing='border-box'
            bgColor='RGB(241, 239, 238)'
          //transform={'perspective(1200) rotateX(0deg) rotateY(15deg)'}

          >
            <Box
              w={'full'}
              alignSelf='center'
            //transform={'scale(93%)'}
            //mx={5}
            //boxShadow={'0px 6px 4px rgba(0,0,0, 0.25)'}
            >
              <Image
                {...GetImage('image-51627288c9a428a675897f2ea60b7d531fb15ae4-874x1240-jpg')}
                alt='Test'
                layout='responsive'
                objectFit='contain'
              />
            </Box>

            <Box
              bgColor='rgba(85,205,252)'
              py={[2, 2, 3]}
              px={[2, 2, 4]}
            //mt='-8'
            //ml={10}
            >
              <Heading
                color={'RGB(245, 245, 245)'}
                fontSize={["6vw", "", "", "", "3vw"]}
                lineHeight='0.9'
                textTransform="uppercase"
              >
                Genders & Genres
              </Heading>
              <Text
                color={'RGB(245, 245, 245)'}
                fontSize={["1.5vw", "", "", "", "1vw"]}
                maxW={"6xl"}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </Box>
          </Flex>

          <Flex
            gridColumn={{ base: '8 / 17', 'xl': '5/10' }}
            gridRow={{ base: '1/3', 'xl': '1/4' }}
            minH={24}
            zIndex='2'
            position={'relative'}
            bgColor='RGB(241, 239, 238)'
          >
            <Box w={'full'}
              alignSelf='center'
            //px={5}
            >
              <Image
                {...GetImage('image-f215b22598b883732a41f542a5d7d8685a57f611-5454x8188-jpg')}
                alt='Test'
                layout='responsive'
              />
            </Box>
            <Box
              p={0}
              top={['8%']}
              right={[1, 1, 2, 2, 3]}
              position={'absolute'}
              zIndex={1}
              transform={'rotate(2deg, 3deg)'}
              boxShadow='-1px 1px 3px rgba(0,0,0, 0.4)'
            >
              <Heading
                px={3}
                color={'white'}
                bgColor='#d64a41'
                transform={'rotate(180deg)'}
                fontSize={["6vw", "", "6vw", "6vw", "3.5vw"]}
                textTransform="uppercase"
                sx={{ writingMode: 'vertical-rl', textOrientation: 'sideways-right' }}
              >
                Fuck the polite
              </Heading>
            </Box>
          </Flex>

          <Flex
            gridColumn={{ base: '1 / 17', 'xl': '10/17' }}
            gridRow={{ base: '3/6', 'xl': '1/2' }}
            h={'full'}
            zIndex='2'
            direction={'column'}
            bgColor='RGB(241, 239, 238)'
          //p={5}
          >
            <Box
              py={0}
              bgColor={'RGB(10, 5, 19)'}
            //boxShadow='0px 5px 6px rgba(0,0,0, 0.3)'
            >
              <Heading
                color={'RGB(232, 255, 251)'}
                fontSize={["3vw", "3vw", "4vw", "5vw", "2vw"]}
                fontWeight={300}
                textTransform="uppercase"
                textAlign={'center'}
                fontFamily='serif'
              // sx={{ writingMode: 'vertical-rl', textOrientation: 'sideways-right' }}
              >
                [untitled] your apocalypse was fab
              </Heading>
            </Box>

            <Box
              w={'full'}
              boxShadow='0px 6px 6px rgba(0,0,0, 0.3)'
            //my={'auto'}
            >
              <Image
                {...GetImage('image-cd0b3b8406980c56016e3118ef107a1db0d96517-3146x1779-png')}
                alt='Test'
                layout='responsive'
              />
            </Box>
          </Flex>

          <Flex
            gridColumn={{ base: '1 / 17', 'xl': '10/17' }}
            gridRow={{ base: '6/12', 'xl': '2/4' }}
            zIndex='2'
            direction={['row']}
            bgColor='RGB(241, 239, 238)'
          //p={10}
          //transform={'perspective(200) rotateX(10deg) rotateY(0deg) scale(80%)'}
          >
            <Box
              w={'full'}
              h={'full'}
              position='relative'
              bgColor={'rgb(244, 227, 60)'}
            //boxShadow='0px 6px 6px rgba(0,0,0, 0.3)'
            //zIndex={2}
            >
              <Image
                {...GetImage('image-2b89431974991517e0beae16b17d9cadcdb34598-397x559-jpg')}
                alt='Test'
                layout='responsive'
                objectFit='cover'
              />
            </Box>

            <Box
              p={2}
              px={3}
              bgColor={'rgb(244, 227, 60)'}
            //zIndex={1}
            //boxShadow='0px 6px 6px rgba(0,0,0, 0.3)'
            >
              <Heading
                color={'#bc337d'}
                fontSize={["8vw", "10vw", "10vw", "9vw", "min(4.5vw, 5.5rem)"]}
                textTransform="uppercase"
                fontWeight={'300'}
                lineHeight='0.9'>
                We are <span style={{ fontWeight: '900' }}>here</span>, we are <span style={{ fontWeight: '900' }}>queer</span>, <br />we <span style={{ fontWeight: '900' }}>won’t disappear</span>
              </Heading>
            </Box>
          </Flex>


          <Flex
            gridColumn={{ base: '1 / 17' }}
            gridRow={{ base: '12/14', 'xl': '4/6' }}
            direction='column'
            h={'full'}
          //mt={50}
          >
            <Flex>
              <Box
                w={'full'}
                h={'full'}
                //display={['none', 'block']}
                position='relative'
              >
                <Image
                  {...GetImage('image-915f75972eafe8b38b8af5202d9b982f1c6a6f14-1572x2371-jpg')}
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
                  {...GetImage('image-97a253e4e9fd1c6911fe2e5410ca51d12e7edd43-559x792-jpg')}
                  alt='Test'
                  layout='fill'
                  objectFit='cover'
                />
              </Box>

              <Box w={'full'}
                position='relative'
              >
                <Image
                  {...GetImage('image-3630c1457c77f3418a2baefb1a31a44d2eaf9bc0-710x1024-jpg')}
                  alt='Test'
                  layout='fill'
                  objectFit='cover'
                />
              </Box>

              <Box w={'full'}
                position='relative'
                display={{ base: 'none', xl: 'block' }}

              >
                <Image
                  {...GetImage('image-05ff3e88a06195ed9c45d2e48feeeb5445d5cb61-3371x3287-jpg')}
                  alt='Test'
                  layout='fill'
                  objectFit='cover'
                />
              </Box>
            </Flex>

            <Box
              p={1}
              bgColor='black'
            >
              <Heading
                color={'#e1ebeb'}
                fontSize={"10.5vw"}
                textTransform="uppercase"
                textAlign={'center'}
              >
                In the back room
              </Heading>
            </Box>
          </Flex>

        </Grid>
        {/* {children} */}

        <Footer />
      </Wrapper>
    </>
  )
}
