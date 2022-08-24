import {
  Box,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  Flex,
  List,
  ListItem,
  Icon,
  useDisclosure,
  VStack,
  Center,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { HamburgerIcon } from '@chakra-ui/icons'
import ActiveLink from '../Link/ActiveLink'

export default function DrawerMenu({ children, iconColor = 'pink.100' }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      display={{ base: 'flex', md: 'none' }}
    >
      <IconButton
        display={{ base: 'block', md: 'none' }}
        onClick={() => onOpen()}
        icon={<HamburgerIcon w={10} h={10} />}
        size='lg'
        w={8}
        h={8}
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
                {children}
              </Center>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>

      </Drawer>
    </Box>
  )
}
