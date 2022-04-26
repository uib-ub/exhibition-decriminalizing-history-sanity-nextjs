import { AspectRatio, Container, Flex } from '@chakra-ui/react'
import Caption from './shared/Caption'

export default function Video(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const { title, url } = props

  return (
    <Container maxW="2xl" position="relative" my="10">
      <AspectRatio ratio={16 / 9} mb="3">
        {url ? (
          <iframe src={url} allowFullScreen title={title ?? 'Video uten tittel'} />
        ) : (
          <Flex>Ingen videolenke</Flex>
        )}
      </AspectRatio>
      {title && <Caption title={title} />}
    </Container>
  )
}
