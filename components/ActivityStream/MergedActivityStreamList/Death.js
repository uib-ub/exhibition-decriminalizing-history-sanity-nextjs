import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from '../../Link'
import Timespan from '../../Timespan'

export default function Death(props) {
  const { locale, defaultLocale } = useRouter()

  if (!props && !props.deathOf) {
    return null
  }
  const { deathOf, timespan, tookPlaceAt } = props

  return (
    <>
      <Timespan display="inline-block" fontWeight="bolder" timespan={timespan} />
      <Box>
        <Link href={`id/${deathOf._id}`}>{deathOf.label[locale] ?? deathOf.label[defaultLocale]}</Link> dør
        {tookPlaceAt ? ` i ${tookPlaceAt[0].label[locale] ?? tookPlaceAt[0].label[defaultLocale]}` : `${tookPlaceAt[0].label[locale] ?? tookPlaceAt[0].label[defaultLocale]}`}.
      </Box>
    </>
  )
}
