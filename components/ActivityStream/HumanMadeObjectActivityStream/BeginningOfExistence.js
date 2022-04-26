import { Box, Heading, Wrap, Tag, TagLabel, Avatar } from '@chakra-ui/react'
import { imageBuilder } from '../../../lib/sanity'
import Link from '../../Link'
import Timespan from '../../Timespan'

export default function BeginningOfExistence(props) {
  if (!props) {
    return null
  }

  const { label, timespan, contributionAssignedBy } = props

  return (
    <Box border="1px solid" borderColor="gray.200" backgroundColor="gray.100" p="3">
      <Heading
        as="h3"
        fontSize="md"
        pb="1"
        mb="2"
        borderBottom="1px solid"
        borderColor="gray.300"
        fontFamily="Montserrat"
        fontWeight="semibold"
      >
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
                name={assignment.assignedActor.label.no}
                src={imageBuilder
                  .image(assignment.assignedActor.image)
                  .height(300)
                  .width(300)
                  .url()}
              />
              <TagLabel>
                <Link href={`/id/${assignment.assignedActor._id}`}>
                  {assignment.assignedActor.label.no}
                </Link>
              </TagLabel>
            </Tag>
          ))}
        </Wrap>
      )}
    </Box>
  )
}
