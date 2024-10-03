import React, { useEffect, useState } from 'react';
import './MenuItems.css';
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions
import { db } from './firebase'; // Firebase instance
import { useLocation, useNavigate } from 'react-router-dom'; // To capture the selected table and navigate

const MenuItems = () => {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState([]);
  const location = useLocation(); // Capture the table passed from OrderEntry
  const { table } = location.state || {}; // Default to an empty object if no table is passed
  const navigate = useNavigate(); // For navigation to the PaymentPage

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

  // Handle payment navigation
  const handlePayment = () => {
    const total = calculateTotal();
    navigate('/payment', { state: { order, total } });
  };

  return (
    <div className="menu-items-container">
      {/* Left section for order summary */}
      <div className="order-section">
        <div className="order-summary-box">
          <h3>Order for {table ? table.name : 'Unknown Table'}</h3>
          <p className="order-total"><strong>Total: ${calculateTotal()}</strong></p>
        </div>
        {/* Separate box for order list */}
        <div className="order-list-box">
          <div className="order-list">  
            {order.length > 0 ? (
              order.map((item, index) => (
                <div key={index} className="order-item">
                  <p>{item.name}</p>
                  <p><strong>${item.price}</strong></p>
                </div>
              ))
            ) : (
              <p className="empty-order">No items added</p>
            )}
          </div>
        </div>
      </div>

      {/* Right section for food menu */}
      <div className="food-items-section">
        <h3>Food Menu</h3>
        <div className="food-items-grid">
          {items.map((item) => (
            <div key={item.id} className="food-item" onClick={() => addItemToOrder(item)}>
              <img src={item.image} alt={item.name} className="food-image" />
              <p>{item.name}</p>
              <p><strong>${item.price}</strong></p>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="actions-section">
        <button className="action-btn">Refund</button>
        <button className="action-btn">Customer Note</button>
        <button className="action-btn">Bill</button>
        <button className="action-btn" onClick={handlePayment}>Payment</button> {/* Added onClick to handle Payment */}
      </div>
    </div>
  );
};

export default MenuItems;
