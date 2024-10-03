import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions
import { db } from './firebase'; // Your Firebase instance

function FoodMenu() {
  const [menuItems, setMenuItems] = useState([]);

  // Fetch items from Firestore
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'menuItems'));
        const fetchedItems = [];
        querySnapshot.forEach((doc) => {
          fetchedItems.push({ id: doc.id, ...doc.data() });
        });
        setMenuItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching menu items: ', error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="food-menu">
      <h3>Food Menu</h3>
      <div className="menu-items">
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div key={item.id} className="menu-item">
              <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} />
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <p>${item.price}</p>
            </div>
          ))
        ) : (
          <p>No items available</p>
        )}
      </div>
    </div>
  );
}

export default FoodMenu;
