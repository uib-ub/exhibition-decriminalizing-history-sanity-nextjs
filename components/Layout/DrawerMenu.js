import {
  Box,
  Button,
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
    <Box>
      <Button
        display={{ base: 'block', md: 'none' }}
        onClick={() => onOpen()}
        leftIcon={<HamburgerIcon />}
      />
      <Drawer
        placement="bottom"
        onClose={onClose}
        isOpen={isOpen}
        size="full"
        onOverlayClick={onClose}
        motionPreset="scale"
      >
        <DrawerOverlay>
          <DrawerContent bgColor="yellow.400">
            <DrawerCloseButton />
            <DrawerBody>
              <Center>
                {children}
              </Center>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
        <Button
          onClick={() => onClose()}
        />
      </Drawer>
    </Box>
  )
}
