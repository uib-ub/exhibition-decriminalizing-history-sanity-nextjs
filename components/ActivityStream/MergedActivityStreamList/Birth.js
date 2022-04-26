import { Box } from '@chakra-ui/react'
import Link from '../../Link'
import Timespan from '../../Timespan'

export default function Birth(props) {
  // console.log(JSON.stringify(props, null, 2))
  if (!props.broughtIntoLife) {
    return null
  }

  const { broughtIntoLife, timespan, tookPlaceAt } = props

  return (
    <>
      <Timespan display="inline-block" fontWeight="bolder" timespan={timespan} />
      <Box>
        <Link href={`id/${broughtIntoLife._id}`}>
          {broughtIntoLife.label.no ?? 'Mangler norsk navn'}
        </Link>{' '}
        blir født{tookPlaceAt ? ` i ${tookPlaceAt[0].label.no}` : ''}.
      </Box>
    </>
  )
}
