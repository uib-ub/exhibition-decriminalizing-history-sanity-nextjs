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
    <>
      <Container
        as="header"
        maxW="full"
        display="flex"
        boxSizing="border-box"
        px="4"
        py="2"
        {...rest}
        backgroundColor="yellow.100"
      >
        <Flex direction="row" alignItems="center">
          {/* <Image
            src={imageBuilder.image(logo).height(100).url()}
            alt="site logo"
            h={{ base: '25px' }}
            mr="4"
          /> */}
          <Heading
            fontSize={['lg', 'xl', '2xl', '2xl']}
          >
            <Link href="/">
              {/* <a>{label?.[locale] ?? label?.[defaultLocale]}</a> */}
              <a>#DecrimHist</a>
            </Link>
          </Heading>

        </Flex>
        <Spacer />

        <LocaleSwitcher />

      </Container>
    </>
  )
}
