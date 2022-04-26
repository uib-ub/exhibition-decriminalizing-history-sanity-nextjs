import Link from '../Link'
import { Text, Icon, Flex } from '@chakra-ui/react'
import { BsInfoCircle } from 'react-icons/bs'

export default function Source(props) {
  if (!props) {
    return null
  }

  const { _id, label, owner } = props

  return (
    <Flex
      color="gray.500"
      fontSize={{ base: 'xs', sm: 'xs', md: 'sm', xl: 'sm' }}
      pb={{ base: '2', md: '0' }}
      mb="0"
    >
      <Icon as={BsInfoCircle} mr="2" mt="1" />
      <Text fontSize={{ base: 'xs', sm: 'xs', md: 'sm', xl: 'sm' }}>
        <i>
          <Link href={`/id/${_id}`} isExternal>
            {label?.no ?? 'Mangler norsk tittel'}
          </Link>
        </i>

        {owner?.length && `. ${owner[0].label?.no ?? 'Mangler norsk tittel'}.`}
      </Text>
    </Flex>
  )
}
