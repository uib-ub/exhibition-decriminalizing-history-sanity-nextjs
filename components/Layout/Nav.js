import React from 'react'
import {
  Box,
  Flex,
} from '@chakra-ui/react'
import ActiveLink from '../Link/ActiveLink'
import { useRouter } from 'next/router'
import { LocaleSwitcher } from '../Locale'

export default function Nav({ value, justifyContent = 'start', alignSelf = 'start', direction = 'column', ...rest }) {
  const { locale, defaultLocale } = useRouter()

  if (!value) {
    return null
  }

  return (
    <Flex
      as="nav"
      display={{ base: 'none', md: 'flex' }}
      gridArea={'header'}
      direction={direction}
      alignItems={'stretch'}
      zIndex='6'
      fontWeight={700}
      fontSize={['', '1rem', 'clamp(1rem, 1.5vw, 1.2rem)', 'clamp(1rem, 1.5vw, 1rem)', '']}
      {...rest}
      gap={0}
      wrap='wrap'
      justifyContent={justifyContent}
      alignSelf={alignSelf}
    >
      {value && value.tree?.map((child) => (
        <ActiveLink
          key={child._key}
          py={2}
          px={4}
          bgColor={child.value.reference.backgroundColor?.hex}
          color={child.value.reference.foregroundColor?.hex}
          href={`/${child.value.reference.route}`}
          passHref
          activeProps={{ fontStyle: 'italic', fontWeight: 800, border: 'dotted 2px' }}
        >
          {child.value.reference.label[locale] || child.value.reference.label[defaultLocale] || 'Uten tittel'}
        </ActiveLink>
      ))}
      <Box
        bgColor={'white'}
        color={'black'}
        px={4}
        py={2}
      >
        <LocaleSwitcher />
      </Box>
    </Flex>

  )
}
