import { Box } from '@chakra-ui/react'
import TextBlocks from '../TextBlocks'

export default function Quote(props) {
  if (!props || props.disabled === true) {
    return null
  }

  return (
    <Box as="figure" maxWidth={['sm', null, 'xl', null]} mx="auto" my="6" px={{ xs: 4, sm: 4 }}>
      <Box as="blockquote">
        <TextBlocks
          fontSize={['lg', null, '2xl', null]}
          value={props.content}
          color="red"
        />
      </Box>

      {props.credit && (
        <figcaption>
          <TextBlocks pl="20" textAlign="right" value={props.credit} />
        </figcaption>
      )}
    </Box>
  )
}
