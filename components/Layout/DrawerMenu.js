import {
  Box,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  useDisclosure,
  Center,
  Flex,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import React from 'react'
import ActiveLink from '../Link/ActiveLink'
import { LocaleSwitcher } from '../Locale'
import { useRouter } from 'next/router'

export default function DrawerMenu({ value, justifyContent = 'space-evenly', alignSelf = 'end', direction = 'column', iconColor = 'pink.100', ...rest }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const { locale, defaultLocale } = useRouter()

  return (
    <>
      <IconButton
        ref={btnRef}
        display={{ base: 'block', md: 'none' }}
        onClick={() => onOpen()}
        icon={<HamburgerIcon w={10} h={10} />}
        size='lg'
        alignSelf={'flex-start'}
        color={iconColor}
        variant={'link'}
      />
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
              _hover={{ bgColor: 'rgb(245,25,150)' }}
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
                  fontWeight={600}
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
                      activeProps={{ fontStyle: 'italic', fontWeight: 800, transform: 'translate(-5px, -5px)', boxShadow: '5px 5px 0px rgba(255, 255, 255, .5)', border: 'dotted 2px' }}
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
