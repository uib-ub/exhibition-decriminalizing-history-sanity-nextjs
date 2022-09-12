import { Box, Text } from '@chakra-ui/react'

export default function Timespan(props) {
  if (!props && props.timespan) {
    return null
  }

  const { timespan, ...rest } = props

  return (
    <Box {...rest}>
      {timespan.length > 0 && timespan.map((time) => (
        <Text key={time._key}>{time.edtf}</Text>
      ))}
      {timespan && (
        <Text key={timespan._key}>{timespan.edtf}</Text>
      )}
    </Box>
  )
}
