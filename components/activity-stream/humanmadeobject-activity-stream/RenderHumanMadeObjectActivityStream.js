import React from 'react'
import PropTypes from 'prop-types'
import * as ObjectComponents from '.'

function resolveEvents(event) {
  const Event = ObjectComponents[event._type]

  if (Event) {
    return Event
  }

  console.error('Cant find event', event) // eslint-disable-line no-console
  return null
}

function RenderHumanMadeObjectActivityStream(props) {
  const { stream } = props

  const filteredStream = stream.filter((x) => x._type)

  if (!filteredStream) {
    console.error('Missing section')
    return <div>Missing events</div>
  }

  return (
    <>
      {filteredStream.map((event, i) => {
        const EventComponent = resolveEvents(event)
        if (!EventComponent) {
          return (
            <div key={i} className="flex p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50" role="alert">
              <svg className="shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
              <div className="ml-3">
                <p className="font-bold">Missing event!</p>
                <p>Add new event called <code className="px-1 py-0.5 bg-red-100 rounded text-sm font-mono">{event._type}</code>.</p>
              </div>
            </div>
          )
        }
        return <EventComponent {...event} key={event._key ?? event._id} />
      })}
    </>
  )
}

RenderHumanMadeObjectActivityStream.propTypes = {
  stream: PropTypes.arrayOf(
    PropTypes.shape({
      _type: PropTypes.string,
      _key: PropTypes.string,
      section: PropTypes.instanceOf(PropTypes.object),
    }),
  ),
}

export default RenderHumanMadeObjectActivityStream
