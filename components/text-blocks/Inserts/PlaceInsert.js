import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from '../../Link'
// import TextBlocks from '../PortableTextBlock'

export default function PlaceInsert(props) {
  const { locale, defaultLocale } = useRouter()
  if (!props || props.disabled === true) {
    return null
  }

  return (
    <Box>
      <h2>Demo: referanse til dokument i en Portable Text blokk</h2>
      <p>
        <Link href={`/id/${props.node._id}`}>{props.node.label[locale] ?? props.node.label[defaultLocale]}</Link>
      </p>
    </Box>
  )
}
