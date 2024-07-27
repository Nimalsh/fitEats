import React, { useState } from 'react';
import { Box, CardHeader, Typography, Dialog, DialogTitle, DialogActions } from '@mui/material';
import MenuImage from '../../assets/images/weight-loss.webp';
import HealthyImage from '../../assets/images/healthy.webp';
import BackgroundImage from '../../assets/images/Background_image.png';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/CalendarViewDay';
import { Link, useNavigate } from 'react-router-dom';

const menuItems = [
  { id: 1, name: "Scrumbled Egg", amount:3, description: "Medically reviewed by Melizza Rifkin." },
  { id: 2, name: "Grilled Chicken wedges", amount:2,  description: "Medically reviewed by Melizza Rifkin." },
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

  const navigate = useNavigate();

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
        style={{ width: 350, height: 80, borderRadius: '50px', boxShadow: '0 12px 24px rgba(255, 255, 255, 0.5)' }}
      /> 
      <Typography variant="h6" sx={{ marginTop: 1 }}>
        Amount of items:  {item.amount}
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1, color: '#ddd' }}>
        {item.description}
      </Typography>

      {/* <button type="button" className="button details-button" sx={{ width: '70%' }}>
        <Link to={`../food-item/${item.id}`}>View Details</Link>
      </button> */}

      <div className="button-container mt-5">
        <Link to={`../menu-plan/${item.id}`} className="button view-button">
           Accept
        </Link>
        <button type="button" className="button delete-button" onClick={handleClickOpen}>
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
