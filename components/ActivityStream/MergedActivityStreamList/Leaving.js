import { Box } from '@chakra-ui/react'
import Link from '../../Link'
import Timespan from '../../Timespan'

export default function Leaving(props) {
  // console.log(props)
  if (!props.separated) {
    return null
  }
  const { separated, separatedFrom, timespan } = props

  return (
    <>
      <Timespan display="inline-block" fontWeight="bolder" timespan={timespan} />
      <Box>
        <Link href={`id/${separated._id}`}>{separated.label.no ?? 'Mangler norsk navn'}</Link>{' '}
        forlater{' '}
        <Link href={`id/${separatedFrom._id}`}>
          {separatedFrom.label.no ?? 'Mangler norsk navn'}
        </Link>
      </Box>
    </>
  )
}
