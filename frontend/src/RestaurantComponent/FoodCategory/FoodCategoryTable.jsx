import React, { useState } from 'react';
import { Box, CardHeader, Typography, Dialog, DialogTitle, DialogActions } from '@mui/material';
import PizzaImage from './Pizza.jpeg';
import BurgerImage from './Burger.jpeg';
import BreakfastImage from './Breakfast.jpeg';
import SeaImage from './Sea.jpeg';
import BakeryImage from './Bakery.jpeg';
import DrinkImage from './Drink.jpeg';
import BackgroundImage from '../../assets/images/Background_image.png';
import AddIcon from '@mui/icons-material/Add'; 
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/CalendarViewDay';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Dummy data for demonstration purposes
const orders = [
  { id: 1, name: "Pizza", image: PizzaImage },
  { id: 2, name: "Bakery", image: BakeryImage },
  { id: 3, name: "Burgers", image: BurgerImage },
  { id: 4, name: "Drinks", image: DrinkImage },
  { id: 5, name: "Sea Food", image: SeaImage },
  { id: 6, name: "Breakfast", image: BreakfastImage }
];

const FoodCategoryTile = ({ category }) => {

  const { restaurant } = useSelector((store) => store)
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    console.log(`Deleting category ${category.id}`);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  console.log("Restaurant Details", restaurant)

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
        src={category.image}
        alt={category.name}
        style={{ width: 150, height: 150, borderRadius: '50%',boxShadow: '0 12px 24px rgba(255, 255, 255, 0.5)' }}
      />
      <Typography variant="h6" sx={{ marginTop: 1 }}>
        {category.name}
      </Typography>

      <div className="button-container mt-5">
        <Link to={`../food-category/${category.id}`} className="button view-button">
          <ViewIcon /> View
        </Link>
        <button type="button" className="button delete-button" onClick={handleClickOpen}>
          <DeleteIcon /> Delete
        </button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Are you sure you want to delete {category.name}?</DialogTitle>
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

export const FoodCategoryTable = () => {
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
      <div>
        <CardHeader
          action={
            <Link to='../category/add'>
              <button className="button add-button">
                <AddIcon /> Add Category
              </button>
            </Link>
          }
          title="Food Category"
          sx={{ pt: 2, alignItems: "center" }}
        />

        <div>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              padding: 2,
            }}
          >
            {orders.map((category) => (
              <FoodCategoryTile key={category.id} category={category} />
            ))}
           </Box>
        </div>
      </div>
    </Box>
  );
};
