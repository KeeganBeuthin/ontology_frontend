import React from 'react';

const SidebarArrow = ({ onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event)}
      style={{ cursor: 'pointer', marginBottom: '10px' }}
    >
      Arrow
    </div>
  );
};

export default SidebarArrow;
