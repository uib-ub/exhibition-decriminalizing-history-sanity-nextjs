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

export default function DrawerMenu({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      display={{ base: 'block', md: 'none' }}
    >
      <IconButton
        display={{ base: 'block', md: 'none' }}
        onClick={() => onOpen()}
        icon={<HamburgerIcon w={10} h={10} />}
        size='lg'
        w={10}
        h={10}
        color={'pink.400'}
        variant={'link'}
      />
      <Drawer
        placement="right"
        onClose={onClose}
        isOpen={isOpen}
        size="xs"
        onOverlayClick={onClose}
      //motionPreset="scale"
      >
        <DrawerOverlay>
          <DrawerContent
            //bgColor="transparent"
            bgColor="whiteAlpha.600"
          >
            <DrawerCloseButton
              bgColor="yellow.400"
            />
            <DrawerBody>
              <Center>
                {children}
              </Center>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>

      </Drawer>
    </Box>
  )
}
