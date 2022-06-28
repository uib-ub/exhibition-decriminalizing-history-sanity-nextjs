import { Box, Grid } from '@chakra-ui/react'
import { SkipNavLink, SkipNavContent } from '@chakra-ui/skip-nav'
import { useTranslations } from 'next-intl';
import Header from './Header'
import PreviewAlert from './PreviewAlert'
import Footer from './Footer'
import Nav from './Nav'
import Meta from './Meta'

const Wrapper = ({ children }) => {
  return (
    <Grid
      maxW={"full"}
      display="grid"
      templateColumns='auto 1fr'
      templateAreas='
        "header header"
        "nav main"
        "footer footer"'
    >
      {children}
    </Grid>
  )
}

export default function FrontPageLayout({ children, site, nav, preview = false }) {
  const t = useTranslations("Layout");

  return (
    <>
      <Meta />
      <SkipNavLink>{t("skipToContent")}</SkipNavLink>
      <Wrapper>
        {preview && <PreviewAlert />}
        {/* <Header gridArea="header" data={{ ...site, nav }} /> */}

        {/* <Nav gridArea="nav" value={nav} /> */}

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
