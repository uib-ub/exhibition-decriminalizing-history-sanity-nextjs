import Link from '../../../Link'
import { Text, Icon, Flex, keyframes } from '@chakra-ui/react'
import { BsInfoCircle } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { ArrowForwardIcon } from '@chakra-ui/icons'

export default function Source(props) {
  const { locale, defaultLocale } = useRouter()
  const { _id, label, hasCurrentOwner, preferredIdentifier } = props

  if (!_id || !label) return null

  const arrowKeyframes = keyframes`
    from {transform: translate(0, 0);}
    to {transform: translate(20px, 0);}
  `
  const pointingAnimation = `${arrowKeyframes} 1s ease 0s 1 both`

  return (
    <Flex
      fontSize={{ base: 'sm', sm: 'sm', md: 'md', xl: 'md' }}
      pb={{ base: '2', md: '0' }}
      mx='auto'
      mt={2}
      mb={0}
      role="group"
    >

      <Icon as={BsInfoCircle} mr="2" mt="1" />
      <Text>
        <i>
          <Link href={`/id/${_id}`} isExternal>
            {label[locale] || label[defaultLocale] || 'Missing default language label'}
          </Link>
        </i>

        {hasCurrentOwner?.length && `. ${hasCurrentOwner[0].label[locale] ?? hasCurrentOwner[0].label[defaultLocale]}.`}
        <ArrowForwardIcon
          ml={2}
          w={5}
          h={5}
          _groupHover={{
            animation: pointingAnimation
          }}
        />
      </Text>
    </Flex>
  )
}
