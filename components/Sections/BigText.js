import { Box } from '@chakra-ui/react'
import TextBlocks from '../TextBlocks'

export default function SectionText(props) {
  if (!props || props.disabled === true) {
    return null
  }

  return (
    <Box maxW={['lg', null, null, null, '2xl']}>
      <TextBlocks
        fontSize={{ base: 'lg', sm: '2xl', md: '2xl', xl: '3xl' }}
        fontWeight="500"
        value={props.content}
      />
    </Box>
  )
}
