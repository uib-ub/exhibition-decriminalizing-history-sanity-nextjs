import React, { Component } from 'react'

// a plugin to remove default navigation controls
class RemoveNavPlugin extends Component {
  render() {
    return <div></div>
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: RemoveNavPlugin,
  target: 'ViewerNavigation',
  mode: 'wrap',
}
