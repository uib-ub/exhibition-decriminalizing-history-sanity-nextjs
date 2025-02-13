import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';



export const subjectOfManifest = {
  name: 'subjectOfManifest',
  title: 'Hovedmanifest',
  type: 'url',
  description: (
    <span>
      Hovedmanifestet til objektet.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#main-representation'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
};
