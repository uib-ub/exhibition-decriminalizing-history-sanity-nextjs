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
      position={'relative'}
      maxW="full"
      py="20"
      px="5"
      fontSize={'2xl'}
      fontWeight={'700'}
      color={'white'}
      bgColor={'pink.400'}
    >

      {content && (
        <RenderSections sections={content} />
      )}

      <Text>
        {t('usesCookies')}{' '}
        <Link href={`/cookie-policy`}>{t('readAboutCookies')}</Link>
      </Text>

      <Box
        w={'clamp(120px, 30vw, 250px)'}
        position='absolute'
        top={[-10, -12, -14, -16]}
        right={10}
        zIndex={800}
      >
        <a href="https://www.uib.no/skeivtkultur%C3%A5r">
          <Image
            {...GetImage('image-95a25d7f3e11d0f0b59be9ced8e2d41645213069-2521x1308-png')}
            alt='Skeivt kulturår 2022 og Universitetet i Bergen'
            layout='responsive'
          />
        </a>
      </Box>
    </Container>
  )
}
