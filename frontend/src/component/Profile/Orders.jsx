import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography
} from '@mui/material';
import { styled } from '@mui/system';

const TableContainerStyled = styled(TableContainer)(({ theme }) => ({
  backgroundColor: '#2a2a2a', // Background color updated to match the image
}));

const TableCellStyled = styled(TableCell)(({ theme }) => ({
  color: '#fff',
  '&.MuiTableCell-head': {
    fontWeight: 'bold',
    borderBottom: '2px solid #444',
    backgroundColor: '#3c3c3c', // Header background color updated to match the image
  },
  '&.MuiTableCell-body': {
    borderBottom: '1px solid #444',
  },
}));

const StatusBadge = styled('span')(({ theme, status }) => ({
  display: 'inline-block',
  padding: '4px 12px', // Increased padding for larger button size
  borderRadius: '12px',
  fontSize: '0.875rem', // Increased font size
  color: '#fff',
  backgroundColor: 
    status === 'Complete' ? '#4caf50' : 
    status === 'Pending' ? '#f44336' : 
    '#757575',
}));

const FoodItemBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column', // Stack items vertically
  gap: theme.spacing(1), // Add space between items
}));

const FoodImage = styled('img')(({ theme }) => ({
  width: 50, // Smaller image size for inline display
  height: 50, 
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
}));

const Orders = () => {
  const orders = [
    {
      id: 1,
      orderNo: 'A123',
      date: '2024-07-01',
      restaurant: 'Pizza Palace',
      foodItems: [
        { name: 'Large Pepperoni Pizza', image: 'https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?t=st=1721377514~exp=1721381114~hmac=4373f6376d25aba01f8b2d0432add0c5c7ee1b49fe245bbc844ac02d577e576b&w=740' },
      ],
      totalPrice: 15.99,
      orderStatus: 'Pending',
    },
    {
      id: 2,
      orderNo: 'B456',
      date: '2024-07-02',
      restaurant: 'Burger Barn',
      foodItems: [
        { name: 'Cheeseburger with fries', image: 'https://img.freepik.com/free-photo/side-view-pilaf-with-stewed-beef-meat-plate_141793-5057.jpg?uid=R128413485&ga=GA1.1.1433948464.1709698974&semt=sph' },
        { name: 'Spaghetti Carbonara', image: 'https://img.freepik.com/premium-photo/large-bowl-food-with-fish-vegetables_197463-2405.jpg' },
      ],
      totalPrice: 10.49,
      orderStatus: 'Complete',
    },
    {
      id: 3,
      orderNo: 'C789',
      date: '2024-07-03',
      restaurant: 'Pasta Place',
      foodItems: [
        { name: 'Spaghetti Carbonara', image: 'https://img.freepik.com/premium-photo/large-bowl-food-with-fish-vegetables_197463-2405.jpg' },
      ],
      totalPrice: 12.99,
      orderStatus: 'Pending',
    },
    // Add more orders data here
  ];

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
              <TableCellStyled>Food Items</TableCellStyled>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCellStyled>{order.orderNo}</TableCellStyled>
                <TableCellStyled>{order.date}</TableCellStyled>
                <TableCellStyled>{order.restaurant}</TableCellStyled>
                <TableCellStyled>{`$${order.totalPrice.toFixed(2)}`}</TableCellStyled>
                <TableCellStyled>
                  <StatusBadge status={order.orderStatus}>
                    {order.orderStatus}
                  </StatusBadge>
                </TableCellStyled>
                <TableCellStyled>
                  <FoodItemBox>
                    {order.foodItems.map((foodItem, index) => (
                      <Box key={index} display="flex" alignItems="center" gap={1}>
                        <FoodImage src={foodItem.image} alt={foodItem.name} />
                        <Typography style={{ color: '#fff' }}>{foodItem.name}</Typography>
                      </Box>
                    ))}
                  </FoodItemBox>
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
