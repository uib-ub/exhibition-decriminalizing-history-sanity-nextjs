import { Box, Grid } from '@chakra-ui/react'
import { SkipNavLink, SkipNavContent } from '@chakra-ui/skip-nav'
import { useTranslations } from 'next-intl';
import Header from './Header'
import PreviewAlert from './PreviewAlert'
import Footer from './Footer'
import Nav from './Nav'
// import Meta from './Meta'

const Wrapper = ({ children }) => {
  return (
    <Grid
      maxW={"full"}
      display="grid"
      autoRows="minmax(10px, auto) auto"
      templateColumns='auto 1fr'
      templateAreas='
        "nav main"
        "nav main"
        "nav footer"'
    >
      {children}
    </Grid>
  )
}

export default function Layout({ children, site, nav, preview = false }) {
  const t = useTranslations("Layout");

  return (
    <>
      <SkipNavLink>{t("skipToContent")}</SkipNavLink>
      <Wrapper>
        {preview && <PreviewAlert />}
        {/* <Meta /> */}
        <Box gridArea="nav" bgColor={'yellow.300'} position='sticky' top={0} height='100vh'>
          <Header data={{ ...site }} />
          <Nav value={nav} />
        </Box>

        <Box
          as="main"
          gridArea="main"
          maxW='full'
        >
          <SkipNavContent />
          {children}
        </Box>
        <Footer />
      </Wrapper>
    </>
  )
}
