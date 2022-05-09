import { Box } from '@components/Box'
import { Container } from '@components/Container'
import { Grid } from '@components/Grid'
import { Heading } from '@components/Heading'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import ActivityStream from '../ActivityStream/HumanMadeObjectActivityStream'
import CurrentOwner from '../CurrentOwner'
import Depicts from '../Depicts'
import Description from '../Description'
import HasType from '../HasType'
import Homepage from '../Homepage'
import Palette from '../Palette'
import ReferredToBy from '../ReferredToBy'
import Subject from '../Subject'
const MiradorWithNoSSR = dynamic(() => import('../MiradorViewer'), { ssr: false })

export default function HumanMadeObject(item) {
  const { locale, defaultLocale } = useRouter()


  return (
    <Grid>
      <Container>
        <Heading>
          {item.label[locale] || 'Missing default language label'}
        </Heading>

        {item.description && <Description description={item.description} />}

        {item?.referredToBy && (
          <Box>
            <ReferredToBy array={item.referredToBy} />
          </Box>
        )}

        {item.image?.palette && <Palette colors={item.image?.palette} />}

        <Grid as="dl" pt="4" columns={['2fr', '2fr', '160px auto']}>
          {item.hasType && <HasType types={item.hasType} />}

          {item.subject && <Subject subjects={item.subject} />}

          {item.depicts && <Depicts depicted={item.depicts} />}

          {item.homepage && <Homepage homepage={item.homepage} />}

          {item.hasCurrentOwner && <CurrentOwner owners={item.hasCurrentOwner} />}
        </Grid>

        {item.activityStream && <ActivityStream stream={item.activityStream} />}
      </Container>

      {item.subjectOfManifest && (
        <Box>
          <MiradorWithNoSSR manifests={[{ manifest: item.subjectOfManifest }]} height="70vh" />
        </Box>
      )}

      {item.manifest && !item.subjectOfManifest && (
        <Box>
          <MiradorWithNoSSR
            hideWindowTitle="true"
            manifests={[{ manifest: item.manifest }]}
            height="70vh"
          />
        </Box>
      )}
    </Grid>
  )
}
