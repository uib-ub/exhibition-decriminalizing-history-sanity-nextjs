import React from 'react'
import Link from 'next/link'
import {
  Container,
  useColorMode,
  HStack,
  Box,
  Skeleton,
  Divider,
  // Image,
  keyframes,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Flex,
  ButtonGroup,
  Stack,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  Icon,
  Grid,
  Spacer
} from '@chakra-ui/react'
import ActiveLink from '../Link/ActiveLink'
import { NextRouter, useRouter } from 'next/router'
import { LocaleSwitcher } from '../Locale'
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useTranslations } from 'next-intl'
import DrawerMenu from './DrawerMenu'

export default function Nav({ value, justifyContent = 'end', alignSelf = 'end', direction = 'column', ...rest }) {
  const { locale, defaultLocale } = useRouter()
  const t = useTranslations('Layout');
  // const { colorMode, toggleColorMode } = useColorMode()
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
      fontWeight={800}
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

      <DrawerMenu>
        <Flex
          justifySelf={{ base: 'end', md: 'start' }}
          m={0}
          as="ul"
          style={{ listStyle: 'none' }}
          pt='10'
          direction={'column'}
          justifyContent={justifyContent}
          alignSelf={alignSelf}
        >
          {value && value.tree?.map((child) => (
            <ActiveLink
              key={child._key}
              p={2}
              bgColor={child.value.reference.backgroundColor?.hex}
              color={child.value.reference.foregroundColor?.hex}
              href={`/${child.value.reference.route}`}
              passHref
              role={'group'}
              activeProps={{ fontStyle: 'italic' }}
            >
              {child.value.reference.label[locale] || child.value.reference.label[defaultLocale] || 'Uten tittel'}
            </ActiveLink>
          ))}
          <Box
            color={'white'}
            px={2}
            py={1}
            display={{ base: 'none', md: 'block' }}
          >
            <LocaleSwitcher />
          </Box>
        </Flex>
      </DrawerMenu>
    </Box>
  )
}