import { Chip, IconButton } from '@mui/material';
import React from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeCartItem, updateCartItem, updCartItemQuantity } from '../State/Cart/Action';

export default function CartItem({ item }) { // First and only default export
  const { auth, cart } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem({ cartItemId: item.id, jwt: auth.jwt || jwt }));
  };

  const handleUpdateCartItem = (value) => {
    if (value === -1 && item.quantity === 1) {
      handleRemoveCartItem(); // Remove item if quantity is 1 and user tries to decrement
    } else {
      const updatedQuantity = item.quantity + value;
      const data = {
        cartItemId: item.id,
        quantity: updatedQuantity, // Properly set the new quantity
      };
      dispatch(updateCartItem({ data, jwt }));
    }
  };

  return (
    <div>
      <h3>{item.name}</h3>
      <div>
        <p>Quantity: {item.quantity}</p>
        <button onClick={() => handleUpdateCartItem(1)}>Increase</button>
        <button onClick={() => handleUpdateCartItem(-1)}>Decrease</button>
      </div>
    </div>
  );
}
