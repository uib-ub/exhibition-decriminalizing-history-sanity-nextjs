import dynamic from 'next/dynamic'
import {
  Box,
  Button,
  Grid,
  Container,
  Heading,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useClipboard,
  Code,
} from '@chakra-ui/react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import ReferredToBy from '../ReferredToBy'
import Palette from '../Palette'
import Depicts from '../Depicts'
import ActivityStream from '../ActivityStream/HumanMadeObjectActivityStream'
import HasType from '../HasType'
import Homepage from '../Homepage'
import Subject from '../Subject'
import CurrentOwner from '../CurrentOwner'
import Description from '../Description'

const MiradorWithNoSSR = dynamic(() => import('../MiradorViewer'), { ssr: false })

export default function HumanMadeObject(item) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { hasCopied, onCopy } = useClipboard(JSON.stringify(item, null, 2))

  return (
    <Grid
      w="100%"
      p={5}
      gridGap={{ base: 0 }}
      alignContent="start"
      gridTemplateAreas={{ base: '"image" "metadata"' }}
      gridTemplateColumns={{ base: '1fr' }}
    >
      <Container maxW="full" gridArea="metadata" p="0">
        <Heading fontFamily="EB Garamond" fontWeight="thin" mt={5} mb={5}>
          {item.label.no}

          <Button variant="link" size="lg" onClick={onOpen}>
            <Icon as={BiDotsVerticalRounded} />
          </Button>
        </Heading>

        {item.description && <Description description={item.description} />}

        {item?.referredToBy && (
          <Box>
            <ReferredToBy array={item.referredToBy} />
          </Box>
        )}

        {item.image?.palette && <Palette colors={item.image?.palette} />}

        <Grid as="dl" pt="4" templateColumns={['2fr', '2fr', '160px auto']}>
          {item.hasType && <HasType types={item.hasType} />}

          {item.subject && <Subject subjects={item.subject} />}

          {item.depicts && <Depicts depicted={item.depicts} />}

          {item.homepage && <Homepage homepage={item.homepage} />}

          {item.hasCurrentOwner && <CurrentOwner owners={item.hasCurrentOwner} />}
        </Grid>

        {item.activityStream && <ActivityStream stream={item.activityStream} />}
      </Container>

      {item.subjectOfManifest && (
        <Box gridArea="image">
          <MiradorWithNoSSR manifests={[{ manifest: item.subjectOfManifest }]} height="70vh" />
        </Box>
      )}

      {item.manifest && !item.subjectOfManifest && (
        <Box gridArea="image">
          <MiradorWithNoSSR
            hideWindowTitle="true"
            manifests={[{ manifest: item.manifest }]}
            height="70vh"
          />
        </Box>
      )}

      <Modal isOpen={isOpen} size="4xl" onClose={onClose} scrollBehavior="inside">
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>JSON</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Code w="full" fontSize="xs" p="2">
                <pre>{JSON.stringify(item, null, 2)}</pre>
              </Code>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button onClick={onCopy} ml={2}>
                {hasCopied ? 'Copied' : 'Copy'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Grid>
  )
}
