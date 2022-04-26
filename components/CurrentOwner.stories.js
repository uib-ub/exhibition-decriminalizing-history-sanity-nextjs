import React from 'react'
import CurrentOwner from './CurrentOwner'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'CurrentOwner',
  component: CurrentOwner,
}

const Template = (args) => <CurrentOwner owners={args.owners}></CurrentOwner>

export const Default = Template.bind({})
Default.args = {
  owners: [
    {
      _id: '782c5364-7324-4f16-b5af-2c60b73fc707',
      image: {
        _type: 'DigitalImageObject',
        asset: {
          _ref: 'image-1e93743b1be4e9f0f4805b54f05dc11bf97c25f9-500x500-svg',
          _type: 'reference',
        },
      },
      label: 'Universitetsbiblioteket i Bergen',
    },
  ],
}
