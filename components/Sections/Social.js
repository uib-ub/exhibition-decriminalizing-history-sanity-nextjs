import { Box, Center, Container, Heading, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { TwitterTweetEmbed } from 'react-twitter-embed'

export default function Social(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const getId = (thePath) => thePath.substring(thePath.lastIndexOf('/') + 1)

  return (
    <Container maxW="4xl" marginTop="10" centerContent p="0">
      <Heading size="xl">{props.title}</Heading>
      <Center>
        <Box w={['sm', 'md', 'xl']}>
          <TwitterTweetEmbed
            tweetId={getId(props.url)}
            options={{ width: '100%' }}
            placeholder={
              <Box
                w="xl"
                padding="4"
                mt="5"
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                bg="white"
              >
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={2} spacing="4" />
              </Box>
            }
          />
        </Box>
      </Center>
    </Container>
  )
}
