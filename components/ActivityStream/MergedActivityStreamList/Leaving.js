import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from '../../Link'
import Timespan from '../../Timespan'

export default function Leaving(props) {
  const { locale, defaultLocale } = useRouter()

  if (!props && !props.separated) {
    return null
  }
  const { separated, separatedFrom, timespan } = props

  return (
    <>
      <Timespan display="inline-block" fontWeight="bolder" timespan={timespan} />
      <Box>
        <Link href={`id/${separated._id}`}>{separated.label[locale] ?? separated.label[defaultLocale]}</Link>{' '}
        forlater{' '}
        <Link href={`id/${separatedFrom._id}`}>
          {separatedFrom.label[locale] ?? separatedFrom.label[defaultLocale]}
        </Link>
      </Box>
    </>
  )
}
