import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';



export const measuredBy = {
  name: 'measurement',
  title: 'Måling',
  description: (
    <span>
      <strong>Eksperimentel:</strong> Måling av objektet.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#measurement'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  descriptionEN: (
    <span>
      <strong>Experimental:</strong> Measurment of the object.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#measurement'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [{ type: 'Measurement' }],
};
