import { Box, Heading } from '@chakra-ui/react'
import InstagramEmbed from 'react-instagram-embed'

export default function InstagramPost(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const { url } = props
  if (!url) {
    return <p>Missing URL for Instagram post</p>
  }
  const token = process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN

  return (
    <Box w={['sm', 'md', 'xl']}>
      <Heading size="xl">{props.title}</Heading>
      <InstagramEmbed
        clientAccessToken={token}
        url={url}
        maxWidth={580}
        hideCaption={true}
        containerTagName="div"
        injectScript
      />
    </Box>
  )
}
