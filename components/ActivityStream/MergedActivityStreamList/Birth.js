import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from '../../Link'
import Timespan from '../../Timespan'

export default function Birth(props) {
  const { locale, defaultLocale } = useRouter()
  if (!props && !props.broughtIntoLife) {
    return null
  }

  const { broughtIntoLife, timespan, tookPlaceAt } = props

  return (
    <>
      <Timespan display="inline-block" fontWeight="bolder" timespan={timespan} />
      <Box>
        <Link href={`id/${broughtIntoLife._id}`}>
          {broughtIntoLife.label[locale] ?? broughtIntoLife.label[defaultLocale]}
        </Link>{' '}
        blir født{tookPlaceAt ? ` i ${tookPlaceAt[0].label[locale] ?? tookPlaceAt[0].label[defaultLocale]}` : ''}.
      </Box>
    </>
  )
}
