// src/Items.js
import React, { useState } from 'react';
import { db } from './firebase';

function Items() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAddItem = async () => {
    try {
      await db.collection('menuItems').add({
        name: name,
        price: parseFloat(price),
      });
      alert('Item added successfully!');
      setName('');
      setPrice('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      <h1>Add New Item</h1>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Item Name" 
      />
      <input 
        type="text" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
        placeholder="Price" 
      />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
}

export default Items;
