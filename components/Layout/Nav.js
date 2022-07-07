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

export default function Nav({ value }) {
  const { locale, defaultLocale } = useRouter()
  const t = useTranslations('Layout');
  // const { colorMode, toggleColorMode } = useColorMode()
  if (!value) {
    return null
  }

  return (
    <Grid
      as="nav"
      direction={'column'}
      maxW="full"
      alignItems={'stretch'}
      zIndex='6'
      //justifyContent={'space-between'}
      fontWeight={800}
      fontSize={['clamp(1rem, 1.5vw, 1.3rem)']}
      p={2}
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
            <Box
              key={child._key}
              as="li"
              m='0'
              px='5'
              pt='1'
              pb='10px'
              w='208px'
              h='80px'
              bgColor={child.value.reference.backgroundColor?.hex ?? 'purple.300'}
              color={child.value.reference.foregroundColor?.hex}
              _odd={{
                transform: "skew(0deg, -21deg)",
                transformStyle: 'preserve-3d',
                textAlign: 'right',
                m: '0',
                //bg: 'purple.300',
              }}
              _even={{
                transform: "skew(0deg, 21deg)",
                transformStyle: 'preserve-3d',
                m: '0',
                //bg: 'teal.200',
              }}
              fontWeight='900'

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
      </DrawerMenu >
      <Flex
        gap={0}
        wrap='wrap'
        justifyContent={'center'}
        alignSelf={'center'}
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
          //bgColor={'#ffd24f'}
          px={2}
          py={1}
          display={{ base: 'none', md: 'block' }}
        >
          <LocaleSwitcher />
        </Box>
      </Flex>
      {/* <Box
        px={2}
        py={1}
        color={'white'}
        //bgColor={'#ffd24f'}
        textTransform={'uppercase'}
        display={{ base: 'none', md: 'block' }}
      >
        <Popover
          trigger={'hover'}
          placement={'bottom-end'}
        >
          <PopoverTrigger>
            <a>
              {t('menu')}
            </a>
          </PopoverTrigger>

          <PopoverContent
            bgColor={'transparent'}
            border={0}
            rounded={'0'}
            minW={'md'}
          >
            <Flex
              gap={0}
              wrap='wrap'
              justifyContent={'center'}
            >
              {value && value.tree?.map((child) => (
                <Link
                  key={child._key}
                  href={`/${child.value.reference.route}`}
                  passHref
                  role={'group'}
                  display={'block'}
                  rounded={'md'}
                  bgColor={child.value.reference.backgroundColor?.hex}
                  color={child.value.reference.foregroundColor?.hex}
                >
                  <Stack
                    p={2}
                    direction={'row'}
                    align={'center'}
                    bgColor={child.value.reference.backgroundColor?.hex}
                  >
                    <Box
                      color={child.value.reference.foregroundColor?.hex}
                    >
                      <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
                        fontWeight={800}

                      >
                        {child.value.reference.label[locale] || child.value.reference.label[defaultLocale] || 'Uten tittel'}
                      </Text>
                      <Text fontSize={'sm'}>
                        {child.value.reference.description?.[locale] || child.value.reference.description?.[defaultLocale] || 'Uten beskrivelse'}
                      </Text>
                    </Box>
                  </Stack>
                </Link>
              ))}
            </Flex>
          </PopoverContent>
        </Popover>

      </Box> */}

      {/* <Box
        color={'white'}
        //bgColor={'#ffd24f'}
        textTransform={'uppercase'}
        px={2}
        py={1}
        display={{ base: 'none', md: 'block' }}
      >
        <LocaleSwitcher />
      </Box> */}
    </Grid >
  )
}

/* 
<HStack
        m={0}
        as="ul"
        style={{ listStyle: 'none' }}
        display='inline-block'
        pt='10'
      >
        {value && value.tree?.map((child: any, index: number) => (
          <Box
            animation={animation}
            key={child._key}
            as="li"
            m='0'
            px='5'
            pt='1'
            pb='10px'
            w='208px'
            _odd={{
              transform: "skew(0deg, -17deg)",
              transformStyle: 'preserve-3d',
              textAlign: 'right',
              m: '0',
              bg: 'purple.300',

            }}
            _even={{
              transform: "skew(0deg, 17deg)",
              transformStyle: 'preserve-3d',
              m: '0',
              bg: 'teal.200',
            }}
            fontWeight='900'
            color='white'
          >
            <Link href={`/${child.value.reference.route}`}>
              {child.value.reference.label[locale!] || child.value.reference.label[defaultLocale!] || 'Uten tittel'}
            </Link>
            <Divider my={2} />
            <Divider my={2} />
          </Box>
        ))}
        <Box
          animation={animation}
          as="li"
          m='0'
          p='5'
          pt='1'
          pb='10px'
          w='208px'
          _odd={{
            transform: "skew(deg, -17deg)",
            transformStyle: 'preserve-3d',
            m: '0',
            bg: 'purple.300',
            textAlign: 'right',

          }}
          _even={{
            transform: "skew(0deg, 17deg)",
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
      </HStack>
       */