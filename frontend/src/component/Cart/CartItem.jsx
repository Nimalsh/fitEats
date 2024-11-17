 // CartItem.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateCartItem } from '../State/Cart/Action'; // Correct the import

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  // Handler function to update the cart item
  const handleUpdateQuantity = (quantity) => {
    const reqData = {
      data: { ...cartItem, quantity },
      jwt: localStorage.getItem("jwt"),
    };
    dispatch(updateCartItem(reqData)); // Correct function call
  };

  return (
    <div>
      <h3>{cartItem.name}</h3>
      <div>
        <p>Quantity: {cartItem.quantity}</p>
        <button onClick={() => handleUpdateQuantity(cartItem.quantity + 1)}>Increase</button>
        <button onClick={() => handleUpdateQuantity(cartItem.quantity - 1)}>Decrease</button>
      </div>
    </div>
  );
};

export default CartItem;
