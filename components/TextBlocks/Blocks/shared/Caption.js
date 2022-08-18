import { Flex, Heading, Spacer, Icon, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { BsInfoCircle } from 'react-icons/bs'
import TextBlocks from '../../'
import Source from './Source'

export default function Caption(props) {
  if (!props) {
    return null
  }

  const { label, content, source, sourceItem, ...rest } = props

  return (
    <Flex direction="column" overflowY={{ xl: 'scroll' }} {...rest}>
      {label && (
        <Heading
          fontWeight="semibold"
          fontSize={{ base: 'sm', sm: 'sm', md: 'md', xl: 'md' }}
          mb={1}
        >
          {label}
        </Heading>
      )}

      {content && (
        <TextBlocks
          value={content}
        />
      )}

      <Spacer />

      {source && (
        <Flex
          fontSize={{ base: 'xs', sm: 'xs', md: 'sm', xl: 'sm' }}
          pb={{ base: '2', md: '0' }}
          mb="0"
        >
          <Icon as={BsInfoCircle} mr="2" mt="1" />
          <TextBlocks
            value={source}
          />
        </Flex>
      )}
      {sourceItem && !source && <Source {...sourceItem} />}
    </Flex>
  )
}
