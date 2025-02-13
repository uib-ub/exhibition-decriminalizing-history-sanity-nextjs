import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';



export const usedSpecificTechnique = {
  name: 'usedSpecificTechnique',
  title: 'Brukte spesifikk teknikk',
  description: (
    <span>
      Spesifikk teknikk brukt i aktiviteten. Legg til{' '}
      <a target="blank" href={'/desk/samlingsadministrasjon;designOrProcedure'}>
        ny tekniskbeskrivelse
      </a>
      .{' '}
      <a
        target="blank"
        href={'https://muna.xyz/docs/model/properties#used-spesific-technique'}
      >
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'DesignOrProcedure' }] }],
};
