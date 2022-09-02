import { Box, Flex, Grid, Spacer } from '@chakra-ui/react'
import { SkipNavLink, SkipNavContent } from '@chakra-ui/skip-nav'
import { useTranslations } from 'next-intl';
import Header from './Header'
import PreviewAlert from './PreviewAlert'
import Footer from './Footer'
import Nav from './Nav'
import Meta from './Meta'

const Wrapper = ({ children, ...rest }) => {
  return (
    <Grid
      maxW={"full"}
      templateColumns='auto min-content'
      templateAreas='
        "header header"
        "main main"
        "footer footer"
      '
      {...rest}
    >
      {children}
    </Grid>
  )
}

export default function Layout({ children, siteSettings, siteNav, color, bgColor, preview = false }) {
  const t = useTranslations("Layout");

  return (
    <>
      <Meta />
      {preview && <PreviewAlert />}
      <SkipNavLink>{t("skipToContent")}</SkipNavLink>
      <Wrapper
        color={color}
        bgColor={bgColor}
      >
        <Grid
          gridArea="header"
          maxW={'full'}
          align='start'
          //justifyContent={'space-between'}
          mb={[3, 8, 12, 16]}
          gridTemplateAreas={{ base: `'headerTitle'`, md: `'headerTitle nav'` }}
        >
          <Header gridArea='headerTitle' data={{ ...siteSettings, siteNav, color, bgColor }} />
          <Nav gridArea='nav' value={siteNav} direction='row' />
        </Grid>

        <Box
          as="main"
          gridArea="main"
          maxW='full'
          pb={12}
        >
          <SkipNavContent />
          {children}
        </Box>

        <Footer />
      </Wrapper>
    </>
  )
}
