import React, { useState } from 'react';
import { Box, CardHeader, Typography } from '@mui/material'; 
import BackgroundImage from '../../assets/images/Background_image.png';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add'; 

// Dummy data for demonstration purposes
const ingredientCategories = [
  { id: 1, name: "Vegetables", ingredients: ["Tomato", "Onion", "Pepper", "Carrot", "Broccoli"] },
  { id: 2, name: "Fruits", ingredients: ["Apple", "Banana", "Orange", "Strawberry", "Grapes"] },
  { id: 3, name: "Dairy", ingredients: ["Milk", "Cheese", "Butter", "Yogurt", "Cream"] },
  { id: 4, name: "Meat", ingredients: ["Chicken", "Beef", "Pork", "Lamb", "Turkey"] },
  { id: 5, name: "Cerals", ingredients: ["Salt", "Pepper", "Cumin", "Turmeric", "Paprika"] } 
];

const IngredientCategoryTile = ({ ingredientcategory }) => {
  return (
    <Box
      sx={{
        width: 300,
        height: 'auto',
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
      <Typography variant="h6" sx={{ marginTop: 1, color: 'white', fontWeight:'bold', fontSize:'2rem' }}>
        {ingredientcategory.name}
      </Typography>
      {ingredientcategory.ingredients.map((ingredient, index) => (
        <Typography key={index} variant="body1" sx={{ color: 'white' }}>
          {ingredient}
        </Typography>
      ))}
    </Box>
  );
};

export const IngredientCategoryTable = () => {
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
                // action={
                //   <>
                //   <Link to='../event/add'>
                //     <button className="button add-button">
                //       <AddIcon /> Add Event
                //     </button>
                //   </Link>
                //   <Link to='../event/add'>
                //     <button className="button add-button">
                //       <AddIcon /> Add Event
                //     </button>
                //   </Link>
                //   </>
                // }
        title="Ingredients"
        sx={{ pt: 2, textAlign: "left" }}
      />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        {ingredientCategories.map((ingredientcategory) => (
          <IngredientCategoryTile key={ingredientcategory.id} ingredientcategory={ingredientcategory} />
        ))}
      </Box>
    </Box>
  );
};
