import { AspectRatio, Container } from '@chakra-ui/react'
import Caption from './shared/Caption'

export default function Iframe(props) {
  if (!props || props.disabled === true) {
    return null
  }

  return (
    <Container maxW={['s,', 'lg', 'xl', '2xl']} my="10">
      <Container maxW="full" backgroundColor="white" px="0" mb="4" position="relative">
        <AspectRatio ratio={4 / 3}>
          <iframe
            title={props.title ?? 'Iframe uten tittel'}
            src={props.url}
            allowFullScreen
            aria-hidden="false"
            tabIndex="0"
          />
        </AspectRatio>
      </Container>
      <Caption title={props.title} />
    </Container>
  )
}
