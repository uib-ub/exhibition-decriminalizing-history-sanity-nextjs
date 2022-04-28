import Link from '../../Link'
import { urlFor } from '../../../lib/sanity'
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  Wrap,
  Tag,
  TagLeftIcon,
  TagLabel,
} from '@chakra-ui/react'
import { SunIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import Timespan from '../../Timespan'
import TextBlocks from '../../TextBlocks'
import Map from '../../Map'
import HasType from '../../HasType'
import { capitalize } from '../../../lib/functions'
import { useRouter } from 'next/router'

export default function Activity({ data }) {
  const { locale, defaultLocale } = useRouter()

  if (!data) {
    return null
  }

  if (data._type === 'BeginningOfExistence') {
    data._type = 'Skapt'
  }
  if (data._type === 'Production') {
    data._type = 'Produksjon'
  }

  return (
    <Box>
      <Heading
        as="h4"
        fontSize="sm"
        fontWeight="normal"
        pb="1"
        mb="2"
        borderBottom="solid 1px"
        borderColor="gray.200"
      >
        {data.label ? data.label : capitalize(data._type)}
      </Heading>

      {data.hasType?.length > 0 && <HasType types={data.hasType ?? data._type} />}

      {data.timespan && <Timespan timespan={data.timespan} />}

      {data.tookPlaceAt?.length > 0 && (
        <HStack mt={2} mb={2}>
          {data.tookPlaceAt.map((place) => (
            <Tag key={place._id} size="lg" variant="subtle" colorScheme="cyan">
              <TagLeftIcon boxSize="12px" as={SunIcon} />
              <TagLabel>
                <Link href={`/id/${place._id}`}>
                  <a>{place.label[locale] ?? place.label[defaultLocale]}</a>
                </Link>
              </TagLabel>
            </Tag>
          ))}
        </HStack>
      )}

      {data.description && <TextBlocks blocks={data.description} />}

      <HStack>
        {data.contributionAssignedBy?.length > 0 && (
          <Wrap>
            {data.contributionAssignedBy.map((assignment) => (
              <Tag key={assignment.assignedActor._id} size="sm" colorScheme="">
                <Avatar
                  size="xs"
                  ml={-1}
                  mr={2}
                  name={assignment.assignedActor.label[locale] ?? assignment.assignedActor.label[defaultLocale]}
                  src={urlFor
                    .image(assignment.assignedActor.image)
                    .height(300)
                    .width(300)
                    .url()}
                />
                <TagLabel>
                  <Link href={`/id/${assignment.assignedActor._id}`}>
                    {assignment.assignedActor.label[locale] ?? assignment.assignedActor.label[defaultLocale]}
                  </Link>
                </TagLabel>
              </Tag>
            ))}
          </Wrap>
        )}

        {data.target && (
          <>
            <ArrowForwardIcon />
            <Popover>
              <PopoverTrigger>
                <Avatar
                  name={data.target.label[locale] ?? data.target.label[defaultLocale]}
                  src={urlFor(data.target.image).height('300').width('300').url()}
                />
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>Mål for handling</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Link key={data.target._id} href={`/id/${data.target._id}`}>
                      <a>{data.target.label[locale] ?? data.target.label[defaultLocale]}</a>
                    </Link>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </>
        )}
      </HStack>

      {data.movedTo && (
        <p>
          <span role="img">➡️</span>
          <Link href={`/id/${data.movedTo._id}`}>{data.movedTo.label[locale] ?? data.movedTo.label[defaultLocale]}</Link>
        </p>
      )}

      {data.observedDimension?.length > 0 &&
        data.observedDimension.map((dimension) => (
          <span key={dimension._key}>
            <strong>{dimension.hasType}:</strong>
            {dimension.value} {dimension.hasUnit.label[locale] ?? dimension.hasUnit.label[defaultLocale]}
          </span>
        ))}

      <Box>
        {/* TODO: FIX */}
        {data.tookPlaceAt?.length > 0 &&
          data.tookPlaceAt.map((place) => (
            <>
              {place.definedByGeoJSON && (
                <div key={place._id}>
                  <Map data={place.definedByGeoJSON} />
                </div>
              )}
            </>
          ))}

        {/* TODO: Check this */}
        {data.geoJSON && (
          <div>
            <Map data={data.geoJSON} />
          </div>
        )}
      </Box>
    </Box>
  )
}
