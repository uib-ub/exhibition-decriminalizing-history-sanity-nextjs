import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

export const carries = {
  name: 'carries',
  title: 'Bærer verk',
  description: (
    <span>
      Verk som er representert i dette objektet.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#carries'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  descriptionEN: (
    <span>
      Work represented on this object.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#carries'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'Work' }] }],
};
