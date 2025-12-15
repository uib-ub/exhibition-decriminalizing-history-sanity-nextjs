import React from 'react';


export const tookPlaceAt = {
  name: 'tookPlaceAt',
  title: 'Skjedde ved',
  description: (
    <span>
      Hvor skjedde dette? Legg til{' '}
      <a target="blank" href={'/desk/steder'}>
        nytt sted
      </a>
    </span>
  ),

  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'Place' }] }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
};
