// src/TableManagement.js
import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore'; // Import addDoc

function TableManagement() {
  const [layout, setLayout] = useState({
    tables: [],
  });
  const [tableName, setTableName] = useState('');
  const [maxMembers, setMaxMembers] = useState(4);
  const [shape, setShape] = useState('rectangle');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const addTable = (type) => {
    const newTable = {
      id: layout.tables.length + 1,
      name: `Table ${layout.tables.length + 1}`,
      maxMembers: type === 'rectangle' ? 4 : 6,
      type: type,
      left: 50 + layout.tables.length * 150, // Adjust position for visual effect
      top: 50,
    };

    setLayout({
      ...layout,
      tables: [...layout.tables, newTable],
    });
  };

  const saveLayout = async () => {
    try {
      // Use the collection method and addDoc to save data
      const layoutsCollection = collection(db, 'layouts');
      await addDoc(layoutsCollection, {
        name: tableName || 'Ground Floor',
        tables: layout.tables,
      });
      setConfirmationMessage('Layout saved successfully!');
    } catch (error) {
      console.error('Error saving layout: ', error);
      setConfirmationMessage('Failed to save layout.');
    }
  };
  

  return (
    <div>
      <h1>Table Management</h1>
      <div>
        <label>Table Name: </label>
        <input
          type="text"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          placeholder="Enter table name"
        />
        <label>Max Members: </label>
        <input
          type="number"
          value={maxMembers}
          onChange={(e) => setMaxMembers(e.target.value)}
        />
      </div>
      <div>
        <h2>Shape</h2>
        <button onClick={() => addTable('rectangle')}>Add Rectangle</button>
        <button onClick={() => addTable('circle')}>Add Circle</button>
      </div>
      <div>
        <h2>{tableName || 'Ground Floor'}</h2>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '400px',
            backgroundColor: '#f0f0f0',
            border: '1px solid black',
          }}
        >
          {layout.tables.map((table) => (
            <div
              key={table.id}
              style={{
                position: 'absolute',
                left: `${table.left}px`,
                top: `${table.top}px`,
                width: table.type === 'rectangle' ? '100px' : '80px',
                height: table.type === 'rectangle' ? '60px' : '80px',
                backgroundColor: table.type === 'rectangle' ? 'lightgrey' : 'lightblue',
                borderRadius: table.type === 'circle' ? '50%' : '0',
                textAlign: 'center',
                lineHeight: '1.2',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid black',
              }}
            >
              <div>{table.name}</div>
              <div>{`0/${table.maxMembers}`}</div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={saveLayout}>Click to Complete</button>
      {confirmationMessage && <p>{confirmationMessage}</p>}
    </div>
  );
}

export default TableManagement;
