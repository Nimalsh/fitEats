import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startPayment } from '../State/Payment/Action'; // Make sure the path to the actions file is correct.

const Paymentssandbox = () => {
  const dispatch = useDispatch();
 // const { paymentStatus, error } = useSelector(state => state.payment); // Assuming your reducer's state is named 'payment'
  
  // Payment data (this could come from a form, a modal, or props)
  const [paymentData, setPaymentData] = useState({
    items: 'Door Bell Wireless',
    amount: 1000.00,
    firstName: 'Saman',
    lastName: 'Perera',
    email: 'samanp@gmail.com',
    phone: '0771234567',
    address: 'No.1, Galle Road',
    city: 'Colombo',
    country: 'Sri Lanka'
  });

  // Function to handle payment initiation
  const handlePayment = () => {
    const jwt = localStorage.getItem('jwt'); // Getting the JWT from localStorage
    dispatch(startPayment(jwt, paymentData)); // Dispatch the action with JWT and payment data
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay Now</button>

    
    </div>
  );
};

export default Paymentssandbox;
