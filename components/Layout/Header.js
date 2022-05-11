import React from 'react'
import Link from 'next/link'
import {
  Button,
  Container,
  Flex,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
  Heading,
  Icon,
  useColorMode,
  useColorModeValue,
  Spacer,
  Portal,
  // Image,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import ActiveLink from '../Link/ActiveLink'
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
            fontWeight={{ base: 'normal' }}
            fontFamily="EB Garamond"
          >
            <Link href="/">
              <a>{label?.[locale] ?? label?.[defaultLocale]}</a>
            </Link>
          </Heading>

        </Flex>

        <Spacer />

        <LocaleSwitcher />
      </Container>
    </>
  )
}
