import React, { useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography
} from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsersOrders } from '../State/Order/Action';

const TableContainerStyled = styled(TableContainer)(({ theme }) => ({
  backgroundColor: '#2a2a2a',
}));

const TableCellStyled = styled(TableCell)(({ theme }) => ({
  color: '#fff',
  '&.MuiTableCell-head': {
    fontWeight: 'bold',
    borderBottom: '2px solid #444',
    backgroundColor: '#3c3c3c',
  },
  '&.MuiTableCell-body': {
    borderBottom: '1px solid #444',
  },
}));

const StatusBadge = styled('span')(({ theme, status }) => ({
  display: 'inline-block',
  padding: '4px 12px',
  borderRadius: '12px',
  fontSize: '0.875rem',
  color: '#fff',
  backgroundColor: 
    status === 'COMPLETE' ? '#4caf50' : 
    status === 'PENDING' ? '#f44336' : 
    '#757575',
}));

const FoodItemBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const FoodImage = styled('img')(({ theme }) => ({
  width: 50,
  height: 50,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
}));

const Orders = () => {
  const { auth, order } = useSelector(store => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUsersOrders(jwt));
    }
  }, [dispatch, jwt]);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom style={{ color: '#fff' }}>
        Orders
      </Typography>
      <TableContainerStyled component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCellStyled>Order No</TableCellStyled>
              <TableCellStyled>Date</TableCellStyled>
              <TableCellStyled>Restaurant</TableCellStyled>
              <TableCellStyled>Total Price</TableCellStyled>
              <TableCellStyled>Order Status</TableCellStyled>
              <TableCellStyled>Items</TableCellStyled>
              <TableCellStyled>Delivery Address</TableCellStyled>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.orders.map((order) => (
              <TableRow key={order.id}>
                <TableCellStyled>{order.orderNo}</TableCellStyled>
                <TableCellStyled>{new Date(order.createdAt).toLocaleDateString()}</TableCellStyled>
                <TableCellStyled>{order.restaurant.name}</TableCellStyled>
                <TableCellStyled>${(order.totalPrice / 100).toFixed(2)}</TableCellStyled>
                <TableCellStyled>
                  <StatusBadge status={order.orderStatus}>
                    {order.orderStatus}
                  </StatusBadge>
                </TableCellStyled>
                <TableCellStyled>
                  <FoodItemBox>
                    {order.items.map((item, index) => (
                      <Box key={index} display="flex" alignItems="center" gap={1}>
                        <FoodImage src={item.food.image} alt={item.food.name} />
                        <Typography style={{ color: '#fff' }}>{item.food.name} x {item.quantity}</Typography>
                      </Box>
                    ))}
                  </FoodItemBox>
                </TableCellStyled>
                <TableCellStyled>
                  {order.deliveryAddress ? (
                    <>
                      <Typography>{order.deliveryAddress.street}</Typography>
                      <Typography>{order.deliveryAddress.city}, {order.deliveryAddress.zipCode}</Typography>
                    </>
                  ) : (
                    <Typography>No Address</Typography>
                  )}
                </TableCellStyled>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainerStyled>
    </Box>
  );
};

export default Orders;
