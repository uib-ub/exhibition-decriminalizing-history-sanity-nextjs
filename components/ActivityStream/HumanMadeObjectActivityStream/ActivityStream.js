import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
} from '@chakra-ui/react'
import RenderHumanMadeObjectActivityStream from './RenderHumanMadeObjectActivityStream'

export default function ActivityStream({ stream }) {
  if (!stream) {
    return null
  }

  return (
    <Box fontFamily="Montserrat">
      {/* <Heading as="dt" fontFamily="Montserrat" fontWeight="semibold" fontSize="sm" pb="2">Hendelser</Heading>
      <Wrap as="dd" fontFamily="Montserrat" marginBottom={5}>
        {stream.map((activity) => (
          <Activity key={activity._key} data={activity} />
        ))}
      </Wrap> */}

      <Accordion defaultIndex={[0]} allowToggle>
        <AccordionItem border="none">
          <h2>
            <AccordionButton px="0" borderBottom="1px solid" borderColor="gray.300">
              <Box
                flex="1"
                textAlign="left"
                fontSize="sm"
                fontFamily="Montserrat"
                fontWeight="semibold"
              >
                Hendelser
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel px="0">
            <Flex>
              <RenderHumanMadeObjectActivityStream stream={stream} />
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}
