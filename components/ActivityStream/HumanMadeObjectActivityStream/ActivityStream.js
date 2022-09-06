import {
  Heading,
  Wrap,
} from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import RenderHumanMadeObjectActivityStream from './RenderHumanMadeObjectActivityStream'

export default function ActivityStream({ stream }) {
  const t = useTranslations('Item')

  if (!stream) {
    return null
  }

  return (
    <>
      <Heading as="dt" fontWeight="semibold" pb="2" size={'md'}>
        {t('activitystream')}
      </Heading>
      <Wrap as="dd" mb={{ base: 8, lg: 0 }}>
        <RenderHumanMadeObjectActivityStream stream={stream} />
      </Wrap>
    </>
  )
}
