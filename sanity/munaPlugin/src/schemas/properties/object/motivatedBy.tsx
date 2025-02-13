import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';


export const motivatedBy = {
  name: 'motivatedBy',
  title: 'Motivert av',
  titleEN: 'Motivated by',
  description: (
    <span>
      Dette objektet var tilstede ved en hendelse eller aktivitet.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#motivated-by'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  descriptionEN: (
    <span>
      This object was present at an event or activity.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#motivated-by'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Event' },
        { type: 'Activity' }
      ],
    },
  ],
};
