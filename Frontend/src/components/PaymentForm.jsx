// src/components/PaymentForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [amount, setAmount] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/payment', { amount });
      alert('Payment Successful');
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed');
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <label>Amount:</label>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Pay</button>
    </form>
  );
};

export default PaymentForm;
