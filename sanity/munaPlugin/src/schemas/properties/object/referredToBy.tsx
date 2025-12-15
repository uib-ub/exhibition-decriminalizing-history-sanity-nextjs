import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';


export const referredToBy = {
  name: 'referredToBy',
  title: 'Beskrivelse',
  description: (
    <span>
      Objektet kan ha mange beskrivelser, korte og/eller lange. Tekstene kan types for ulike
      bruksformål.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#description'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    { type: 'LinguisticObject' },
  ],
  options: {
    modal: 'fullscreen',
  },
};
