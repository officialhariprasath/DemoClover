import React from 'react';

function Buttons() {
  const handleRefund = () => {
    alert('Refund Process Started');
  };

  const handleCustomerNote = () => {
    alert('Add a customer note');
  };

  const handleBill = () => {
    alert('Generate Bill');
  };

  const handlePayment = () => {
    alert('Open Payment Interface');
  };

  return (
    <div className="action-buttons">
      <button onClick={handleRefund}>Refund</button>
      <button onClick={handleCustomerNote}>Customer Note</button>
      <button onClick={handleBill}>Bill</button>
      <button onClick={handlePayment}>Payment</button>
    </div>
  );
}

export default Buttons;
