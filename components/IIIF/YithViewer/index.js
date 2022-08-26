import React from 'react';
import Yith from "@yith/yith";

const YithViewer = ({ items, type = 'presentation', preview = '', size = 300 }) => {
  if (!items) return null

  return (
    <Yith type={type} preview={preview} size={size}>
      {items.map(item => (
        <Yith.Manifest key={item._key} id={item.manifest} />
      ))}
    </Yith>
  )
}

export default YithViewer