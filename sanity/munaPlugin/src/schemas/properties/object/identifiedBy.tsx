import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';


/**
 * Identified by
 * P1_is_identified_by
 */

export const identifiedBy = {
  name: 'identifiedBy',
  title: 'Identifisert av',
  description: (
    <span>
      Gjeldende, alternative, eksterne eller ugyldige identifikatorer.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#identified-by'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    { type: 'Name' },
    { type: 'Identifier' }
  ],
  options: {
    modal: 'popup',
  },
};
