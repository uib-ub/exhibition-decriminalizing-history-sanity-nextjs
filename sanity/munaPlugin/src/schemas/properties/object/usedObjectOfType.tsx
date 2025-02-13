import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';


export const usedObjectOfType = {
  name: 'usedObjectOfType',
  title: 'Brukte objekt av type',
  description: (
    <span>
      Objekttype som ble brukt i aktiviteten. Legg til{' '}
      <a target="blank" href={'/desk/typer;objectType'}>
        ny objekttype
      </a>
      .{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#used-object-of-type'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'ObjectType' }],
    },
  ],
};
