import LocationOnIcon from '@mui/icons-material/LocationOn';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Box, CardHeader, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BackgroundImage from '../../assets/images/item.png';

const orders = [
  { id: 1, customer: "John Doe", totalPrice: "LKR 2500.00", time: "16.23.00", date: "2024-07-10", status: "Pending", details: "Order details here", items: '5', discount: "LKR 5.00", total: "LKR 2000.00", address: "123 Main St", telephone: "076-1234567", email: "johndoe@example.com" },
  { id: 2, customer: "Jane Smith", totalPrice: "LKR 500.00", time: "14.10.00", date: "2024-07-11", status: "Pending", details: "Order details here", items: '3', discount: "LKR 50.00", total: "LKR 450.00", address: "456 Elm St", telephone: "077-2345678", email: "janesmith@example.com" },
  { id: 3, customer: "Bob Johnson", totalPrice: "LKR 750.00", time: "10.30.00", date: "2024-07-12", status: "Cancelled", details: "Order details here", items: '4', discount: "LKR 75.00", total: "LKR 675.00", address: "789 Oak St", telephone: "078-3456789", email: "bobjohnson@example.com" },
  { id: 4, customer: "Alice Brown", totalPrice: "LKR 1000.00", time: "13.20.00", date: "2024-07-13", status: "Completed", details: "Order details here", items: '2', discount: "LKR 100.00", total: "LKR 900.00", address: "101 Pine St", telephone: "079-4567890", email: "alicebrown@example.com" },
  { id: 5, customer: "Chris Davis", totalPrice: "LKR 15000.00", time: "16.45.00", date: "2024-07-14", status: "Pending", details: "Order details here", items: '10', discount: "LKR 1500.00", total: "LKR 13500.00", address: "202 Maple St", telephone: "070-5678901", email: "chrisdavis@example.com" },
  { id: 6, customer: "Patricia Miller", totalPrice: "LKR 200.00", time: "11.55.00", date: "2024-07-15", status: "On Delivery", details: "Order details here", items: '1', discount: "LKR 20.00", total: "LKR 180.00", address: "303 Birch St", telephone: "071-6789012", email: "patriciamiller@example.com" },
  { id: 7, customer: "Patricia Miller", totalPrice: "LKR 5000.00", time: "12.40.00", date: "2024-07-15", status: "On Delivery", details: "Order details here", items: '6', discount: "LKR 500.00", total: "LKR 4500.00", address: "303 Birch St", telephone: "071-6789012", email: "patriciamiller@example.com" },
];

export const OrderDetails = () => {
  const { orderId } = useParams();
  const order = orders.find(order => order.id === parseInt(orderId));
  const [open, setOpen] = useState(false);

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
            width: '45%',
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

          <Typography variant="h7" style={{ color: 'white', marginTop: '12px' }}>Name : {order.customer}</Typography>
          <Typography variant="h7" style={{ color: 'white', marginTop: '12px' }}>Address : {order.address}</Typography>
          <Typography variant="h7" style={{ color: 'white', marginTop: '12px' }}>Telephone Number : {order.telephone}</Typography>
          <Typography variant="h7" style={{ color: 'white', marginTop: '12px' }}>Email Address : {order.email}</Typography>

          {order.status === "Pending" && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '2%' }}>
              <div className="details-button" style={{ marginLeft: '10px', marginBottom: '1px' }}><LocationOnIcon sx={{ marginRight: '8px' }} />View Map</div>
            </div>
          )}
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
