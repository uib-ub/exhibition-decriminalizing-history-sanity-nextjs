import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';


export const depictsFunctional = {
  name: 'depicts',
  title: 'Avbilder',
  description: (
    <span>
      Avbildet på dette objektet.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#depicts'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  descriptionEN: (
    <span>
      Depictions on this object.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#depicts'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'reference',
  to: [
    { type: 'HumanMadeObject' },
    { type: 'Actor' },
    { type: 'Concept' }
  ],
};
