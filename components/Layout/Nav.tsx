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
  useColorMode,
  HStack,
  Box,
  // Image,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import ActiveLink from '../Link/ActiveLink'
import { NextRouter, useRouter } from 'next/router'
import { arrayToTree } from 'performant-array-to-tree'
// import { imageBuilder } from '../../lib/sanity'

export default function Nav({ value }: any) {
  const { locale, defaultLocale }: NextRouter = useRouter()
  // const { colorMode, toggleColorMode } = useColorMode()
  if (!value) {
    return null
  }

  const tree = arrayToTree(value.tree)

  return (
    <Container
      as="nav"
      maxW="full"
      display="flex"
      boxSizing="border-box"
      px="4"
      py="2"
      backgroundColor="yellow.200"
    >
      <Flex direction="row" alignItems="center">
        <HStack marginStart={0} as="ul" style={{ listStyle: 'none' }}>
          {value && value.tree?.map((child: any) => (
            <Box key={child._key} as="li">
              <Link href={`/${child.value.reference.route}`}>
                {child.value.reference.label[locale!] || child.value.reference.label[defaultLocale!] || 'Uten tittel'}
              </Link>
            </Box>
          ))}
          {/* {tree && tree?.map((child: any) => (
            <Box key={child._key}>
              <Link href={`/${child.value.reference.route}`}>
                {child.value.reference.label[locale!] || child.value.reference.label[defaultLocale!] || 'Uten tittel'}
              </Link>
            </Box>
          ))} */}
          <Box as="li">
            <Link href={`/studio`} locale={false}>Studio</Link>
          </Box>
        </HStack>
        {/* <pre>{JSON.stringify(tree, null, 2)}</pre> */}
      </Flex>
    </Container>
  )
}