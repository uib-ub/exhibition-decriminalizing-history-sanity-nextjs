import React from 'react'
import Link from 'next/link'
import {
  Container,
  useColorMode,
  HStack,
  Box,
  Skeleton,
  Divider,
  Grid,
  Heading,
  // Image,
} from '@chakra-ui/react'
import ActiveLink from '../Link/ActiveLink'
import { NextRouter, useRouter } from 'next/router'
import { LocaleSwitcher } from '../Locale'

export default function NavMegaMenu({ value }: any) {
  const { locale, defaultLocale }: NextRouter = useRouter()
  // const { colorMode, toggleColorMode } = useColorMode()
  if (!value) {
    return null
  }

  return (
    <Grid
      as="nav"
      w="full"
      templateColumns={"repeat(5, minmax(80px,1fr))"}
      autoRows={'minmax(100px, 1fr)'}
      display={{ base: 'none', md: 'grid' }}
    //rowGap='5'
    >
      {value && value.tree?.map((child: any, index: number) => (
        <>
          <Box
            key={child._key}
            m='0'
            px='5'
            pt='3'
            pb='10px'
            _even={{
              bg: 'purple.300',
            }}
            _odd={{
              bg: 'teal.200',
            }}
            fontWeight='900'
            color='white'
          >
            <Heading size={'sm'}>
              <Link href={`/${child.value.reference.route}`}>
                {child.value.reference.label[locale!] || child.value.reference.label[defaultLocale!] || 'Uten tittel'}
              </Link>
            </Heading>
            <Divider my={2} />
            <Divider my={2} />
          </Box>
          {/* {index === 4 && (
            <Box
             m='0'
            px='5'
            pt='3'
            pb='10px'
            _odd={{
              bg: 'purple.300',
            }}
            _even={{
              bg: 'teal.200',
            }}
              fontWeight='900'
              color='white'
            ></Box>
          )} */}
        </>
      ))}
      <Box
        key={'localeswitch'}
        m='0'
        px='5'
        pt='3'
        pb='10px'
        _even={{
          bg: 'purple.300',
        }}
        _odd={{
          bg: 'teal.200',
        }}
        fontWeight='900'
        color='white'
      >
        <LocaleSwitcher />
        <Divider my={2} />
        <Divider my={2} />
      </Box>
    </Grid >
  )
}