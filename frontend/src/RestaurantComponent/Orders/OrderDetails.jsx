import StorefrontIcon from '@mui/icons-material/Storefront';
import { Box, CardHeader, Dialog, DialogActions, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BackgroundImage from '../../assets/images/item.png';

const orders = [
  {
    id: 1,
    customer: "John Doe",
    totalPrice: "LKR 2500.00",
    time: "16.23.00",
    date: "2024-07-10",
    status: "Pending",
    details: "Order details here",
    items: [
      { name: "Item 1", unitPrice: 500, quantity: 5 },
      { name: "Item 2", unitPrice: 300, quantity: 2 }
    ],
    discount: "LKR 5.00",
    total: "LKR 2000.00",
    address: "123 Main St",
    telephone: "076-1234567",
    email: "johndoe@example.com",
    purchase: "done"
  },
  {
    id: 2,
    customer: "Jane Smith",
    totalPrice: "LKR 500.00",
    time: "14.10.00",
    date: "2024-07-11",
    status: "Pending",
    details: "Order details here",
    items: [
      { name: "Item 2", unitPrice: 100, quantity: 3 }
    ],
    discount: "LKR 50.00",
    total: "LKR 450.00",
    address: "456 Elm St",
    telephone: "077-2345678",
    email: "janesmith@example.com",
    purchase: 'No'
  },
  {
    id: 3,
    customer: "Bob Johnson",
    totalPrice: "LKR 750.00",
    time: "10.30.00",
    date: "2024-07-12",
    status: "Cancelled",
    details: "Order details here",
    items: [
      { name: "Item 3", unitPrice: 200, quantity: 4 }
    ],
    discount: "LKR 75.00",
    total: "LKR 675.00",
    address: "789 Oak St",
    telephone: "078-3456789",
    email: "bobjohnson@example.com",
    purchase: 'done'
  },
  {
    id: 4,
    customer: "Alice Brown",
    totalPrice: "LKR 1000.00",
    time: "13.20.00",
    date: "2024-07-13",
    status: "Completed",
    details: "Order details here",
    items: [
      { name: "Item 4", unitPrice: 1000, quantity: 1 }
    ],
    discount: "LKR 100.00",
    total: "LKR 900.00",
    address: "101 Pine St",
    telephone: "079-4567890",
    email: "alicebrown@example.com",
    purchase: 'done'
  },
  {
    id: 5,
    customer: "Chris Davis",
    totalPrice: "LKR 15000.00",
    time: "16.45.00",
    date: "2024-07-14",
    status: "Pending",
    details: "Order details here",
    items: [
      { name: "Item 5", unitPrice: 15000, quantity: 1 }
    ],
    discount: "LKR 1500.00",
    total: "LKR 13500.00",
    address: "202 Maple St",
    telephone: "070-5678901",
    email: "chrisdavis@example.com",
    purchase: 'No'
  },
  {
    id: 6,
    customer: "Patricia Miller",
    totalPrice: "LKR 200.00",
    time: "11.55.00",
    date: "2024-07-15",
    status: "On Delivery",
    details: "Order details here",
    items: [
      { name: "Item 6", unitPrice: 200, quantity: 1 }
    ],
    discount: "LKR 20.00",
    total: "LKR 180.00",
    address: "303 Birch St",
    telephone: "071-6789012",
    email: "patriciamiller@example.com",
    purchase: 'No'
  },
  {
    id: 7,
    customer: "Patricia Miller",
    totalPrice: "LKR 5000.00",
    time: "12.40.00",
    date: "2024-07-15",
    status: "On Delivery",
    details: "Order details here",
    items: [
      { name: "Item 7", unitPrice: 2500, quantity: 2 }
    ],
    discount: "LKR 500.00",
    total: "LKR 4500.00",
    address: "303 Birch St",
    telephone: "071-6789012",
    email: "patriciamiller@example.com",
    purchase: 'done'
  },
  {
    id: 8,
    customer: "Patricia Miller",
    totalPrice: "LKR 5000.00",
    time: "12.40.00",
    date: "2024-07-15",
    status: "Completed",
    details: "Order details here",
    items: [
      { name: "Item 8", unitPrice: 5000, quantity: 1 }
    ],
    discount: "LKR 500.00",
    total: "LKR 4500.00",
    address: "303 Birch St",
    telephone: "071-6789012",
    email: "patriciamiller@example.com",
    purchase: 'done'
  }
];
 

export const OrderDetails = () => {
  const { orderId } = useParams();
  const order = orders.find(order => order.id === parseInt(orderId));
  const [open, setOpen] = useState(false);
  const [discount, setDiscount] = useState(0);

  if (!order) {
    return <Typography variant="h4">Order Not Found</Typography>;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    // Handle the cancellation logic here
    setOpen(false);
  };


  const handleDiscountChange = (event) => {
    const value = parseFloat(event.target.value);
    setDiscount(value);
  };

  const getLastTotal = () => {
    const totalPrice = order.items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    if (discount > 0) {
      const discountAmount = (discount / 100) * totalPrice;
      return (totalPrice - discountAmount).toFixed(2);
    }
    return totalPrice.toFixed(2);
  };
  
  
  return (
    <div
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <div>
        <CardHeader
          title={
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h4" component="div" sx={{ fontSize: '2rem', display: 'flex', alignItems: 'center' }}>
                <StorefrontIcon sx={{ fontSize: '2rem', mr: 1 }} />Order Details
              </Typography>
              <Box sx={{ borderBottom: '2px solid white', width: '90px', mt: 1 }} />
            </Box>
          }
          sx={{ pt: 2, alignItems: "center", mb: 4 }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div
          style={{
            backgroundColor: 'rgba(64, 64, 64, 0.8)',
            borderRadius: '10px',
            padding: '16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            margin: '20px',
            paddingLeft: '30px',
            width: '30%',
          }}
        >
          <CardHeader
            title={<span style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center' }}>Order Details</span>}
            sx={{ pt: 2, alignItems: 'center', color: 'white' }}
          />

          <Typography variant="h7" style={{ color: 'white', marginTop: '16px' }}>Order : {order.id}</Typography>
          <Typography variant="h7" style={{ color: 'white', marginTop: '16px' }}>Order Date : {order.date}</Typography>
          <Typography variant="h7" style={{ color: 'white', marginTop: '16px' }}>Order Time : {order.time}</Typography>
          <Typography variant="h7" style={{ color: 'white', marginTop: '16px' }}>Status : {order.status}</Typography>
        </div>

        <div
          style={{
            backgroundColor: 'rgba(64, 64, 64, 0.8)',
            borderRadius: '10px',
            padding: '16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            margin: '20px',
            paddingLeft: '30px',
            width: '45%',
          }}
        >
          <CardHeader
            title={<span style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center' }}>Customer Details</span>}
            sx={{ pt: 2, alignItems: 'center', color: 'white' }}
          />

          <Typography variant="h7" style={{ color: 'white', marginTop: '16px' }}>Customer Name : {order.customer}</Typography>
          <Typography variant="h7" style={{ color: 'white', marginTop: '16px' }}>Address : {order.address}</Typography>
          <Typography variant="h7" style={{ color: 'white', marginTop: '16px' }}>Telephone : {order.telephone}</Typography>
          <Typography variant="h7" style={{ color: 'white', marginTop: '16px' }}>Email : {order.email}</Typography>
        </div>
      </div>

      <div
      style={{
        // backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      }}
    >
      {/* <div>
        <CardHeader className='mt-2'
          title={
            <Box>
              <Typography variant="h4" component="div" sx={{ fontSize: '2rem', display: 'flex', alignItems: 'center' }}>
                <StorefrontIcon className='mr-2' sx={{ fontSize: '2rem' }} /> Incoming Order Details
              </Typography>
              <Box sx={{ borderBottom: '2px solid white', width: '90px' }} />
            </Box>
          }
          sx={{ pt: 2, alignItems: "center" }}
        />
      </div> */}

      <TableContainer component={Paper} sx={{ marginTop: '20px', width: '80%', backgroundColor: 'rgba(64, 64, 64, 0.8)' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'white' }}>Item Name</TableCell>
              <TableCell style={{ color: 'white' }} align="right">Unit Price (LKR)</TableCell>
              <TableCell style={{ color: 'white' }} align="right">Number of Items</TableCell>
              <TableCell style={{ color: 'white' }} align="right">Total Price (LKR)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell style={{ color: 'white' }}>{item.name}</TableCell>
                <TableCell style={{ color: 'white' }} align="right">{item.unitPrice}</TableCell>
                <TableCell style={{ color: 'white' }} align="right">{item.quantity}</TableCell>
                <TableCell style={{ color: 'white' }} align="right">{item.unitPrice * item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div
        style={{
          backgroundColor: 'rgba(64, 64, 64, 0.8)',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '40%',
          textAlign: 'center',
          margin: '20px',
          height: 'auto'
        }}
      >
        <CardHeader
          title={<span style={{ fontSize: '30px', fontWeight: 'bold' }}>Purchase Details</span>}
          sx={{ pt: 2, alignItems: 'center', color: 'white', alignSelf: 'flex-start' }}
        />

        <Typography variant="h6" style={{ color: 'white', marginTop: '12px', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span style={{ marginLeft: '10%' }}>Number of Items :</span>
          <div className="nutritions-button" style={{ marginRight: '10%', width: '200px' }}>{order.items.reduce((acc, item) => acc + item.quantity, 0)}</div>
        </Typography>
        <Typography variant="h6" style={{ color: 'white', marginTop: '12px', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span style={{ marginLeft: '10%' }}>Total Amount :</span>
          <div className="nutritions-button" style={{ marginRight: '10%', width: '200px' }}>
             {order.items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)}
          </div>
        </Typography> 

        <div style={{ display: 'flex', justifyContent: 'right', width: '100%', marginTop: '16px', marginBottom: '16px' }}>
          {order.status === 'Pending' && (
            <Link to={`../drivers`}>
              <button className="details-button" style={{ width: '100%', marginRight: '30px' }}>Assign a Driver</button>
            </Link>
          )}
          <button className="details-button" style={{ width: '30%', marginRight: '10px', background: '#541116', color: 'white' }} onClick={handleClickOpen}>Cancel</button>
        </div> 
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to cancel the order {order.id}?</DialogTitle>
        <DialogActions>
          <button type='button' className='button add-button mb-5 mr-5' onClick={handleCancel} autoFocus>
            Yes
          </button>
          <button type='button' className='button add-button mb-5 mr-5' onClick={handleClose}>
            No
          </button>
        </DialogActions>
      </Dialog>
    </div>

      {/* <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div
          style={{
            backgroundColor: 'rgba(64, 64, 64, 0.8)',
            borderRadius: '10px',
            padding: '16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            margin: '20px',
            paddingLeft: '30px',
            width: '30%',
          }}
        >
          <CardHeader
            title={<span style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center' }}>Order Items</span>}
            sx={{ pt: 2, alignItems: 'center', color: 'white' }}
          />

          <TableContainer component={Paper} style={{ marginTop: '16px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: 'white' }}>Item</TableCell>
                  <TableCell style={{ color: 'white' }}>Unit Price</TableCell>
                  <TableCell style={{ color: 'white' }}>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ color: 'white' }}>{item.name}</TableCell>
                    <TableCell style={{ color: 'white' }}>{item.unitPrice}</TableCell>
                    <TableCell style={{ color: 'white' }}>{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div
          style={{
            backgroundColor: 'rgba(64, 64, 64, 0.8)',
            borderRadius: '10px',
            padding: '16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            margin: '20px',
            paddingLeft: '30px',
            width: '45%',
          }}
        >
          <CardHeader
            title={<span style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center' }}>Payment Details</span>}
            sx={{ pt: 2, alignItems: 'center', color: 'white' }}
          />

          <Typography variant="h7" style={{ color: 'white', marginTop: '16px' }}>Discount : {order.discount}</Typography>
          <Typography variant="h7" style={{ color: 'white', marginTop: '16px' }}>Total : {order.total}</Typography>
        </div>
      </div> */}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cancel Order</DialogTitle>
        <DialogActions>
          <TextField label="Enter Reason" fullWidth />
          <button type='button' className='button add button' onClick={handleCancel}>Submit</button>
        </DialogActions>
      </Dialog>
{/* 
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <Link to="/order-page" style={{ marginRight: '10px' }}>Back to Order</Link>
        <button onClick={handleClickOpen}>Cancel Order</button>
      </div> */}
    </div>
  );
};
