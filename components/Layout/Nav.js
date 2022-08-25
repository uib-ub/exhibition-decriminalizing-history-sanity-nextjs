import React from 'react'
import {
  Box,
  Flex,
} from '@chakra-ui/react'
import ActiveLink from '../Link/ActiveLink'
import { useRouter } from 'next/router'
import { LocaleSwitcher } from '../Locale'

export default function Nav({ value, justifyContent = 'end', alignSelf = 'end', direction = 'column', ...rest }) {
  const { locale, defaultLocale } = useRouter()

  if (!value) {
    return null
  }

  return (
    <Box
      as="nav"
      display={{ base: 'none', md: 'flex' }}
      gridArea={'header'}
      direction={direction}
      alignItems={'stretch'}
      zIndex='6'
      fontWeight={600}
      fontSize={['', '1rem', 'clamp(1rem, 1.5vw, 1.2rem)', 'clamp(1rem, 1.5vw, 1rem)', '']}
      {...rest}
    >
      <Flex
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
