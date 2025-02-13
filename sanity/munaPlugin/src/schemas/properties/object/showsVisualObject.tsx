import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';



export const showsVisualObject = {
  name: 'showsVisualObject',
  title: 'Viser merke eller bilde',
  description: (
    <span>
      Motiv vist på dette objectet.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#shown-visual-item'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [{ type: 'VisualObject' }],
};
