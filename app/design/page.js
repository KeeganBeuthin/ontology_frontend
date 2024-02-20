"use client"
import React, { useEffect, useState } from 'react';
import ArrowComponent from '../components/arrow'; // Corrected import path
import SidebarArrow from '../components/sidebarArrow'; // Import SidebarArrow component
import TextBoxComponent from '../components/textbox';

const IndexPage = () => {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    // This code will run only on the client-side
    if (typeof document !== 'undefined') {
     
      const handleDrop = (event) => {
        event.preventDefault();
        const elementType = event.dataTransfer.getData('element_type');
      
        if (elementType) {
          const dropZoneRect = document.getElementById('drop-zone').getBoundingClientRect();
          const newPosition = {
            x: event.clientX - dropZoneRect.left + window.pageXOffset,
            y: event.clientY - dropZoneRect.top + window.pageYOffset,
          };
      
          // Create a new entity based on the type
          let newEntity;
          if (elementType === 'Arrow') {
            newEntity = {
              id: `entity-${entities.length + 1}`,
              type: 'Arrow',
              position: newPosition,
            };
          } else if (elementType === 'TextBox') {
            newEntity = {
              id: `entity-${entities.length + 1}`,
              type: 'TextBox',
              position: newPosition,
            };
          }
      
          // Add the new entity to the list of entities
          setEntities([...entities, newEntity]);
        }
      };
      

      const handleDragOver = (event) => {
        event.preventDefault();
      };

      document.getElementById('drop-zone').addEventListener('drop', handleDrop);
      document.getElementById('drop-zone').addEventListener('dragover', handleDragOver);

      // Cleanup event listeners when component unmounts
      return () => {
        document.getElementById('drop-zone').removeEventListener('drop', handleDrop);
        document.getElementById('drop-zone').removeEventListener('dragover', handleDragOver);
      };
    }
  }, [entities]);

  const handleDragStart = (event, elementType) => {
    event.dataTransfer.setData('element_type', elementType);
  };

  const handleMouseDown = (event, entityId) => {
    const initialMouseX = event.clientX;
    const initialMouseY = event.clientY;

    const entityIndex = entities.findIndex((entity) => entity.id === entityId);
    const initialEntityX = entities[entityIndex].position.x;
    const initialEntityY = entities[entityIndex].position.y;

    const dropZoneRect = document.getElementById('drop-zone').getBoundingClientRect();
    const entityRect = event.target.getBoundingClientRect();

    // Calculate the left boundary dynamically based on the width of the entity
    const minEntityX = dropZoneRect.left - initialMouseX + initialEntityX;
    const maxEntityX = dropZoneRect.right - entityRect.width / 2;
    const minEntityY = dropZoneRect.top - entityRect.height / 2;
    const maxEntityY = dropZoneRect.bottom - entityRect.height / 2;

    const handleMouseMove = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      let newX = initialEntityX + mouseX - initialMouseX;
      let newY = initialEntityY + mouseY - initialMouseY;

      // Ensure entity stays within boundaries
      newX = Math.max(minEntityX, Math.min(newX, maxEntityX));
      newY = Math.max(minEntityY, Math.min(newY, maxEntityY));

      const updatedEntities = [...entities];
      updatedEntities[entityIndex].position.x = newX;
      updatedEntities[entityIndex].position.y = newY;
      setEntities(updatedEntities);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleRemoveEntity = (entityId) => {
    const updatedEntities = entities.filter((entity) => entity.id !== entityId);
    setEntities(updatedEntities);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar with example elements */}
      <div style={{ width: '20%', backgroundColor: '#f0f0f0', padding: '20px', borderRight: '1px solid #ccc' }}>
        {/* SidebarArrow component */}
        <SidebarArrow
          onDragStart={(event) => handleDragStart(event, 'Arrow')}
        />
        
        {/* Text box component */}
        <div
          draggable
          onDragStart={(event) => handleDragStart(event, 'TextBox')}
          style={{ cursor: 'pointer', marginBottom: '10px' }}
        >
          Text Box
        </div>
      </div>

      {/* Drop zone */}
      <div
        id="drop-zone"
        style={{
          width: '80%',
          height: '600px',
          border: '1px dashed #ccc',
          position: 'relative',
        }}
      >
        {/* Render existing entities */}
{entities.map((entity) => {
  if (entity.type === 'Arrow') {
    return (
      <ArrowComponent
        key={entity.id}
        startPosition={entity.position}
        endPosition={{ x: entity.position.x + 100, y: entity.position.y + 100 }}
      />
    );
  } else if (entity.type === 'TextBox') {
    return (
      <TextBoxComponent
        key={entity.id}
        position={entity.position}
        text="Text"
        onMouseDown={(event) => handleMouseDown(event, entity.id)}
      />
    );
  } else {
    return null;
  }
})}

      </div>
    </div>
  );
};

export default IndexPage;
