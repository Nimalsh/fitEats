import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CardHeader, Typography, Box, Dialog, DialogTitle, DialogActions, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import BackgroundImage from '../../assets/images/item.png';
import StorefrontIcon from '@mui/icons-material/Storefront'; 

const orders = [
  { id: 1, customer: "John Doe", purchase: "done", items: [{ name: "Item 1", unitPrice: 500, quantity: 5 }, { name: "Item 1", unitPrice: 500, quantity: 1 }] },
  { id: 2, customer: "Jane Smith", purchase: 'No', items: [{ name: "Item 2", unitPrice: 100, quantity: 3 }] },
  { id: 3, customer: "Bob Johnson", purchase: 'done', items: [{ name: "Item 3", unitPrice: 200, quantity: 4 }] },
];

export const InOrderDetails = () => {
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
      </div>

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
        <Typography variant="h6" style={{ color: 'white', marginTop: '12px', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span style={{ marginLeft: '10%' }}>Discount (%):</span>
          <TextField
            type="number"
            variant="outlined"
            size="small"
            value={discount}
            onChange={handleDiscountChange}
            style={{ marginRight: '10%', width: '200px' }}
          />
        </Typography>
        <Typography variant="h6" style={{ color: 'white', marginTop: '12px', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span style={{ marginLeft: '10%' }}>Last Total :</span>
          <div className="nutritions-button" style={{ marginRight: '10%', width: '200px' }}>
            {getLastTotal()}
          </div>
        </Typography>
        <Typography variant="h6" style={{ color: 'white', marginTop: '12px', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span style={{ marginLeft: '10%' }}>Purchase By Customer :</span>
          <div className="nutritions-button" style={{ marginRight: '10%', width: '200px' }}>
            {order.purchase}
          </div>
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'right', width: '100%', marginTop: '16px', marginBottom: '16px' }}>
          {order.purchase === 'done' && (
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
  );
};
