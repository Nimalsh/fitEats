import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

// Dummy data for demonstration purposes
const foodItems = {
  1: ['Pizza Margherita', 'Pizza Pepperoni'],
  2: ['Croissant', 'Baguette'],
  3: ['Cheeseburger', 'Veggie Burger'],
  4: ['Coca Cola', 'Orange Juice'],
  5: ['Grilled Salmon', 'Shrimp Cocktail'],
  6: ['Pancakes', 'Omelette']
};

const categoryNames = {
  1: 'Pizza',
  2: 'Bakery',
  3: 'Burgers',
  4: 'Drinks',
  5: 'Sea Food',
  6: 'Breakfast'
};

export const FoodItemsByCategory = () => {
  const { categoryId } = useParams();
  const items = foodItems[categoryId] || [];
  const categoryName = categoryNames[categoryId] || 'Unknown Category';

  return (
    <Box
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
          {categoryName}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {items.map((item, index) => (
          <Typography key={index} sx={{ margin: 1 }}>
            {item}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
 