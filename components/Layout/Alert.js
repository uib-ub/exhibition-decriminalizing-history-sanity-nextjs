import { Flex, Text } from '@chakra-ui/react'

export default function Alert() {
  return (
    <Flex bgColor="red.600" color="white" maxW="full" alignContent={'center'} justifyContent={'center'}>
      <a href={`/api/exit-preview`}>
        This page is a preview. Click here to exit preview mode.
      </a>
    </Flex>
  )
}
