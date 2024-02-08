import React from 'react';
import { shapes } from 'jointjs';

const TextBoxComponent = ({ position, text }) => {
  const textBox = new shapes.standard.TextBlock({
    position: { x: 0, y: 0 },
    size: { width: 100, height: 40 },
    attrs: {
      label: {
        text: text,
        fill: 'black',
        'font-size': 12,
      },
      body: {
        fill: 'lightyellow',
      },
    },
  });

  return (
    <div style={{ position: 'absolute', left: position.x, top: position.y }}>
      <div ref={(node) => { node && node.appendChild(textBox.render().el); }} />
    </div>
  );
};

export default TextBoxComponent;