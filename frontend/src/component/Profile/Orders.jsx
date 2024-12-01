import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersOrders } from '../State/Order/Action';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) dispatch(getUsersOrders(jwt));
  }, [dispatch, jwt]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography><div>{error?.message || "Unknown error occurred"}</div></Typography>;

  return (
    <TableContainer component={Paper} style={{ marginTop: '3rem' }}>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order No</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Items</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{order.orderStatus}</TableCell>
              <TableCell>${(order.totalPrice / 100).toFixed(2)}</TableCell>
              <TableCell>
                <ul>
                  {order.items.map((item) => (
                    <li key={item.foodName}>
                      {item.foodName} (x{item.quantity}) - RS.{((item.totalPrice / 100).toFixed(2))}
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Orders;
