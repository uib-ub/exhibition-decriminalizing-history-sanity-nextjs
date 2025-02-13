import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';



export const subject = {
  name: 'subject',
  title: 'Emne',
  description: (
    <span>
      Emneord knyttet til dette objektet. Legg til{' '}
      <a target="blank" href={'/desk/steder'}>
        nye emneord
      </a>
      .{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#subject'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'Concept' }],
    },
  ],
};
