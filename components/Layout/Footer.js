import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Text,
} from '@chakra-ui/react'
import Link from '../Link'
import RenderSections from '../TextBlocks/Blocks/RenderSection'
import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { GetImage } from '../../lib/sanity.server'

export default function Footer(props) {
  const t = useTranslations('Layout')

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
      bgColor={'pink.400'}
    >

      <Container maxW="2xl" px="4" centerContent>
        <Box fontSize="xl">
          <Link href={`/studio`} locale={false}>Studio</Link>
        </Box>

        {content && (
          <RenderSections sections={content} />
        )}

        <Container p="0">
          <Text textAlign="center">
            {t('usesCookies')}{' '}
            <Link href={`/cookie-policy`}>{t('readAboutCookies')}</Link>
          </Text>
        </Container>

        <Box
          w={'clamp(150px, 42vw, 250px)'}
          position='absolute'
          bottom={10}
          right={10}
          zIndex={800}
        >
          <Image
            {...GetImage('image-95a25d7f3e11d0f0b59be9ced8e2d41645213069-2521x1308-png')}
            alt='Skeivt kulturår 2022 og Universitetet i Bergen'
            layout='responsive'
          />
        </Box>

      </Container>
    </Container>
  )
}
