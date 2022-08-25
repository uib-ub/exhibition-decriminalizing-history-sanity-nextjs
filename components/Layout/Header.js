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

  const { data, ...rest } = props
  const { label, siteNav } = data

  return (
    <Flex
      as='header'
      w={'full'}
      justify={'space-between'}
      pt={{ base: 3, sm: 3, md: 3 }}
      gap={5}
      {...rest}
    >
      <Heading
        color='rgba(255,255,255)'
        fontSize={locale === 'no' ? 'clamp(1rem, 3vw, 3rem)' : "clamp(0.5rem, 2vw, 2vw)"}
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
