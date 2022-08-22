import React from 'react';
import Yith from "@yith/yith";

const YithViewer = ({ id, type = 'presentation', preview = '', size = 300 }) => {
  if (!id) return null

  return (
    <Yith type={type} preview={preview} size={size}>
      {id.map(item => (
        <Yith.Manifest key={item._key} id={item.manifest} />
      ))}
    </Yith>
  )
}

export default YithViewer