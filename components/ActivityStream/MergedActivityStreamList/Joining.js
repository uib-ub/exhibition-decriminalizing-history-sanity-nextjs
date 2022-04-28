import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from '../../Link'
import Timespan from '../../Timespan'

export default function Joining(props) {
  const { locale, defaultLocale } = useRouter()
  if (!props && !props.joined) {
    return null
  }
  const { joined, joinedWith, timespan } = props

  return (
    <>
      <Timespan display="inline-block" fontWeight="bolder" timespan={timespan} />
      <Box>
        <Link href={`id/${joined._id}`}>{joined.label[locale] ?? joined.label[defaultLocale]}</Link> blir medlem
        av <Link href={`id/${joinedWith._id}`}>{joinedWith.label[locale] ?? joinedWith.label[defaultLocale]}</Link>
      </Box>
    </>
  )
}
