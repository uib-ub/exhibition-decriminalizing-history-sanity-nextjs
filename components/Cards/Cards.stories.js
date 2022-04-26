import React from 'react'
import Cards from '.'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Cards',
  component: Cards,
}

const Template = (args) => <Cards items={args.data}></Cards>

export const Default = Template.bind({})
Default.args = {
  data: [
    {
      _id: 'ubb-bs-ok-03608b',
      _type: 'HumanMadeObject',
      aspectRatio: 1.3350717079530638,
      creation: [
        {
          creators: [
            {
              _id: 'f04b8315-ec97-4f2f-a3cc-d532f175ef87',
              name: 'Herman Dahl',
            },
          ],
          timespan: [
            {
              _key: 'x1Sn3yOfBbJXdkQVkYC4D',
              _type: 'Timespan',
              beginOfTheBegin: '1893-06-30T23:17:00.000Z',
              endOfTheEnd: '1896-09-07T23:00:00.000Z',
            },
          ],
        },
      ],
      description: null,
      hasCurrentOwner: {
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
      hasType: [
        {
          _id: 'c8791a86-bdaa-407f-bcda-3e84c05d0750',
          label: {
            _type: 'LocaleString',
            eng: 'Photography',
            nor: 'Fotografi',
          },
        },
      ],
      homepage: null,
      image: {
        _type: 'DigitalImageObject',
        asset: {
          _ref: 'image-cab0dc5324625c9382c927bad39455684d7cf833-1024x767-jpg',
          _type: 'reference',
        },
      },
      label: '"Fram" i vågen 1896',
      preferredIdentifier: 'ubb-bs-ok-03608b',
    },
  ],
}
