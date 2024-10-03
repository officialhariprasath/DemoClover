import React, { useState } from 'react';

function FloorPlan() {
  const [floorPlanName, setFloorPlanName] = useState('');
  const [location, setLocation] = useState('');
  const [tables, setTables] = useState([]); // For storing table layout

  // Function to handle adding a new table
  const addTable = () => {
    const newTable = {
      id: tables.length + 1,
      width: 8, // Default width
      height: 8, // Default height
    };
    setTables([...tables, newTable]);
  };

  // Function to handle form submission (floor plan details)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save floor plan details (could be to a backend or local state)
    console.log({ floorPlanName, location });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Floor Plan</h1>

      {/* Form to input floor plan details */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Floor Plan Name: </label>
          <input
            type="text"
            value={floorPlanName}
            onChange={(e) => setFloorPlanName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location: </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save Floor Plan</button>
      </form>

      <hr />

      {/* Table layout section */}
      <h2>Table Layout</h2>
      <button onClick={addTable}>Add Table</button>

      <div
        style={{
          border: '1px solid black',
          width: '600px',
          height: '400px',
          position: 'relative',
          marginTop: '20px',
        }}
      >
        {/* Render the tables */}
        {tables.map((table) => (
          <div
            key={table.id}
            style={{
              width: `${table.width * 10}px`,
              height: `${table.height * 10}px`,
              backgroundColor: 'lightblue',
              border: '1px solid black',
              position: 'absolute',
              top: `${table.id * 50}px`, // Just for demo purposes, later can be draggable
              left: `${table.id * 50}px`,
            }}
          >
            {`Table ${table.id}`}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FloorPlan;
