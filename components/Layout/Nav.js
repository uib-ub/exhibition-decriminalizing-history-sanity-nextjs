import React from 'react'
import {
  Box,
  Flex,
} from '@chakra-ui/react'
import ActiveLink from '../Link/ActiveLink'
import { useRouter } from 'next/router'
import { LocaleSwitcher } from '../Locale'
import DrawerMenu from './DrawerMenu'

function Drawer({ value, justifyContent = 'space-evenly', alignSelf = 'end', direction = 'column', ...rest }) {
  const { locale, defaultLocale } = useRouter()

  if (!value) {
    return null
  }

  return (
    <DrawerMenu>
      <Flex
        as="ul"
        w={'full'}
        h={'full'}
        direction={direction}
        justify={justifyContent}
        alignSelf={alignSelf}
        style={{ listStyle: 'none' }}
        fontWeight={600}
        fontSize={'xl'}
        {...rest}
      >
        {value && value.tree?.map((child) => (
          <ActiveLink
            as="li"
            key={child._key}
            py={3}
            px={5}
            bgColor={child.value.reference.backgroundColor?.hex}
            color={child.value.reference.foregroundColor?.hex}
            href={`/${child.value.reference.route}`}
            passHref
            role={'group'}
            activeProps={{ fontStyle: 'italic', fontWeight: 800, transform: 'translate(-5px, -5px)', boxShadow: '5px 5px 0px white', border: 'dotted 2px' }}

          >
            {child.value.reference.label[locale] || child.value.reference.label[defaultLocale] || 'Uten tittel'}
          </ActiveLink>
        ))}
        <Box
          as="li"
          color={'white'}
          bgColor={'black'}
          py={3}
          px={5}
        >
          <LocaleSwitcher />
        </Box>
      </Flex>
    </DrawerMenu>
  )
}

function Nav({ value, justifyContent = 'end', alignSelf = 'end', direction = 'column', ...rest }) {
  const { locale, defaultLocale } = useRouter()

  if (!value) {
    return null
  }

  return (
    <Box
      as="nav"
      gridArea={'header'}
      direction={direction}
      alignItems={'stretch'}
      zIndex='6'
      fontWeight={600}
      fontSize={['', '1rem', 'clamp(1rem, 1.5vw, 1.2rem)', 'clamp(1rem, 1.5vw, 1rem)', '']}
      {...rest}
    >

      <Flex
        display={{ base: 'none', md: 'flex' }}
        gap={0}
        wrap='wrap'
        justifyContent={justifyContent}
        alignSelf={alignSelf}
      >
        {value && value.tree?.map((child) => (
          <ActiveLink
            key={child._key}
            py={2}
            px={6}
            bgColor={child.value.reference.backgroundColor?.hex}
            color={child.value.reference.foregroundColor?.hex}
            href={`/${child.value.reference.route}`}
            passHref
            role={'group'}
            activeProps={{ fontStyle: 'italic', fontWeight: 800, transform: 'translate(-12px, 4px)', boxShadow: '5px 5px 0px black', border: 'dotted 2px' }}
          >
            {child.value.reference.label[locale] || child.value.reference.label[defaultLocale] || 'Uten tittel'}
          </ActiveLink>
        ))}
        <Box
          bgColor={'white'}
          color={'black'}
          px={6}
          py={'7px'}
        >
          <LocaleSwitcher />
        </Box>
      </Flex>
    </Box>
  )
}

export { Nav, Drawer }