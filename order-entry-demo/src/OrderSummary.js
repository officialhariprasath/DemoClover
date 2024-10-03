// src/OrderSummary.js
import React from 'react';

function OrderSummary({ table, order, updateItemQuantity, removeItem }) {
  return (
    <div className="order-summary">
      <h2>Order for {table.name}</h2>
      <ul>
        {order.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            <button onClick={() => updateItemQuantity(index, item.quantity + 1)}>+</button>
            <button onClick={() => updateItemQuantity(index, item.quantity - 1)}>-</button>
            <button onClick={() => removeItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${order.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
    </div>
  );
}

export default OrderSummary;
