import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography, Dialog, DialogTitle, DialogContent, Grid, IconButton
} from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

const TableContainerStyled = styled(TableContainer)(({ theme }) => ({
  backgroundColor: '#1e1e1e',
}));

const TableCellStyled = styled(TableCell)(({ theme }) => ({
  color: '#fff',
  '&.MuiTableCell-head': {
    fontWeight: 'bold',
    borderBottom: '2px solid #444',
  },
  '&.MuiTableCell-body': {
    borderBottom: '1px solid #444',
  },
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff0',
  color: '#000',
  '&:hover': {
    backgroundColor: '#ff0',
  },
}));

const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  backgroundColor: '#2e2e2e',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

const FoodItemBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  borderBottom: '1px solid #ddd',
  paddingBottom: theme.spacing(1),
}));

const FoodImage = styled('img')(({ theme }) => ({
  width: 100,
  height: 100,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
}));

const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#3e3e3e',
  color: '#fff',
  padding: theme.spacing(2),
}));

const Payments = () => {
  const [open, setOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleClickOpen = (payment) => {
    setSelectedPayment(payment);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPayment(null);
  };

  const payments = [
    {
      id: 1,
      orderId: 'A123',
      customer: 'John Doe',
      foodItems: [
        { name: 'Large Pepperoni Pizza', image: 'https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?t=st=1721377514~exp=1721381114~hmac=4373f6376d25aba01f8b2d0432add0c5c7ee1b49fe245bbc844ac02d577e576b&w=740' },
        { name: 'Garlic Bread', image: 'https://img.freepik.com/premium-photo/large-bowl-food-with-fish-vegetables_197463-2405.jpg' },
      ],
      date: '2024-07-01',
      amount: 15.99,
      paymentMethod: 'Credit Card',
      restaurantName: 'Pizza Hut',
    },
    {
      id: 2,
      orderId: 'B456',
      customer: 'Jane Smith',
      foodItems: [
        { name: 'Cheeseburger with fries', image: 'https://img.freepik.com/free-photo/side-view-pilaf-with-stewed-beef-meat-plate_141793-5057.jpg?uid=R128413485&ga=GA1.1.1433948464.1709698974&semt=sph' },
        { name: 'Coke', image: 'https://img.freepik.com/free-photo/fresh-cola-drink-glass_144627-16201.jpg?t=st=1721377476~exp=1721381076~hmac=994e15c856baf815bbcfc50188f08d2cd0d309ca2258968352ef85d45757c27b&w=740' }
      ],
      date: '2024-07-02',
      amount: 10.49,
      paymentMethod: 'PayPal',
      restaurantName: 'Burger King',
    },
    {
      id: 3,
      orderId: 'C789',
      customer: 'Bob Johnson',
      foodItems: [
        { name: 'Spaghetti Carbonara', image: 'https://img.freepik.com/premium-photo/large-bowl-food-with-fish-vegetables_197463-2405.jpg' },
        { name: 'Caesar Salad', image: 'https://cdn.pixabay.com/photo/2016/12/05/10/07/dish-1883501_1280.png' },
      ],
      date: '2024-07-03',
      amount: 12.99,
      paymentMethod: 'Debit Card',
      restaurantName: 'Olive Garden',
    },
    // Add more payment data here
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom style={{ color: '#fff' }}>
        Payments
      </Typography>
      <TableContainerStyled component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCellStyled>Order ID</TableCellStyled>
              <TableCellStyled>Restaurant Name</TableCellStyled>
              <TableCellStyled>Total Price</TableCellStyled>
              <TableCellStyled>Date</TableCellStyled>
              <TableCellStyled>View</TableCellStyled>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCellStyled>{payment.orderId}</TableCellStyled>
                <TableCellStyled>{payment.restaurantName}</TableCellStyled>
                <TableCellStyled>{`$${payment.amount.toFixed(2)}`}</TableCellStyled>
                <TableCellStyled>{payment.date}</TableCellStyled>
                <TableCellStyled>
                  <ButtonStyled variant="contained" onClick={() => handleClickOpen(payment)}>
                    View
                  </ButtonStyled>
                </TableCellStyled>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainerStyled>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth sx={{ '& .MuiDialog-paper': { maxWidth: '600px' } }}>
      <DialogTitleStyled>
          Order Details
          <IconButton aria-label="close" onClick={handleClose} style={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitleStyled>
        <DialogContentStyled>
          {selectedPayment && (
            <Box>
              <Typography variant="h6" style={{ color: '#fff' }}>Order ID: {selectedPayment.orderId}</Typography>
              <Typography style={{ color: '#fff' }}>Restaurant: {selectedPayment.restaurantName}</Typography>
              <Typography style={{ color: '#fff' }}>Date: {selectedPayment.date}</Typography>
              <Typography style={{ color: '#fff' }}>Total Price: ${selectedPayment.amount.toFixed(2)}</Typography>
              <Typography style={{ color: '#fff' }}>Payment Method: {selectedPayment.paymentMethod}</Typography>
              <Grid container spacing={2}>
                {selectedPayment.foodItems.map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <FoodItemBox>
                      <Typography style={{ color: '#fff' }}>{item.name}</Typography>
                      <FoodImage src={item.image} alt={item.name} />
                    </FoodItemBox>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </DialogContentStyled>
      </Dialog>
    </Box>
  );
};

export default Payments;
