import React, { Component } from 'react'

// a plugin to remove default navigation controls
class RemoveViewerInfoPlugin extends Component {
  render() {
    return <div>ViewerInfo</div>
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: RemoveViewerInfoPlugin,
  target: 'ViewerInfo',
  mode: 'wrap',
}
