import { Box, Container, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import { SkipNavLink, SkipNavContent } from '@chakra-ui/skip-nav'
import { useTranslations } from 'next-intl';
import Header from './Header'
import PreviewAlert from './PreviewAlert'
import Footer from './Footer'
import Nav from './Nav'
import Meta from './Meta'
import Image from '../SanityImage';
import { GetImage } from '../../lib/sanity.server';
import { useRouter } from 'next/router';
import { transform } from 'lodash';
import Link from 'next/link';

const Wrapper = ({ children }) => {
  return (
    <Container
      maxW={'full'}
      boxShadow={'dark-lg'}
      p={0}
    >
      {children}
    </Container>
  )
}

export default function FrontPageLayout({ children, siteSettings, siteNav, locale, preview = false }) {
  const t = useTranslations("Layout");
  const { locales, defaultLocale } = useRouter()

  return (
    <>
      <Meta />
      {preview && <PreviewAlert />}
      <SkipNavLink>{t("skipToContent")}</SkipNavLink>
      <Wrapper>
        <Container
          bgColor={'black'}
          color='rgba(255,255,255)'
          maxW='full'
          position={'relative'}
        >
          <Heading
            color='rgba(255,255,255)'
            fontSize={locale === 'no' ? 'clamp(1.5rem, 8vw, 4.5rem)' : "clamp(1.5rem, 7.5vw, 7vw)"}
            //textTransform="uppercase"
            fontWeight={'800'}
            pb={1}
          >
            {siteSettings?.label[locale]}
          </Heading>

          <Flex
            align='start'
            direction='row'
            pb={10}
          >
            <Flex
              justify='center'
              direction='column'
              pb={10}
            >
              <Text
                textTransform="uppercase"
                bgColor='black'
                color={'white'}
                lineHeight='1.2'
                mt='5'
                p={2}
                fontWeight={800}
                fontSize={['', '1rem', 'clamp(1rem, 1.5vw, 1.2rem)', 'clamp(1rem, 2.2vw, 3rem)', '']}
              >
                {siteSettings?.description[locale]}
              </Text>

              <Nav
                value={siteNav}
                justifyContent='start'
                alignSelf='start'
                zIndex='6'
                fontWeight={700}
                my={3}
                fontSize={['', '1rem', 'clamp(1rem, 1.5vw, 1.2rem)', 'clamp(1rem, 2.2vw, 3rem)', '']}
              />

              <Box
                w={'clamp(80px, 32vw, 250px)'}
                mt={10}
              >
                <Image
                  {...GetImage('image-95a25d7f3e11d0f0b59be9ced8e2d41645213069-2521x1308-png')}
                  alt='Skeivt kulturår 2022 og Universitetet i Bergen'
                  layout='responsive'
                />
              </Box>
            </Flex>

            <Box
              w={'full'}
              h={'full'}
              display={['none', 'block']}
              position='relative'
              flex={'0 0 40%'}
              ml={3}
            >
              <Image
                {...GetImage('image-ffe0010bd000b13d7335f4a826f5a2ff84a949f8-11799x18568-jpg')}
                alt='Test'
                layout='responsive'
                objectFit='cover'
              />
            </Box>

          </Flex>
        </Container>


        {/* {page?.content && page?.content.map((i: any) => (<TextBlocks key={i._key} value={i.content} />))} */}

        <Grid
          templateColumns={[
            'repeat(16, 1fr)'
          ]}
          templateRows={{
            base: 'repeat(13, minmax(30px, auto))',
            xl: 'repeat(5, minmax(30px, auto))'
          }}
          bgColor='RGB(241, 239, 238)'
        >
          <SkipNavContent />

          <Flex
            gridColumn={{ base: '1 / 8', 'xl': '1/6' }}
            gridRow={{ base: '1/3', 'xl': '1/4' }}
            minH={24}
            direction={['column']}
            boxSizing='border-box'
            bgColor='RGB(241, 239, 238)'
            position={'relative'}
          >
            <Box
              w={'full'}
              position='relative'
            >
              <Image
                {...GetImage('image-51627288c9a428a675897f2ea60b7d531fb15ae4-874x1240-jpg')}
                alt='Test'
                objectFit='cover'
              />
            </Box>

            <Box
              bgColor='rgba(85,205,252)'
              py={[2, 2, 3]}
              px={[2, 2, 4]}
              flexGrow={1}
            //mt='-8'
            //ml={10}
            >
              <Heading
                color={'RGB(245, 245, 245)'}
                fontSize={["6vw", "", "", "", "clamp(2rem, 5.5vw, 10rem)"]}
                // fontSize={["6vw", "", "", "", "3vw"]}
                lineHeight='0.9'
                textTransform="uppercase"
              >
                Genders & Genres
              </Heading>
            </Box>
          </Flex>

          <Flex
            gridColumn={{ base: '8 / 17', 'xl': '6/10' }}
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
                {...GetImage('image-738282d5e0d7520cbb7dd7b682d86debb001c1ea-2780x3399-jpg')}
                alt='Test'
                layout='fill'
                objectFit='cover'
              />
            </Box>
            <Box
              p={0}
              top={['2%']}
              right={[1, 1, 3, 3, 3]}
              position={'absolute'}
              zIndex={1}
              transform={'rotate(2deg, 3deg)'}
            //boxShadow='-1px 1px 3px rgba(0,0,0, 0.4)'
            >
              <Heading
                px={3}
                color={'white'}
                //bgColor='pink.400'
                bgColor='#f52496'
                transform={'rotate(180deg)'}
                fontSize={["6vw", "", "", "", "clamp(3.5rem, 3vw, 4rem)"]}
                //fontSize={["6vw", "", "6vw", "6vw", "3.5vw"]}
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

            <Box
              py={0}
              bgColor={'RGB(10, 5, 19)'}
            //boxShadow='0px 5px 6px rgba(0,0,0, 0.3)'
            >
              <Heading
                color={'RGB(232, 255, 251)'}
                fontSize={["4vw", "7vw", "7vw", "5vw", "clamp(1rem, 3rem, 2.5rem)"]}
                lineHeight={1}
                py={[1]}
                fontWeight={300}
                textTransform="uppercase"
                textAlign={'center'}
                fontFamily='serif'
              // sx={{ writingMode: 'vertical-rl', textOrientation: 'sideways-right' }}
              >
                [untitled] your apocalypse was fab
              </Heading>
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

            <Flex
              p={2}
              px={3}
              bgColor={'rgb(244, 227, 60)'}
              alignItems='end'
            //zIndex={1}
            //boxShadow='0px 6px 6px rgba(0,0,0, 0.3)'
            >
              <Heading
                color={'#bc337d'}
                fontSize={["8vw", "10vw", "10vw", "9vw", "clamp(2rem, 4vw, 3.5rem)"]}
                //fontSize={["8vw", "10vw", "10vw", "9vw", "min(4.5vw, 5.5rem)"]}
                textTransform="uppercase"
                fontWeight={'300'}
                lineHeight='0.9'>
                We are <span style={{ fontWeight: '900' }}>here</span>, we are <span style={{ fontWeight: '900' }}>queer</span>, <br />we <span style={{ fontWeight: '900' }}>won’t disappear</span>
              </Heading>
            </Flex>
          </Flex>


          <Flex
            gridColumn={{ base: '1 / 17' }}
            gridRow={{ base: '12/14', 'xl': '4/6' }}
            direction='column'
            h={'full'}
            zIndex={200}

            bgColor={'black'}
          //mt={50}
          >
            <Box
              pt={0}
              bgColor='black'
            >
              <Heading
                color={'#e1ebeb'}
                fontSize={"clamp(2rem, 9vw, 9rem)"}
                textTransform="uppercase"
                textAlign={'center'}
              >
                In the back room
              </Heading>
            </Box>

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

            <Flex
              //h={['auto', 'auto', 'auto', '100vh']}
              filter='contrast(80%) brightness(140%)'
              my={32}
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
              </Box>
            </Flex>
          </Flex>
        </Grid>
        {children}
        <Footer />
      </Wrapper>
    </>
  )
}
