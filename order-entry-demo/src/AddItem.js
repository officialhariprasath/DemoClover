import React, { useState } from 'react';
import './AddItem.css';
import { db } from './firebase'; // Import Firestore instance
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions

function AddItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState(['Fast Food', 'Drinks', 'Desserts']); // Initial categories
  const [newCategory, setNewCategory] = useState(''); // For new category input
  const [isAddingCategory, setIsAddingCategory] = useState(false); // Toggle new category input

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Handle form submission (saving item details to Firestore)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newItem = {
        name,
        description,
        category,
        price: parseFloat(price), // Ensure price is a number
        image: image ? URL.createObjectURL(image) : null, // For now, just preview the image
      };

      // Save the new item to Firestore (replace localStorage with Firestore)
      await addDoc(collection(db, 'menuItems'), newItem);

      // Clear form
      setName('');
      setDescription('');
      setCategory('');
      setPrice('');
      setImage(null);
      setIsAddingCategory(false);

      alert('Item added successfully!');
    } catch (error) {
      console.error('Error adding item: ', error);
      alert('Failed to add item!');
    }
  };

  // Add new category
  const handleAddCategory = () => {
    if (newCategory) {
      setCategories([...categories, newCategory]);
      setCategory(newCategory);
      setNewCategory('');
      setIsAddingCategory(false);
    }
  };

  return (
    <div className="add-item-container">
      <h1>Add New Item</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        {image && <img src={URL.createObjectURL(image)} alt="Item" className="item-preview" />}
        
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          {!isAddingCategory ? (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="add-new-category">+ Add New Category</option>
            </select>
          ) : (
            <div className="add-new-category">
              <input
                type="text"
                placeholder="New Category Name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button type="button" onClick={handleAddCategory}>Add Category</button>
              <button type="button" onClick={() => setIsAddingCategory(false)}>Cancel</button>
            </div>
          )}
        </div>

        {category === 'add-new-category' && (
          <div className="form-group">
            <button type="button" onClick={() => setIsAddingCategory(true)}>
              Add New Category
            </button>
          </div>
        )}

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Add Item</button>
      </form>
    </div>
  );
}

export default AddItem;
