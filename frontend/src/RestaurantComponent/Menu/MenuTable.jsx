import React, { useState } from 'react';
import { Box, CardHeader, Typography, Dialog, DialogTitle, DialogActions } from '@mui/material';
import MenuImage from '../../assets/images/weight-loss.webp';
import HealthyImage from '../../assets/images/healthy.webp';
import BackgroundImage from '../../assets/images/Background_image.png';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/CalendarViewDay';
import { Link } from 'react-router-dom';

const menuItems = [
  { id: 1, name: "7 Day Weight Loss Meal Plan", image: MenuImage, description: "Medically reviewed by Melizza Rifkin." },
  { id: 2, name: "7 Day Balanced Meal Plan", image: HealthyImage, description: "Medically reviewed by Melizza Rifkin." },
];

const MenuItemTile = ({ item }) => {
  const [open, setOpen] = useState(false);

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
      <img
        src={item.image}
        alt={item.name}
        style={{ width: 350, height: 250, borderRadius: '50px', boxShadow: '0 12px 24px rgba(255, 255, 255, 0.5)' }}
      />
      <Typography variant="h6" sx={{ marginTop: 1 }}>
        {item.name}
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1, color: '#ddd' }}>
        {item.description}
      </Typography>

      <div className="button-container mt-5">
        <Link to={`../menu-plan/${item.id}`} className="button view-button">
          <ViewIcon /> View
        </Link>
        <button type="button" className="button delete-button" onClick={handleClickOpen}>
          <DeleteIcon /> Delete
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
      </div>
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
        action={
          <Link to='../menu/add'>
            <button className="button add-button">
              <AddIcon /> Add Item
            </button>
          </Link>
        }
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
