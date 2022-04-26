import React from 'react'
import PropTypes from 'prop-types'
import * as ObjectComponents from '.'
import { Alert, AlertIcon, AlertDescription, AlertTitle, Code } from '@chakra-ui/react'

function resolveEvents(event) {
  const Event = ObjectComponents[event._type]

  if (Event) {
    return Event
  }

  console.error('Cant find event', event) // eslint-disable-line no-console
  return null
}

function RenderMergedActivityStreamList(props) {
  const { stream } = props

  const filteredStream = stream.filter((x) => x._type)

  if (!filteredStream) {
    console.error('Missing section')
    return <div>Missing events</div>
  }

  return (
    <>
      {filteredStream.map((event) => {
        const EventComponent = resolveEvents(event)
        if (!EventComponent) {
          return (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Missing event!</AlertTitle>
              <AlertDescription>
                Add new event called <Code>{event._type}</Code>.
              </AlertDescription>
            </Alert>
          )
        }
        return <EventComponent {...event} key={event._key ?? event._id} />
      })}
    </>
  )
}

RenderMergedActivityStreamList.propTypes = {
  stream: PropTypes.arrayOf(
    PropTypes.shape({
      _type: PropTypes.string,
      _key: PropTypes.string,
      section: PropTypes.instanceOf(PropTypes.object),
    }),
  ),
}

export default RenderMergedActivityStreamList
