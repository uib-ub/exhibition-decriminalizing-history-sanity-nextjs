import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';



export const represents = {
  name: 'represents',
  title: 'Representerer',
  description: (
    <span>
      Hva dette motivet representerer.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#represents'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'HumanMadeObject' },
        { type: 'Actor' },
        { type: 'Concept' }
      ],
    },
  ],
};
