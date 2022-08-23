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
      position={'relative'}
      gridArea="footer"
      maxW="full"
      py="16"
      px="0"
      bgColor={'pink.400'}
    >

      <Container maxW="2xl" px="4" centerContent>
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
          w={'clamp(50px, 22vw, 250px)'}
          position='absolute'
          top={[-8, -8, -12, -14]}
          right={10}
          zIndex={800}
        >
          <a href="https://uib.no">
            <Image
              {...GetImage('image-95a25d7f3e11d0f0b59be9ced8e2d41645213069-2521x1308-png')}
              alt='Skeivt kulturår 2022 og Universitetet i Bergen'
              layout='responsive'
            />
          </a>
        </Box>

      </Container>
    </Container>
  )
}
