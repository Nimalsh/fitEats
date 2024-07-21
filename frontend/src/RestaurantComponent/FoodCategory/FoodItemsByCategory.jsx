import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, CardHeader, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import PizzaImage from '../../assets/images/Pizza.webp';
import BurgerImage from '../../assets/images/Burger.png';
import BreakfastImage from './Breakfast.jpeg';
import SeaImage from './Sea.jpeg';
import BakeryImage from '../../assets/images/bakery.png';
import DrinkImage from './Drink.jpeg';
import BackgroundImage from '../../assets/images/item.png';
import AddIcon from '@mui/icons-material/Add';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';

// Dummy data for demonstration purposes
export const foodItems = {
  1: [
    { id: 1, name: 'Chilli Chicken Pizza', size: 'Personal', price: 'LKR 840', image: PizzaImage, description: 'Spicy chicken with cheese and chili toppings.' },
    { id: 2, name: 'Black Chicken Pizza', size: 'Medium', price: 'LKR 1560', image: PizzaImage, description: 'Chicken pizza with a unique black sauce.' },
    { id: 3, name: 'Chilli Chicken Pizza', size: 'Large', price: 'LKR 2480', image: PizzaImage, description: 'Spicy chicken with cheese and chili toppings.' },
    { id: 4, name: 'Sausage Delight Pizza', size: 'Large', price: 'LKR 2840', image: PizzaImage, description: 'Loaded with sausage and cheese.' },
    { id: 5, name: 'Hot & Spicy Pizza', size: 'Large', price: 'LKR 2840', image: PizzaImage, description: 'Extra spicy pizza for those who love heat.' },
    { id: 6, name: 'Sausage Delight Pizza', size: 'Large', price: 'LKR 2840', image: PizzaImage, description: 'Loaded with sausage and cheese.' },
    { id: 7, name: 'Cheese Chicken Pizza', size: 'Large', price: 'LKR 2840', image: PizzaImage, description: 'Chicken pizza topped with extra cheese.' },
    { id: 8, name: 'Tandoori Chicken Pizza', size: 'Large', price: 'LKR 2840', image: PizzaImage, description: 'Tandoori flavored chicken with cheese.' },
  ],
  2: [
    { id: 9, name: 'Sausage Bun', size: 'Small', price: 'LKR 120', image: BakeryImage, description: 'Soft bun filled with sausage.' },
    { id: 10, name: 'Egg Rotti', size: 'Regular', price: 'LKR 150', image: BakeryImage, description: 'Flatbread stuffed with egg.' },
    { id: 11, name: 'Sandwich', size: 'Large', price: 'LKR 220', image: BakeryImage, description: 'Layered with veggies and meat.' },
    { id: 12, name: 'Cupcake', size: 'Regular', price: 'LKR 100', image: BakeryImage, description: 'Sweet and fluffy cupcake.' },
  ],
  3: [
    { id: 13, name: 'Cheese Burger', size: 'Regular', price: 'LKR 1500', image: BurgerImage, description: 'Classic cheeseburger with a juicy patty.' },
    { id: 14, name: 'Veggie Burger', size: 'Regular', price: 'LKR 2000', image: BurgerImage, description: 'Loaded with fresh veggies.' },
    { id: 15, name: 'Chicken Burger', size: 'Regular', price: 'LKR 2500', image: BurgerImage, description: 'Crispy chicken patty with lettuce and tomato.' },
    { id: 16, name: 'Chicken Burger', size: 'Large', price: 'LKR 4200', image: BurgerImage, description: 'Large crispy chicken burger.' },
    { id: 17, name: 'Egg & Cheese Burger', size: 'Large', price: 'LKR 4500', image: BurgerImage, description: 'Topped with egg and cheese.' },
  ],
  4: [
    { id: 18, name: 'Coca Cola', size: '500ml', price: 'LKR 200', image: DrinkImage, description: 'Refreshing cola drink.' },
    { id: 19, name: 'Orange Juice', size: '300ml', price: 'LKR 500', image: DrinkImage, description: 'Freshly squeezed orange juice.' },
    { id: 20, name: 'Chocolate Milkshake', size: '300ml', price: 'LKR 750', image: DrinkImage, description: 'Rich and creamy chocolate milkshake.' },
    { id: 21, name: 'Coffee Milkshake', size: '300ml', price: 'LKR 550', image: DrinkImage, description: 'A blend of coffee and ice cream.' },
  ],
  5: [
    { id: 22, name: 'Grilled Salmon', size: 'Regular', price: 'LKR 850', image: SeaImage, description: 'Perfectly grilled salmon fillet.' },
    { id: 23, name: 'Shrimp Cocktail', size: 'Regular', price: 'LKR 500', image: SeaImage, description: 'Shrimps served with cocktail sauce.' },
    { id: 24, name: 'Seafood Fried Rice', size: 'Large', price: 'LKR 3000', image: SeaImage, description: 'Fried rice loaded with seafood.' },
  ],
  6: [
    { id: 25, name: 'Pancakes', size: '3 pieces', price: 'LKR 750', image: BreakfastImage, description: 'Fluffy pancakes served with syrup.' },
    { id: 26, name: 'Omelette', size: '2 eggs', price: 'LKR 500', image: BreakfastImage, description: 'Egg omelette with your choice of filling.' },
    { id: 27, name: 'Rice & Curry', size: 'Large', price: 'LKR 1000', image: BreakfastImage, description: 'A hearty meal of rice and curry.' },
    { id: 28, name: 'Rice & Curry', size: 'Medium', price: 'LKR 500', image: BreakfastImage, description: 'A smaller portion of rice and curry.' },
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
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    console.log('Food Item Deleted:', item.id);
    // Implement the delete logic here
    handleClose();
  };

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
        style={{ width: 150, height: 180, borderRadius: '30px', boxShadow: '0 12px 24px rgba(255, 255, 255, 0.5)' }}
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

      <button type="button" className="button details-button" sx={{ width: '70%' }}>
        <Link to={`../food-item/${item.id}`}>View Details</Link>
      </button>

      <div className="button-container mt-5">
        <Link to={`../food-item/update/${item.id}`} className="button view-button">
          <BorderColorIcon /> Update
        </Link>
        <button type="button" className="button delete-button" onClick={handleClickOpen}>
          <DeleteIcon /> Delete
        </button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}  
      >
        <DialogTitle>Are you sure you want to delete {item.name} ?</DialogTitle>
        {/* <DialogContent> 
        </DialogContent> */}
        <DialogActions>
          <button type='button' className='button add-button mb-5 mr-5' onClick={handleDelete} autoFocus>
            Yes
          </button>
          <button  type='button' className='button add-button mb-5 mr-5' onClick={handleClose} >
            No
          </button>
        </DialogActions>
      </Dialog>
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
