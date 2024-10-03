import React, { useEffect, useState } from 'react';
import './MenuItems.css';
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions
import { db } from './firebase'; // Firebase instance
import { useLocation } from 'react-router-dom'; // To capture the selected table

const MenuItems = () => {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState([]);
  const location = useLocation(); // Capture the table passed from OrderEntry
  const { table } = location.state || {}; // Default to an empty object if no table is passed

  // Fetch food items from Firestore
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'menuItems'));
        const fetchedItems = [];
        querySnapshot.forEach((doc) => {
          fetchedItems.push({ id: doc.id, ...doc.data() });
        });
        setItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching items: ', error);
      }
    };

    fetchItems();
  }, []);

  // Add item to order
  const addItemToOrder = (item) => {
    setOrder([...order, item]);
  };

  // Calculate total order amount
  const calculateTotal = () => {
    return order.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
  };

  return (
    <div className="menu-items-container">
      <div className="order-section">
        <h3>Order for {table ? table.name : 'Unknown Table'}</h3> {/* Display selected table */}
        <p>Total: ${calculateTotal()}</p>
        <div className="order-list">
          {order.map((item, index) => (
            <div key={index} className="order-item">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="food-items-section">
        <h3>Food Menu</h3>
        <div className="food-items-grid">
          {items.map((item) => (
            <div key={item.id} className="food-item" onClick={() => addItemToOrder(item)}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="actions-section">
        <button className="action-btn">Refund</button>
        <button className="action-btn">Customer Note</button>
        <button className="action-btn">Bill</button>
        <button className="action-btn">Payment</button>
      </div>
    </div>
  );
};

export default MenuItems;
