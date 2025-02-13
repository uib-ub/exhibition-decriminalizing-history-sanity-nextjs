
import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

export const image = {
  name: 'image',
  title: 'Thumbnail',
  titleEN: 'Thumbnail',
  description: (
    <span>
      Last opp eller velg et bilde. Dette er bildet som brukes som forhåndsvisning.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#image'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'DigitalObjectImage',
  options: {
    hotspot: true,
  },
};
