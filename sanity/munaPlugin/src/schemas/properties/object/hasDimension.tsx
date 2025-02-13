import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';



export const hasDimension = {
  name: 'hasDimension',
  title: 'Har dimension',
  titleEN: 'Has dimension',
  description: (
    <span>
      <strong>Eksperimentel:</strong> Objektets dimension.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#dimension'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  descriptionEN: (
    <span>
      <strong>Experimental:</strong> Dimension of the object.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#dimension'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [{ type: 'Dimension' }],
};
