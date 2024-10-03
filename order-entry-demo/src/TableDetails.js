import React, { useState } from 'react';

const TableDetails = ({ table, updateSelectedTable }) => {
  const [name, setName] = useState(table.name);
  const [maxMembers, setMaxMembers] = useState(table.maxMembers);

  const handleSave = () => {
    updateSelectedTable({ ...table, name, maxMembers });
  };

  return (
    <div className="table-details">
      <h3>Table Details</h3>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Max Members:</label>
        <input
          type="number"
          value={maxMembers}
          onChange={(e) => setMaxMembers(Number(e.target.value))}
        />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default TableDetails;
