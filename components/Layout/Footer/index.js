import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import Link from '../../Link'
import RenderSections from '../../Sections/RenderSection'
import React from 'react'
import ActiveLink from '../../Link/ActiveLink'

export default function Footer(props) {
  const { colorMode, toggleColorMode } = useColorMode()
  const color = useColorModeValue('gray.500', 'gray.400')
  const navColor = useColorModeValue('black', 'white')

  if (!props) {
    return null
  }


  const { content, mainNavigation, navMenu, license, publisher } = props

  return (
    <Container
      as="footer"
      gridArea="footer"
      maxW="full"
      minH="100px"
      mt={['0', null, '8', null]}
      py="6"
      px="0"
      zIndex="100"
      color={color}
      backgroundImage={`url('${footer}')`}
      backgroundPosition={['50% 10%', '50% 8%', '50% 4%', null]}
      backgroundRepeat="no-repeat"
    >
      <Flex pl="5">
        <Button
          aria-label="Skift mellom dagmodus eller nattmodus"
          variant="link"
          onClick={toggleColorMode}
        >
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>

      <Container maxW="2xl" px="4" pt={['12%', '10%', '8%', null]} centerContent>
        {mainNavigation?.items && (
          <Flex
            fontSize={['xl', null, '2xl', null]}
            wrap="wrap"
            justify="center"
            mt="3"
            color={navColor}
          >
            {mainNavigation?.items &&
              mainNavigation.items.map((item) => (
                <Box key={item._key} px="2">
                  <ActiveLink href={`/${item.route}`} activeClassName="active">
                    <a>{item.label}</a>
                  </ActiveLink>
                </Box>
              ))}
          </Flex>
        )}

        {navMenu?.items && (
          <Flex
            mb="8"
            fontSize={['lg', null, 'xl', null]}
            wrap="wrap"
            justify="center"
            mt="3"
            color={navColor}
          >
            {navMenu?.items &&
              navMenu.items.map((item) => (
                <Box key={item._key} px="2">
                  <ActiveLink href={`/${item.route}`} activeClassName="active">
                    <a>{item.label}</a>
                  </ActiveLink>
                </Box>
              ))}
          </Flex>
        )}

        <Divider mb="10" />

        {content && (
          <Box textAlign="center">
            <RenderSections sections={content} />
          </Box>
        )}

        <Container p="0" centerContent>
          <Text fontSize="md" textAlign="center">
            Denne nettsiden benytter informasjonskapsler.{' '}
            <Link href={`informasjonskapsler`}>Les mer om våre informasjonskapsler</Link>
          </Text>
        </Container>
      </Container>
    </Container>
  )
}
