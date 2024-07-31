import { Box, CardHeader, Dialog, DialogActions, DialogTitle, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import BackgroundImage from '../../assets/images/Background_image.png';

const menuItems = [
  { id: 1, name: "Scrumbled Egg", amount: 3, description: "Medically reviewed by Melizza Rifkin." },
  { id: 2, name: "Grilled Chicken wedges", amount: 2, description: "Medically reviewed by Melizza Rifkin." },
];

const MenuItemTile = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState(false); // Track acceptance state

  const handleDelete = () => {
    console.log(`Deleting item ${item.id}`);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAccept = () => {
    // Handle the acceptance logic here
    setAccepted(true); // Update state to show pending button
    setOpen(false);
  };

  const handleSubmit = () => {
    // Handle the submission logic here
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: 300,
        height: 350,
        margin: 2,
        borderRadius: 10,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'rgba(64, 64, 64, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 2,
      }}
    >
<div
  style={{
    width: 200,
    height: 80,
    borderRadius: '50px',
    boxShadow: '0 12px 24px rgba(255, 255, 255, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', // Keep the background transparent
  }}
>
  <Typography variant="h6" sx={{ margin: 0, color: 'white' }}>
    {item.name}
  </Typography>
</div>


      <Typography variant="h6" sx={{ marginTop: 1 }}>
        Amount of items: {item.amount}
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1, color: '#ddd' }}>
        {item.description}
      </Typography>

      <div className="button-container mt-5">
        {!accepted && (
          <button type="button" className="button add-button" onClick={handleClickOpen}>
            Accept
          </button>
        )}
        <button type="button" className="button delete-button" onClick={handleDelete}>
          Reject
        </button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Are you sure you want to delete {item.name}?</DialogTitle>
          <DialogActions>
            <button type="button" className="button add-button mb-5 mr-5" onClick={handleDelete} autoFocus>
              Yes
            </button>
            <button type="button" className="button add-button mb-5 mr-5" onClick={handleClose}>
              No
            </button>
          </DialogActions>
        </Dialog>

        <Dialog open={open} onClose={handleSubmit}>
          <DialogTitle>Accept</DialogTitle>
          <DialogActions>
            <TextField label="Enter Price" fullWidth />
            <button type='button' className='button add-button' onClick={handleAccept}>Submit</button>
          </DialogActions>
        </Dialog>
      </div>

      {accepted && (
        <button type="button" className="button details-button" style={{ width: '70%' }}>
          Pending
        </button>
      )}
    </Box>
  );
};

export const MenuTable = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <CardHeader
        title="Menu"
        sx={{ pt: 2, alignItems: "center" }}
      />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        {menuItems.map((item) => (
          <MenuItemTile key={item.id} item={item} />
        ))}
      </Box>
    </Box>
  );
};

