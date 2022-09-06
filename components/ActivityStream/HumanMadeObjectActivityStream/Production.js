import { Box, Heading, Wrap, Tag, TagLabel, Avatar, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import getLocalizedTypeLabel from '../../../lib/functions/getLocalizedTypeLabel'
import { urlFor } from '../../../lib/sanity'
import Link from '../../Link'
import Timespan from '../../Timespan'

export default function Production(props) {
  const { locale, defaultLocale } = useRouter()

  if (!props) {
    return null
  }

  const { _type, label, timespan, contributionAssignedBy, usedGeneralTechnique } = props

  return (
    <Box>
      <Heading
        as={'h3'}
        size={'md'}
      >
        {label?.[locale ?? defaultLocale] ?? getLocalizedTypeLabel(_type)[locale ?? defaultLocale]}
      </Heading>

      {timespan && <Timespan fontWeight="bolder" timespan={timespan} />}

      <Wrap mt={3}>
        {contributionAssignedBy?.length > 0 && (
          <>
            {contributionAssignedBy.map((assignment) => (
              <Tag key={assignment.assignedActor._id} size={'lg'} borderRadius='full'>
                <Avatar
                  size="xs"
                  ml={-1}
                  mr={2}
                  name={assignment.assignedActor.label[locale] ?? assignment.assignedActor.label[defaultLocale]}
                  src={assignment?.assignedActor?.image ? urlFor(assignment?.assignedActor?.image)
                    .height(300)
                    .width(300)
                    .url() : ''}
                />
                <TagLabel>
                  <Link href={`/id/${assignment.assignedActor._id}`}>
                    {assignment.assignedActor.label[locale] ?? assignment.assignedActor.label[defaultLocale]}
                  </Link>
                </TagLabel>
              </Tag>
            ))}
          </>
        )}

        {usedGeneralTechnique?.length > 0 && (
          <>
            {usedGeneralTechnique.map((i) => (
              <Tag key={i._id} size={'lg'} borderRadius='full'>
                <TagLabel>
                  {/* <Link href={`/id/${i._id}`}> */}
                  {i.label[locale] ?? i.label[defaultLocale]}
                  {/* </Link> */}
                </TagLabel>
              </Tag>
            ))}
          </>
        )}
      </Wrap>
    </Box>
  )
}
