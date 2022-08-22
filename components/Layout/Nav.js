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
  Grid
} from '@chakra-ui/react'
import ActiveLink from '../Link/ActiveLink'
import { NextRouter, useRouter } from 'next/router'
import { LocaleSwitcher } from '../Locale'
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useTranslations } from 'next-intl'
import DrawerMenu from './DrawerMenu'

export default function Nav({ value, justifyContent = 'end', alignSelf = 'end', ...rest }) {
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
      direction={'column'}
      maxW="full"
      alignItems={'stretch'}
      zIndex='6'
      fontWeight={400}
      fontSize={['', '1rem', 'clamp(1rem, 1.5vw, 1.2rem)', 'clamp(1rem, 1.5vw, 1rem)', '']}
      {...rest}
    >
      <DrawerMenu>
        <Flex
          m={0}
          as="ul"
          style={{ listStyle: 'none' }}
          display='inline-block'
          pt='10'
          direction={'column'}
        >
          {value && value.tree?.map((child) => (
            <Text
              key={child._key}
              p={2}
              bgColor={child.value.reference.backgroundColor?.hex}
              transition={'all .3s ease'}
              _groupHover={{ color: 'pink.400' }}
              fontWeight={800}
              color={child.value.reference.foregroundColor?.hex}
            >
              <Link
                href={`/${child.value.reference.route}`}
                passHref
                role={'group'}
              >
                {child.value.reference.label[locale] || child.value.reference.label[defaultLocale] || 'Uten tittel'}
              </Link>
            </Text>
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
      </DrawerMenu >

      <Flex
        display={{ base: 'none', md: 'flex' }}
        gap={0}
        wrap='wrap'
        justifyContent={justifyContent}
        alignSelf={alignSelf}
      >
        {value && value.tree?.map((child) => (
          <Text
            key={child._key}
            p={2}
            bgColor={child.value.reference.backgroundColor?.hex}
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            color={child.value.reference.foregroundColor?.hex}
          >
            <Link
              href={`/${child.value.reference.route}`}
              passHref
              role={'group'}
            >
              {child.value.reference.label[locale] || child.value.reference.label[defaultLocale] || 'Uten tittel'}
            </Link>
          </Text>
        ))}
        <Box
          bgColor={'white'}
          color={'black'}
          px={2}
          py={'7px'}
        >
          <LocaleSwitcher />
        </Box>
      </Flex>
    </Box>
  )
}