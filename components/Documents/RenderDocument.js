import React from 'react'
import PropTypes from 'prop-types'
import * as DocumentComponents from '.'
import { Alert, AlertIcon, AlertDescription, AlertTitle, Code } from '@chakra-ui/react'

function resolveDocument(document) {
  const Document = DocumentComponents[document._type]

  if (Document) {
    return Document
  }

  console.error('Cant find document', document) // eslint-disable-line no-console
  return null
}

function RenderDocument(props) {
  const { document } = props

  if (!document) {
    console.error('Missing document type')
    return <div>Missing document from parent</div>
  }
  const DocumentComponent = resolveDocument(document)

  if (!DocumentComponent) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Missing Document!</AlertTitle>
        <AlertDescription>
          Add new document called <Code>{document._type}</Code>.
        </AlertDescription>
      </Alert>
    )
  } else {
    return <DocumentComponent {...document} key={document._id} />
  }
}

RenderDocument.propTypes = {
  documents: PropTypes.arrayOf(
    PropTypes.shape({
      _type: PropTypes.string,
      _key: PropTypes.string,
      document: PropTypes.instanceOf(PropTypes.object),
    }),
  ),
}

export default RenderDocument
