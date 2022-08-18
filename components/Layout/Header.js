import React from 'react'
import Link from 'next/link'
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  useColorMode,
  useColorModeValue,
  Spacer,
  DrawerCloseButton,
  // Image,
} from '@chakra-ui/react'
import LocaleSwitcher from '../Locale/LocaleSwitcher'
import { useRouter } from 'next/router'
import DrawerMenu from './DrawerMenu'
import { ArrowBackIcon } from '@chakra-ui/icons'
import Nav from './Nav'

export default function Header(props) {
  const { locale, defaultLocale } = useRouter()

  if (!props) {
    return null
  }

  const { data, ...rest } = props
  const { label, siteNav, color, bgColor /* logo, */ } = data

  return (
    <Container
      as="header"
      display="flex"
      alignItems={'center'}
      justifyContent={'space-between'}
      maxW='full'
      color={color}
      bgColor={bgColor}
      p={2}
      {...rest}
    >
      <Heading
        fontSize={'clamp(1.5rem, 1vw , 3rem)'}
        fontWeight='400'
      //textTransform="uppercase"
      >
        <ArrowBackIcon />
        <Link href="/">
          #decrimhist
          {/* <a>{label?.[locale] ?? label?.[defaultLocale]}</a> */}
        </Link>
      </Heading>

      <Nav value={siteNav} />

      <DrawerMenu>
        <Flex
          m={0}
          as="ul"
          style={{ listStyle: 'none' }}
          display='inline-block'
          pt='10'
          direction={'column'}
        >
          {siteNav && siteNav.tree?.map((child) => (
            <Box
              key={child._key}
              as="li"
              m='0'
              px='5'
              pt='1'
              pb='10px'
              w='208px'
              h='80px'
              _odd={{
                transform: "skew(0deg, -21deg)",
                transformStyle: 'preserve-3d',
                textAlign: 'right',
                m: '0',
                bg: 'purple.300',
              }}
              _even={{
                transform: "skew(0deg, 21deg)",
                transformStyle: 'preserve-3d',
                m: '0',
                bg: 'teal.200',
              }}
              fontWeight='900'
              color='white'
            >
              <Link href={`/${child.value.reference.route}`}>
                {child.value.reference.label[locale] || child.value.reference.label[defaultLocale] || 'Uten tittel'}
              </Link>
              <Divider my={2} />
              <Divider my={2} />
            </Box>
          ))}
          <Box
            as="li"
            m='0'
            px='5'
            pt='1'
            pb='10px'
            w='208px'
            h='80px'
            _odd={{
              transform: "skew(0deg, -21deg)",
              transformStyle: 'preserve-3d',
              textAlign: 'right',
              m: '0',
              bg: 'purple.300',
            }}
            _even={{
              transform: "skew(0deg, 21deg)",
              transformStyle: 'preserve-3d',
              m: '0',
              bg: 'teal.200',
            }}
            fontWeight='900'
            color='white'
          >
            <LocaleSwitcher />
            <Divider my={2} />
            <Divider my={2} />
          </Box>
        </Flex>
      </DrawerMenu>
    </Container>
  )
}
