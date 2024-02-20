import React, { useState } from 'react';

const ArrowComponent = ({ startPosition, endPosition, onDrop }) => {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: startPosition.x, y: startPosition.y });

  const handleMouseDown = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleMouseMove = (event) => {
    if (dragging) {
      // Calculate the new position based on mouse movement
      const newX = position.x + event.movementX;
      const newY = position.y + event.movementY;

      // Update the position
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    if (dragging) {
      setDragging(false);

      // If onDrop function is provided and within drop zone boundaries, trigger onDrop
      if (onDrop && isWithinDropZone(position)) {
        onDrop(position);
      }
    }
  };

  const isWithinDropZone = (arrowPosition) => {
    const dropZoneRect = document.getElementById('drop-zone').getBoundingClientRect();
    return (
      arrowPosition.x >= dropZoneRect.left &&
      arrowPosition.x <= dropZoneRect.right &&
      arrowPosition.y >= dropZoneRect.top &&
      arrowPosition.y <= dropZoneRect.bottom
    );
  };

  return (
    <svg
      width={Math.abs(endPosition.x - startPosition.x)}
      height={Math.abs(endPosition.y - startPosition.y)}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: dragging ? 'grabbing' : 'grab',
      }}
    >
      {/* Arrow line */}
      <line
        x1={0}
        y1={0}
        x2={endPosition.x - startPosition.x}
        y2={endPosition.y - startPosition.y}
        stroke="black"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />

      {/* Arrowhead marker */}
      <marker
        id="arrowhead"
        markerWidth="10"
        markerHeight="7"
        refX="9"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0 0, 10 3.5, 0 7" fill="black" />
      </marker>
    </svg>
  );
};

export default ArrowComponent;
