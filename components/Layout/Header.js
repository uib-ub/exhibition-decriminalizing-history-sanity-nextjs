import React from 'react'
import Link from 'next/link'
import {
  Container,
  Flex,
  Heading,
  useColorMode,
  useColorModeValue,
  Spacer,
  // Image,
} from '@chakra-ui/react'
import LocaleSwitcher from '../Locale/LocaleSwitcher'
import { useRouter } from 'next/router'
// import { imageBuilder } from '../../lib/sanity'

export default function Header(props) {
  const { locale, defaultLocale } = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()

  if (!props) {
    return null
  }

  const { data, ...rest } = props
  const { label, /* logo, */ } = data

  return (
    <Container
      as="header"
      maxW="full"
      display="flex"
      boxSizing="border-box"
      px="4"
      py="2"
      {...rest}
    >
      <Heading
        transform="skew(0deg, -17deg) translate(0px, 30px)"
        fontSize={['lg', '2xl', '3xl', '3xl']}
      >
        <Link href="/">
          {/* <a>{label?.[locale] ?? label?.[defaultLocale]}</a> */}
          <a>#DecrimHist</a>
        </Link>
      </Heading>
    </Container>
  )
}
