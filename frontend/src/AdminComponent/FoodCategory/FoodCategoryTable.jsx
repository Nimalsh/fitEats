import { Delete } from '@mui/icons-material';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Card, CardHeader, IconButton, Paper, TableContainer, Typography } from '@mui/material';
import React from 'react';
import PizzaImage from './Pizza.jpeg';
import BurgerImage from './Burger.jpeg';
import BreakfastImage from './Breakfast.jpeg';
import SeaImage from './Sea.jpeg';
import BakeryImage from './Bakery.jpeg';
import DrinkImage from './Drink.jpeg';
import BackgroundImage from '../../assets/images/Background_image.png';  // Updated path

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
  return (
    <Box
      sx={{
        width: 280,  // Increased width
        height: 250, // Increased height
        margin: 2,
        borderRadius: 10,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'rgba(64, 64, 64, 0.8)', // Updated background color
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
        style={{ width: 150, height: 150, borderRadius: '50%' }} // Increased size of image
      />
      <Typography variant="h6" sx={{ marginTop: 1 }}>
        {category.name}
      </Typography>
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
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />} 
              sx={{ backgroundColor: '#FDDA0D', color: 'black', fontWeight: 'bold', borderRadius:'1000' }}
            >
              Add Category
            </Button>
          }
          title={"Food Category"}
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
