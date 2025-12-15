import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';



export const hasFormerOrCurrentOwner = {
  name: 'hasFormerOrCurrentOwner',
  title: 'Tidligere eller nåværende eier',
  description: (
    <span>
      Tidligere eller nåværende eier av dette objektet. Brukes også for usikkert eierskap.{' '}
      <a
        target="blank"
        href={'https://muna.xyz/docs/model/properties#former-or-current-owner'}
      >
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Actor' },
      ],
    },
  ],
};
