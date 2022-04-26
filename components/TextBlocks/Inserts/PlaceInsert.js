import { Box } from '@chakra-ui/react'
import Link from '../../Link'
// import TextBlocks from '../PortableTextBlock'

export default function PlaceInsert(props) {
  if (!props || props.disabled === true) {
    return null
  }

  return (
    <Box>
      <h2>Demo: referanse til dokument i en Portable Text blokk</h2>
      <p>
        <Link href={`/id/${props.node._id}`}>{props.node.label.no}</Link>
      </p>
    </Box>
  )
}
