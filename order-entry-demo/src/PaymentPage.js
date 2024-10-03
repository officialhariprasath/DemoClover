import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const location = useLocation();
  const { order, total } = location.state || { order: [], total: 0 };

  const [paymentReceived, setPaymentReceived] = useState(false); // New state for payment confirmation
  const parsedTotal = parseFloat(total); // Ensure total is treated as a number
  const HST_RATE = 0.13; // 13% HST
  const hstAmount = parsedTotal * HST_RATE;
  const totalWithTax = parsedTotal + hstAmount;

  // Handle payment logic and display confirmation
  const handleCharge = () => {
    setPaymentReceived(true); // Mark payment as received
  };

  return (
    <div className="receipt-container">
      {!paymentReceived ? (
        <>
          <div className="receipt-header">
            <img src="your-logo.png" alt="Your Logo" className="receipt-logo" />
            <p>YourCompany</p>
            <p>Tel: +1 (650) 555-0111</p>
            <p>info@yourcompany.com</p>
            <p>www.example.com</p>
            <p>Served by: Admin</p>
          </div>

          <div className="receipt-body">
            {order.map((item, index) => (
              <div key={index} className="receipt-item">
                <p>{item.name}</p>
                <p>{(item.quantity || 1)} x ${item.price.toFixed(2)}</p> {/* Default quantity to 1 if undefined */}
                <p style={{ textAlign: 'right' }}>${(item.price * (item.quantity || 1)).toFixed(2)}</p> {/* Ensure proper alignment */}
              </div>
            ))}

            <hr />
            <div className="receipt-total">
              <p><strong>Subtotal</strong></p>
              <p><strong>${parsedTotal.toFixed(2)}</strong></p>
            </div>
            <div className="receipt-total">
              <p><strong>HST (13%)</strong></p>
              <p><strong>${hstAmount.toFixed(2)}</strong></p>
            </div>
            <div className="receipt-total">
              <p><strong>Total</strong></p>
              <p><strong>${totalWithTax.toFixed(2)}</strong></p>
            </div>
          </div>

          <div className="receipt-payment">
            <p>Cash</p>
            <p>${totalWithTax.toFixed(2)}</p>
          </div>

          <div className="receipt-footer">
            <p>Order Number: 00002-008-0001</p>
            <p>Date: 07/13/2022 11:46:21</p>
          </div>

          <button className="charge-btn" onClick={handleCharge}>Charge</button>
        </>
      ) : (
        <div className="payment-confirmation">
          {/* Payment received message and animation */}
          <div className="tick-mark-animation">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
              <path className="checkmark-check" fill="none" d="M16 26l7 7 13-13" />
            </svg>
          </div>
          <h2>Payment Received</h2>
          <p>The amount of <strong>${totalWithTax.toFixed(2)}</strong> has been successfully received.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
