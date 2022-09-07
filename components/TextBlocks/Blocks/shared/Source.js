import Link from '../../../Link'
import { Text, Icon, Flex, keyframes, Box } from '@chakra-ui/react'
import { BsInfoCircle } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import TextBlocks from '../..'

export default function Source(props) {
  const { locale, defaultLocale } = useRouter()
  const { _id, label, hasCurrentOwner, preferredIdentifier, source } = props

  if (!_id || !label) return null

  return (
    <Box
      fontSize={{ base: 'md', sm: 'md', md: 'lg', xl: 'lg' }}
      pb={{ base: '2', md: '0' }}
      mx='auto'
      mt={2}
      mb={0}
      maxW={'full'}
    >
      <Text>
        <Icon
          as={BsInfoCircle}
          mr="2"
          mt="0"
          display={'inline'}
          aria-hidden
        />
        <i>
          <Link href={`/id/${_id}`} color='unset' isExternal>
            {label[locale] || label[defaultLocale] || 'Missing default language label'}
          </Link>
        </i>

        {hasCurrentOwner?.length && `. ${hasCurrentOwner[0].label[locale] ?? hasCurrentOwner[0].label[defaultLocale]}.`}
      </Text>

      <TextBlocks
        value={source}
      />

    </Box>
  )
}
