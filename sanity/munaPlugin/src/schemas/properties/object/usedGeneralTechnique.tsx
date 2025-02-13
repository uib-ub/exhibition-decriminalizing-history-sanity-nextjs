import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';


export const usedGeneralTechnique = {
  name: 'usedGeneralTechnique',
  title: 'Brukte generell teknikk',
  description: (
    <span>
      Teknikker eller metoder brukt i aktiviteten. Legg til{' '}
      <a target="blank" href={'/desk/typer;technique'}>
        ny teknikk
      </a>
      .{' '}
      <a
        target="blank"
        href={'https://muna.xyz/docs/model/properties#used-general-technique'}
      >
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'Technique' }],
    },
  ],
};
