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
      display="grid"
      templateColumns='auto 1fr'
      templateAreas='
        "header header"
        "main main"
        "footer footer"'
      {...rest}
    >
      {children}
    </Grid>
  )
}

export default function Layout({ children, site, nav, color, bgColor, preview = false }) {
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
        <Flex
          gridArea="header"
          maxW={'full'}
        >
          <Header data={{ ...site, nav, color, bgColor, }} />
          <Spacer />
          <Nav value={nav} />
        </Flex>

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
