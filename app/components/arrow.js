// components/Arrow.js

import React, { useEffect, useRef } from 'react';
import { dia } from 'jointjs';

const ArrowComponent = ({ width, height, fillColor }) => {
  const paperRef = useRef(null);

  useEffect(() => {
    const paper = new dia.Paper({
      el: paperRef.current,
      width: width || 100,
      height: height || 100,
      gridSize: 1,
    });

    const arrow = new dia.Link({
      source: { x: 50, y: 50 },
      target: { x: 200, y: 50 },
      attrs: {
        '.connection': {
          stroke: 'black',
          'stroke-width': 2,
        },
        '.marker-target': {
          d: 'M 10 0 L 0 5 L 10 10 z',
          fill: fillColor || 'black',
          stroke: 'black',
        },
      },
    });

    paper.model.addCells([arrow]);
  }, []);

  return <div ref={paperRef} />;
};

export default ArrowComponent;
