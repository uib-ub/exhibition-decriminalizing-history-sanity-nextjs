import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';



export const usedSpecificObject = {
  name: 'usedSpecificObject',
  title: 'Brukte spesifikt objekt',
  description: (
    <span>
      Objekt som ble brukt i aktiviteten. Legg til{' '}
      <a target="blank" href={'/desk/objekt'}>
        nytt objekt
      </a>
      .{' '}
      <a
        target="blank"
        href={'https://muna.xyz/docs/model/properties#used-spesific-object'}
      >
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'HumanMadeObject' }] }],
};
