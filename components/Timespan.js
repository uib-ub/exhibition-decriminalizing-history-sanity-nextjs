import { Box, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
// import TextBlocks from './TextBlocks'
import Date from './Date'

export default function Timespan(props) {
  const { locale, defaultLocale } = useRouter()

  if (!props && props.timespan) {
    return null
  }

  const { timespan, ...rest } = props

  return (
    <Box {...rest}>
      {timespan.length > 0 && timespan.map((time) => (
        <Flex key={time._key}>
          {time.date && <Date>{time.date}</Date>}

          {!time.date && (time.beginOfTheBegin || time.endOfTheBegin) && (
            <Flex direction="column">
              {time.beginOfTheBegin && <Date>{time.beginOfTheBegin}</Date>}

              {time.beginOfTheBegin && time.endOfTheBegin && (
                <Box textAlign="center" color="gray.500" lineHeight="0.3">
                  &nbsp;/&nbsp;
                </Box>
              )}

              {time.endOfTheBegin && <Date>{time.endOfTheBegin}</Date>}
            </Flex>
          )}

          {(time.beginOfTheBegin || time.endOfTheBegin) &&
            (time.beginOfTheEnd || time.endOfTheEnd) && (
              <Box alignSelf="center" fontSize="2xl" px="1" color="gray.500" lineHeight="0.3">
                &nbsp;–&nbsp;
              </Box>
            )}

          {!time.date && (time.beginOfTheEnd || time.endOfTheEnd) && (
            <Flex direction="column">
              {time.beginOfTheEnd && <Date>{time.beginOfTheEnd}</Date>}

              {time.beginOfTheEnd && time.endOfTheEnd && (
                <Box textAlign="center" color="gray.500" lineHeight="0.3">
                  &nbsp;/&nbsp;
                </Box>
              )}

              {time.endOfTheEnd && <Date>{time.endOfTheEnd}</Date>}
            </Flex>
          )}
          {/* TODO: add popover with information about the timespan?
          {time.description && <TextBlocks value={time.description[locale]} />} */}
        </Flex>
      ))}
      {timespan && (
        <Flex key={timespan._key}>
          {timespan.date && <Date>{timespan.date}</Date>}

          {!timespan.date && (timespan.beginOfTheBegin || timespan.endOfTheBegin) && (
            <Flex direction="column">
              {timespan.beginOfTheBegin && <Date>{timespan.beginOfTheBegin}</Date>}

              {timespan.beginOfTheBegin && timespan.endOfTheBegin && (
                <Box textAlign="center" color="gray.500" lineHeight="0.3">
                  &nbsp;/&nbsp;
                </Box>
              )}

              {timespan.endOfTheBegin && <Date>{timespan.endOfTheBegin}</Date>}
            </Flex>
          )}

          {(timespan.beginOfTheBegin || timespan.endOfTheBegin) &&
            (timespan.beginOfTheEnd || timespan.endOfTheEnd) && (
              <Box alignSelf="center" fontSize="2xl" px="1" color="gray.500" lineHeight="0.3">
                &nbsp;–&nbsp;
              </Box>
            )}

          {!timespan.date && (timespan.beginOfTheEnd || timespan.endOfTheEnd) && (
            <Flex direction="column">
              {timespan.beginOfTheEnd && <Date>{timespan.beginOfTheEnd}</Date>}

              {timespan.beginOfTheEnd && timespan.endOfTheEnd && (
                <Box textAlign="center" color="gray.500" lineHeight="0.3">
                  &nbsp;/&nbsp;
                </Box>
              )}

              {timespan.endOfTheEnd && <Date>{timespan.endOfTheEnd}</Date>}
            </Flex>
          )}
          {/* TODO: add popover with information about the timespan?
          {time.description && <TextBlocks value={time.description[locale]} />} */}
        </Flex>
      )}
    </Box>
  )
}
