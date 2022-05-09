import { Box } from '@components/Box'
import { Flex } from '@components/Flex'
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
      {timespan.map((time) => (
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
          {time.description && <TextBlocks blocks={time.description[locale]} />} */}
        </Flex>
      ))}
    </Box>
  )
}
