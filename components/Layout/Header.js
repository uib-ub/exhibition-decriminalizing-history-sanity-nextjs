import React from 'react'
import Link from 'next/link'
import {
  Box,
  Flex,
  Heading,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import DrawerMenu from './DrawerMenu'


export default function Header(props) {
  const { locale, defaultLocale } = useRouter()

  if (!props) {
    return null
  }

  const { data, color, bgColor, ...rest } = props
  const { label, siteNav } = data

  return (
    <Flex
      as='header'
      w={{ base: 'full', lg: 'min-content' }}
      justify={'space-between'}
      gap={5}
      color={color}
      bgColor={bgColor}
      {...rest}
    >
      <Heading
        as={'h2'}
        fontSize={locale === 'no' ? 'clamp(1rem, 2vw, 3rem)' : "clamp(1.2rem, 2vw, 28.4px)"}
        fontWeight={'800'}
        pb={1}
        color='white'
        bgColor={'black'}
        py={2}
        px={4}
      >
        <Link href="/">
          {label?.[locale ?? defaultLocale]}
        </Link>
      </Heading>
      <DrawerMenu value={siteNav} mr={3} />
    </Flex>
  )
}
