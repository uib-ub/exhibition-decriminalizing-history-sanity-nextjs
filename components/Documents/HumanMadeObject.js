import dynamic from 'next/dynamic'
import {
  Box,
  Grid,
  Container,
  Heading,
} from '@chakra-ui/react'
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

export default function HumanMadeObject(item) {
  const { locale, defaultLocale } = useRouter()

  return (
    <Container maxW={"6xl"}>
      <Heading
        as={'h2'}
        pt="14"
        mb={5}
        fontSize={'5xl'}
      >
        {item.label[locale ?? defaultLocale] ?? 'Missing default language label'}
      </Heading>

      <Grid
        maxW={'6xl'}
        gridGap={{ base: 0 }}
        alignContent="start"
        gridTemplateAreas={{ base: '"image" "metadata"' }}
        gridTemplateColumns={{ base: '1fr' }}
      >
        <Container maxW="full" gridArea="metadata" p="0">

          {item.description && <Description description={item.description} />}

          {item?.referredToBy && (
            <Box mt={5}>
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
              variant="basic"
              manifests={[{ manifest: item.manifest }]}
              height="70vh"
              bgColor={item.image?.palette.darkVibrant.background}
            />
          </Box>
        )}
      </Grid>
    </Container>
  )
}
