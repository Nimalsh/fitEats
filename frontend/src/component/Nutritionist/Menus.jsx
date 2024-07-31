import React, { useState } from 'react';
import { Tabs, Tab, Grid, Typography, Box, TextField, Button } from '@mui/material';
import MenuCard from './MenuCard';
import Newmenuform from './Newmenuform';
const menusData = [
  {
    name: 'Veggie loaded frittatas',
    image: 'https://cdn.pixabay.com/photo/2023/10/05/11/47/sweet-potatoes-8295778_1280.jpg',
    ingredients: [
      { name: 'Ingredient 1', quantity: '100g' },
      { name: 'Ingredient 2', quantity: '200ml' },
    ],
    nutrition: [
      { name: 'Calories', quantity: '250 kcal' },
      { name: 'Protein', quantity: '10g' },
      { name: 'Fat', quantity: '15g' },
      { name: 'Carbohydrates', quantity: '30g' },
      { name: 'Fiber', quantity: '5g' },
      { name: 'Sugars', quantity: '20g' },
      { name: 'Sodium', quantity: '300mg' },
    ],
    benefits: ['Weight Loss', 'Diabetes-Friendly'],
  },
  {
    name: 'Loaded brown rice pasta',
    image: 'https://cdn.pixabay.com/photo/2023/10/05/11/47/sweet-potatoes-8295778_1280.jpg',
    ingredients: [
      { name: 'Ingredient 1', quantity: '150g' },
      { name: 'Ingredient 2', quantity: '250ml' },
    ],
    nutrition: [
      { name: 'Calories', quantity: '300 kcal' },
      { name: 'Protein', quantity: '15g' },
      { name: 'Fat', quantity: '20g' },
      { name: 'Carbohydrates', quantity: '40g' },
      { name: 'Fiber', quantity: '7g' },
      { name: 'Sugars', quantity: '25g' },
      { name: 'Sodium', quantity: '400mg' },
    ],
    benefits: ['High Energy', 'Vegan'],
  },
  {
    name: 'Greek Yogurt Parfait',
    image: 'https://cdn.pixabay.com/photo/2023/10/05/11/47/sweet-potatoes-8295778_1280.jpg',
    ingredients: [
      { name: 'Ingredient 1', quantity: '150g' },
      { name: 'Ingredient 2', quantity: '250ml' },
    ],
    nutrition: [
      { name: 'Calories', quantity: '300 kcal' },
      { name: 'Protein', quantity: '15g' },
      { name: 'Fat', quantity: '20g' },
      { name: 'Carbohydrates', quantity: '40g' },
      { name: 'Fiber', quantity: '7g' },
      { name: 'Sugars', quantity: '25g' },
      { name: 'Sodium', quantity: '400mg' },
    ],
    benefits: ['High Energy', 'Vegan'],
  },
  {
    name: 'Quinoa Bowl with Roasted Vegetables',
    image: 'https://cdn.pixabay.com/photo/2023/10/05/11/47/sweet-potatoes-8295778_1280.jpg',
    ingredients: [
      { name: 'Ingredient 1', quantity: '150g' },
      { name: 'Ingredient 2', quantity: '250ml' },
    ],
    nutrition: [
      { name: 'Calories', quantity: '300 kcal' },
      { name: 'Protein', quantity: '15g' },
      { name: 'Fat', quantity: '20g' },
      { name: 'Carbohydrates', quantity: '40g' },
      { name: 'Fiber', quantity: '7g' },
      { name: 'Sugars', quantity: '25g' },
      { name: 'Sodium', quantity: '400mg' },
    ],
    benefits: ['High Energy', 'Vegan'],
  },
  // Add more menu data as needed
];

const NewMenuForm = () => {
  return (
    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '500px' }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6">Add New Menu</Typography>
      <TextField label="Menu Name" variant="outlined" />
      <TextField label="Image URL" variant="outlined" />
      <TextField label="Ingredient 1" variant="outlined" />
      <TextField label="Ingredient 2" variant="outlined" />
      {/* Add more fields as needed */}
      <TextField label="Calories" variant="outlined" />
      <TextField label="Protein" variant="outlined" />
      <TextField label="Fat" variant="outlined" />
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>Add Menu</Button>
    </Box>
  );
}

function Menus() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} marginTop={"5px"}>
      <Tabs value={tabIndex} onChange={handleTabChange} >
        <Tab label="Menus" />
        <Tab label="New Menu" />
      </Tabs>

      {tabIndex === 0 && (
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          {menusData.map((menu, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <MenuCard name={menu.name} image={menu.image} ingredients={menu.ingredients} nutrition={menu.nutrition} benefits={menu.benefits} />
            </Grid>
          ))}
        </Grid>
      )}

      {tabIndex === 1 && (
        <Box sx={{ mt: 2 }}>
          <Newmenuform />
        </Box>
      )}
    </Box>
  );
}

export default Menus;
