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
import { useRouter } from 'next/router'
import CanvasPanel from '../IIIF/CanvasPanel'

const MiradorWithNoSSR = dynamic(() => import('../IIIF/MiradorViewer'), { ssr: false })
//const YithViewerWithNoSSR = dynamic(() => import('../IIIF/YithViewer'), { ssr: false })

export default function HumanMadeObject(item) {
  const { locale, defaultLocale } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { hasCopied, onCopy } = useClipboard(JSON.stringify(item, null, 2))

  return (
    <Container maxW={"4xl"}>
      <Heading pt="14" mb={5} fontSize={'5xl'}>
        {item.label[locale] ?? item.label[defaultLocale]}

        <Button variant="link" size="lg" onClick={onOpen}>
          <Icon as={BiDotsVerticalRounded} />
        </Button>
      </Heading>
      <Grid
        maxW={'4xl'}
        gridGap={{ base: 0 }}
        alignContent="start"
        gridTemplateAreas={{ base: '"image" "metadata"' }}
        gridTemplateColumns={{ base: '1fr' }}
      >
        <Container maxW="full" gridArea="metadata" p="0">

          {item.description && <Description description={item.description} />}

          {item?.referredToBy && (
            <Box>
              <ReferredToBy array={item.referredToBy} />
            </Box>
          )}

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
            <MiradorWithNoSSR
              manifests={[{ manifest: item.subjectOfManifest }]}
              height="70vh"
              variant="basic"
              bgColor={item.image?.palette.darkVibrant.background}
            />
          </Box>
        )}

        {item.manifest && !item.subjectOfManifest && (
          <Box gridArea="image">
            <MiradorWithNoSSR
              hideWindowTitle="true"
              manifests={[{ manifest: item.manifest }]}
              height="70vh"
              bgColor={item.image?.palette.darkVibrant.background}
            />
          </Box>
        )}

        {/* {item.subjectOfManifest && (
        <Box gridArea="image">
          <YithViewerWithNoSSR id={item.subjectOfManifest} type="projection" preview="figure" size={300} />
        </Box>
      )} */}
        {/*   {item.manifest && !item.subjectOfManifest && (
        <Box gridArea="image">
          <YithViewerWithNoSSR id={item.manifest} type="presentation" preview="figure" size={300} />
        </Box>
      )} */}

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
    </Container>
  )
}
