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
      w={{ base: 'full', md: 'min-content' }}
      justify={'space-between'}
      pt={{ base: 3, sm: 3, md: 3 }}
      gap={5}
      {...rest}
      color={color}
      bgColor={bgColor}
    >
      <Heading
        as={'h1'}
        fontSize={locale === 'no' ? 'clamp(1rem, 2vw, 3rem)' : "clamp(1rem, 2vw, 3vw)"}
        fontWeight={'800'}
        pb={1}
      >
        <Link href="/">
          {label?.[locale ?? defaultLocale]}
        </Link>
      </Heading>
      <DrawerMenu value={siteNav} />
    </Flex>
  )
}
