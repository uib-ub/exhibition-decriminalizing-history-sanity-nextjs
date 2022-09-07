import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  useDisclosure,
  Center,
  Flex,
  Button,
} from '@chakra-ui/react'
import React from 'react'
import ActiveLink from '../Link/ActiveLink'
import { LocaleSwitcher } from '../Locale'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { HamburgerIcon } from '@chakra-ui/icons'

export default function DrawerMenu({ value, justifyContent = 'space-evenly', alignSelf = 'center', direction = 'column', iconColor = 'pink.100', ...rest }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const { locale, defaultLocale } = useRouter()
  const t = useTranslations('Layout')

  return (
    <>
      <Button
        leftIcon={<HamburgerIcon transform={'translateY(3px)'} />}
        ref={btnRef}
        display={{ base: 'block', md: 'none' }}
        onClick={() => onOpen()}
        size='lg'
        mt={[2, 2, 4, 4]}
        borderRadius={0}
        color='white'
        bgColor='#A30A6E'
        _hover={{ bgColor: 'blackAlpha.900' }}
        {...rest}
      >
        {t('menu')}
      </Button>
      <Drawer
        placement="right"
        onClose={onClose}
        isOpen={isOpen}
        size="sm"
        onOverlayClick={onClose}
        motionPreset="scale"
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent bgColor='blackAlpha.900'>
            <DrawerCloseButton
              bgColor={'pink.400'}
              color={'white'}
              _hover={{ bgColor: '#A30A6E' }}
              w={10}
              h={10}
              mt={3}
              mr={3}
            />
            <DrawerBody>
              <Center h={'full'}>
                <Flex
                  as="ul"
                  w={'full'}
                  direction={direction}
                  justify={justifyContent}
                  alignSelf={alignSelf}
                  style={{ listStyle: 'none' }}
                  fontWeight={700}
                  fontSize={'xl'}
                  {...rest}
                >
                  {value && value.tree?.map((child) => (
                    <ActiveLink
                      key={child._key}
                      as="li"
                      onClick={onClose}
                      py={3}
                      px={5}
                      bgColor={child.value.reference.backgroundColor?.hex}
                      color={child.value.reference.foregroundColor?.hex}
                      href={`/${child.value.reference.route}`}
                      passHref
                      role={'group'}
                      activeProps={{ fontStyle: 'italic', fontWeight: 800, border: 'dotted 2px' }}
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
              </Center>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
