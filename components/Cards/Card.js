import NextLink from 'next/link'
import {
  Heading,
  HStack,
  Image,
  Flex,
  Text,
  GridItem,
  Box,
  Tag,
  /* Code,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Link, */
  LinkBox,
  LinkOverlay,
  Spacer,
  //useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react'
import { urlFor } from '../../lib/sanity'
/* import { BiDotsVerticalRounded } from 'react-icons/bi'
import { FiExternalLink } from 'react-icons/fi'
import { VscJson } from 'react-icons/vsc' */
import TextBlocks from '../TextBlocks'
import Palette from '../Palette'
import CardImage from './CardImage'
import Timespan from '../Timespan'
import { useRouter } from 'next/router'


export default function Card(props) {
  const { locale, defaultLocale } = useRouter()
  const bg = useColorModeValue('white', 'transparent')
  const color = useColorModeValue('gray.600', 'gray.200')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const tagColor = useColorModeValue('blackAlpha', 'red')

  if (!props) {
    return null
  }

  //const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    _id,
    _type,
    label,
    excerpt,
    image,
    hasType,
    aspectRatio,
    palette,
    creation,
  } = props.item

  const getBase = (type) => {
    if (type == 'LinguisticDocument') {
      return '/'
    }
    return '/id/'
  }

  const calculateSpans = (ratio) => {
    /* Dafault */
    const spans = {
      rowSpan: [1, 2, 1, 1, 1],
      colSpan: [1, 1, 1, 1, 1],
      /* aspectRatio: "1 / 1" */
    }

    /* Landscape */
    if (ratio >= 1.3) {
      spans.colSpan = [1, 2, 2, 2, 2]
      spans.rowSpan = [1, 1, 1, 1, 1]
      /* spans.aspectRatio = "1 / 2" */
    }
    /* Extreme Landscape */
    if (ratio >= 1.9) {
      spans.colSpan = [1, 2, 2, 2, 3]
      spans.rowSpan = [1, 1, 1, 1, 1]
      /* spans.aspectRatio = "1 / 2" */
    }
    /* Portrait */
    if (ratio <= 0.6) {
      spans.colSpan = [1, 1, 1, 1, 1]
      spans.rowSpan = [1, 1, 1, 2, 2]
      /* spans.aspectRatio = "2 / 1" */
    }
    return spans
  }

  const spanObj = calculateSpans(aspectRatio)

  /* palette={ "darkMuted", "darkVibrant", "dominant", "lightMuted", "lightVibrant", "muted", "vibrant" } */

  return (
    <GridItem
      as="article"
      bgColor={palette?.lightVibrant?.background}
      color={palette?.lightVibrant?.foreground}
      p={[2, 2, 4, 4]}
      {...spanObj}
    >
      <LinkBox>
        {image && (
          <Box>
            <CardImage id={_id} label={label[locale] ?? label[defaultLocale]} url={image} />
          </Box>
        )}

        <Box
          pt="2"
          pb="2"
        >
          <Heading
            mt="1"
            as="h3"
            fontSize={['sm', 'md', 'lg', 'xl', '2xl']}
            lineHeight="tight"
          >
            <NextLink href={`${getBase(_type)}${encodeURIComponent(_id)}`} passHref>
              <LinkOverlay>{label[locale] || label[defaultLocale] || 'Missing default language label'}</LinkOverlay>
            </NextLink>
          </Heading>

          {excerpt && (
            <Text
              noOfLines={2}
              fontSize={['md', 'md', 'lg', 'lg']}
            >
              {excerpt}
            </Text>
          )}

          {creation && creation[0].creators && (
            <Text fontSize={['xs', 'sm', 'sm', 'sm']} mb="1">
              {creation[0].creators
                .map((creator, index) => (
                  <span key={creator._id}>
                    {index === 0 ? '' : ', '}
                    {creator.name[locale] ?? creator.name[defaultLocale]}
                  </span>
                ))}
            </Text>
          )}

          {creation && creation[0].timespan && (
            <Box fontSize={['sm', 'sm', 'md', 'md']} >
              <Box>{creation[0].timespan[0]?.edtf}</Box>
            </Box>
          )}
        </Box>

        {hasType && (
          <HStack spacing={4} mb="2" mr="2">
            {hasType.map((type) => (
              <Tag
                key={type._id}

                fontSize={['xs', 'xs', 'xs', 'xs']}
                colorScheme={tagColor}
              >
                {type.label[locale] ?? type.label[defaultLocale]}
              </Tag>
            ))}
          </HStack>
        )}
      </LinkBox>
    </GridItem >
  )
}
