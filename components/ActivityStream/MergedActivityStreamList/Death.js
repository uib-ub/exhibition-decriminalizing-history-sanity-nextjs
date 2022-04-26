import { Box } from '@chakra-ui/react'
import Link from '../../Link'
import Timespan from '../../Timespan'

export default function Death(props) {
  // console.log(props)
  if (!props.deathOf) {
    return null
  }
  const { deathOf, timespan, tookPlaceAt } = props

  return (
    <>
      <Timespan display="inline-block" fontWeight="bolder" timespan={timespan} />
      <Box>
        <Link href={`id/${deathOf._id}`}>{deathOf.label.no ?? 'Ups! Mangler norsk navn'}</Link> dør
        {tookPlaceAt ? ` i ${tookPlaceAt[0].label.no}` : ''}.
      </Box>
    </>
  )
}
