import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Table = ({ table, moveTable, setSelectedTable }) => {
  const [, drag] = useDrag({
    type: 'table',
    item: { id: table.id, left: table.left, top: table.top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'table',
    hover(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const newLeft = Math.round(item.left + delta.x);
      const newTop = Math.round(item.top + delta.y);
      moveTable(item.id, newLeft, newTop);
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      onClick={() => setSelectedTable(table)}
      style={{
        position: 'absolute',
        left: `${table.left}px`,
        top: `${table.top}px`,
        width: table.type === 'rectangle' ? '80px' : '80px',
        height: table.type === 'rectangle' ? '80px' : '80px',
        backgroundColor: table.type === 'rectangle' ? 'lightgrey' : 'lightblue',
        borderRadius: table.type === 'circle' ? '50%' : '0',
        textAlign: 'center',
        lineHeight: '80px',
        cursor: 'pointer',
      }}
    >
      {table.name}
      <br />
      {`0/${table.maxMembers}`}
    </div>
  );
};

export default Table;
