import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, CardHeader, Typography } from '@mui/material';
import PizzaImage from '../../assets/images/Pizza.webp';
import BurgerImage from '../../assets/images/Burger.png';
import BreakfastImage from './Breakfast.jpeg';
import SeaImage from './Sea.jpeg';
import BakeryImage from '../../assets/images/bakery.png';
import DrinkImage from './Drink.jpeg';
import BackgroundImage from '../../assets/images/item.png';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/CalendarViewDay';
import BorderColorIcon from '@mui/icons-material/BorderColor';

// Dummy data for demonstration purposes
const foodItems = {
  1: [
    { id: 1, name: 'Chilli Chicken Pizza', size: 'Personal', price: 'LKR 840', image: PizzaImage },
    { id: 2, name: 'Black Chicken Pizza', size: 'Medium', price: 'LKR 1560', image: PizzaImage },
    { id: 3, name: 'Chilli Chicken Pizza', size: 'Large', price: 'LKR 2480', image: PizzaImage },
    { id: 4, name: 'Sausage Delight Pizza', size: 'Large', price: 'LKR 2840', image: PizzaImage },
    { id: 5, name: 'Hot & Spicy Pizza', size: 'Large', price: 'LKR 2840', image: PizzaImage },
    { id: 6, name: 'Sausage Delight Pizza', size: 'Large', price: 'LKR 2840', image: PizzaImage },
    { id: 7, name: 'Cheese Chicken Pizza', size: 'Large', price: 'LKR 2840', image: PizzaImage },
    { id: 8, name: 'Tandoori Chicken Pizza', size: 'Large', price: 'LKR 2840', image: PizzaImage },
  ],
  2: [
    { id: 9, name: 'Sausage Bun', size: 'Small', price: 'LKR 120', image: BakeryImage },
    { id: 10, name: 'Egg Rotti', size: 'Regualr', price: 'LKR 150', image: BakeryImage },
    { id: 11, name: 'Sandwich', size: 'Large', price: 'LKR 220', image: BakeryImage },
    { id: 12, name: 'Cupcake', size: 'Regular', price: 'LKR 100', image: BakeryImage },
  ],
  3: [
    { id: 13, name: 'Cheese Burger', size: 'Regular', price: 'LKR 1500', image: BurgerImage },
    { id: 14, name: 'Veggie Burger', size: 'Regular', price: 'LKR 2000', image: BurgerImage },
    { id: 15, name: 'Chicken Burger', size: 'Regular', price: 'LKR 2500', image: BurgerImage },
    { id: 16, name: 'Chicken Burger', size: 'Large', price: 'LKR 4200', image: BurgerImage },
    { id: 17, name: 'Egg & Cheese Burger', size: 'Large', price: 'LKR 4500', image: BurgerImage },
  ],
  4: [
    { id: 18, name: 'Coca Cola', size: '500ml', price: 'LKR 200', image: DrinkImage },
    { id: 19, name: 'Orange Juice', size: '300ml', price: 'LKR 500', image: DrinkImage },
    { id: 20, name: 'Choclate Milkshake', size: '300ml', price: 'LKR 750', image: DrinkImage },
    { id: 21, name: 'Coffee Milkshake', size: '300ml', price: 'LKR 550', image: DrinkImage },
  ],
  5: [
    { id: 22, name: 'Grilled Salmon', size: 'Regualr', price: 'LKR 850', image: SeaImage },
    { id: 23, name: 'Shrimp Cocktail', size: 'Regular', price: 'LKR 500', image: SeaImage },
    { id: 24, name: 'Sea Food Friedrice', size: 'Large', price: 'LKR 3000', image: SeaImage },
  ],
  6: [
    { id: 25, name: 'Pancakes', size: '3 pieces', price: 'LKR 750', image: BreakfastImage },
    { id: 26, name: 'Omelette', size: '2 eggs', price: 'LKR 500', image: BreakfastImage },
    { id: 27, name: 'Rice & Curry', size: 'Large', price: 'LKR 1000', image: BreakfastImage },
    { id: 28, name: 'Rice & Curry', size: 'Medium', price: 'LKR 500', image: BreakfastImage },
  ],
};

const categoryNames = {
  1: 'Pizza',
  2: 'Bakery',
  3: 'Burgers',
  4: 'Drinks',
  5: 'Sea Food',
  6: 'Breakfast'
};

const FoodItemTile = ({ item }) => {
  return (
    <Box
      sx={{
        width: 300,
        height: 400,
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
        style={{ width: 150, height: 180,borderRadius:'30px',boxShadow: '0 12px 24px rgba(255, 255, 255, 0.5)',  }}
      />
      <Typography variant="h6" sx={{ marginTop: 1 }}>
        {item.name}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 1 }}>
        Size: {item.size}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 1 }}>
        Price: {item.price}
      </Typography>

      <button type="button" className="button details-button">
            View Details
        </button>

      <div className="button-container mt-5">
      <Link to={'/'} className="button view-button">
          <BorderColorIcon /> Update
        </Link>
        <button type="button" className="button delete-button">
          <DeleteIcon /> Delete
        </button>
      </div>
    </Box>
  );
};

export const FoodItemsByCategory = () => {
  const { categoryId } = useParams();
  const items = foodItems[categoryId] || [];
  const categoryName = categoryNames[categoryId] || 'Unknown Category';

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

      <CardHeader className='ml-4'
          action={
            <Link to={`../food-item/add/${categoryId}`}>
              <button className="button add-button">
                <AddIcon /> Add {categoryName} 
              </button>
            </Link>
          }
          title={
            <Box>
            <Typography variant="h4" component="div" sx={{ fontSize: '2rem', display: 'flex', alignItems: 'center' }}>
               <FastfoodIcon className='mr-2' sx={{ fontSize: '2rem' }} />{categoryName}
            </Typography>
            <Box sx={{ borderBottom: '2px solid white', width: '90px' }} />
            </Box>
          }
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
        {items.map((item) => (
          <FoodItemTile key={item.id} item={item} />
        ))}
      </Box>
    </Box>
  );
};
