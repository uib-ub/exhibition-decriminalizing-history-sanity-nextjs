import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

export const consistsOf = {
  name: 'consistsOf',
  title: 'Laget av',
  description: (
    <span>
      Hvilket material objektet er laget av, for eksempel lær og/eller pergament.
      .{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#consists-of'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  descriptionEN: (
    <span>
      The material the item is produced with, eg. leather and-or parchment.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#consists-of'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'Material' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@list',
      '@type': '@id'
    }
  },
};
