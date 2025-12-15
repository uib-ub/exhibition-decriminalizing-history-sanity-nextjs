import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

export const composedOf = {
  name: 'composedOf',
  title: 'Består av',
  titleEN: 'Composed of',
  description: (
    <span>
      Andre identifiserte objekt som er en del av dette objektet.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#composed-of'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  descriptionEN: (
    <span>
      Other identified madeObjects this object is composed of.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#composed-of'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'HumanMadeObject' }
      ]
    }
  ],
  options: {
    semanticSanity: {
      '@container': '@list',
      '@type': '@id'
    }
  },
};
