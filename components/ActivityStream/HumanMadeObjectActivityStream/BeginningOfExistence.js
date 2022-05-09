import { Avatar, Box, Tag, TagLabel, Wrap } from '@chakra-ui/react'
import { Heading } from '@components/Heading'
import { urlFor } from '@lib/sanity'
import { useRouter } from 'next/router'
import Link from '../../Link'
import Timespan from '../../Timespan'

export default function BeginningOfExistence(props) {
  const { locale, defaultLocale } = useRouter()

  if (!props) {
    return null
  }

  const { label, timespan, contributionAssignedBy } = props

  return (
    <Box>
      <Heading>
        {label ? label : 'Skapt'}
      </Heading>

      {timespan && <Timespan display="inline-block" fontWeight="bolder" timespan={timespan} />}

      {contributionAssignedBy?.length > 0 && (
        <Wrap>
          {contributionAssignedBy.map((assignment) => (
            <Tag key={assignment.assignedActor._id} size="sm" colorScheme="">
              <Avatar
                size="xs"
                ml={-1}
                mr={2}
                name={assignment.assignedActor.label[locale] ?? assignment.assignedActor.label[defaultLocale]}
                src={assignment?.assignedActor?.image ? urlFor(assignment?.assignedActor?.image)
                  .height(300)
                  .width(300)
                  .url() : undefined}
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
    </Box>
  )
}
