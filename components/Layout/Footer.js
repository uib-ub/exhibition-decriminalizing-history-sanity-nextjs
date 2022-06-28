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
import Link from '../Link'
import RenderSections from '../Sections/RenderSection'
import React from 'react'
import ActiveLink from '../Link/ActiveLink'
import { useTranslations } from 'next-intl'

export default function Footer(props) {
  const t = useTranslations('Layout')
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
      py="6"
      px="0"
    >

      <Container maxW="2xl" px="4" centerContent>
        {/* <Box fontSize="xl">
          <Link href={`/studio`} locale={false}>Studio</Link>
        </Box> */}

        {content && (
          <RenderSections sections={content} />
        )}

        <Container p="0">
          <Text textAlign="center">
            {t('usesCookies')}{' '}
            <Link href={`/cookie-policy`}>{t('readAboutCookies')}</Link>
          </Text>
        </Container>
      </Container>
    </Container>
  )
}
