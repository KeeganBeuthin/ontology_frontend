import React from 'react';

const TextBoxComponent = ({ position, text, onMouseDown }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: '100px',
        height: '40px',
        backgroundColor: 'lightyellow',
        border: '1px solid black',
        cursor: 'move',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      draggable
      onMouseDown={onMouseDown}
    >
      {text}
    </div>
  );
};

export default TextBoxComponent;
