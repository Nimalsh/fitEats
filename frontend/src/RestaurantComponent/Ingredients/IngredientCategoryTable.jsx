import AddIcon from '@mui/icons-material/Add';
import { Box, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import BackgroundImage from '../../assets/images/Background_image.png';

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
  const [openIngredientDialog, setOpenIngredientDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [newIngredient, setNewIngredient] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const handleClickOpenIngredientDialog = () => {
    setOpenIngredientDialog(true);
  };

  const handleCloseIngredientDialog = () => {
    setOpenIngredientDialog(false);
  };

  const handleAddIngredient = () => {
    // Handle the logic to add the new ingredient here
    console.log('New Ingredient:', newIngredient, 'Category:', selectedCategory);
    setOpenIngredientDialog(false);
    setNewIngredient('');
    setSelectedCategory('');
  };

  const handleClickOpenCategoryDialog = () => {
    setOpenCategoryDialog(true);
  };

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
  };

  const handleAddCategory = () => {
    // Handle the logic to add the new category here
    console.log('New Category:', newCategory);
    setOpenCategoryDialog(false);
    setNewCategory('');
  };

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
          <Box
            sx={{
              display: 'flex',
              gap: 2, // Space between buttons
              alignItems: 'center', // Align items vertically
            }}
          >
            <button 
              className="button add-button" 
              onClick={handleClickOpenIngredientDialog}
              sx={{
                backgroundColor: '#95CD41',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#7baf30',
                },
                borderRadius: '20px',
                padding: '10px 20px',
                width: '150px', // Adjust width as needed
              }}
            >
              <AddIcon /> Add Ingredient
            </button>
            <button 
              className="button add-button"
              onClick={handleClickOpenCategoryDialog}
              sx={{
                backgroundColor: '#95CD41',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#7baf30',
                },
                borderRadius: '20px',
                padding: '10px 20px',
                width: '150px', // Adjust width as needed
              }}
            >
              <AddIcon /> Add Category
            </button>
          </Box>
        }
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

      {/* Dialog for Adding New Ingredient */}
      <Dialog open={openIngredientDialog} onClose={handleCloseIngredientDialog}>
        <DialogTitle>Add New Ingredient</DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="standard" sx={{ mt: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {ingredientCategories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="new-ingredient"
            label="New Ingredient"
            type="text"
            fullWidth
            variant="standard"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <button className='button add-button' onClick={handleAddIngredient}>Add</button>
          <button className='button delete-button' onClick={handleCloseIngredientDialog}>Cancel</button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Adding New Category */}
      <Dialog open={openCategoryDialog} onClose={handleCloseCategoryDialog}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="new-category"
            label="New Category"
            type="text"
            fullWidth
            variant="standard"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <button className='button add-button' onClick={handleAddCategory}>Add</button>
          <button className='button delete-button' onClick={handleCloseCategoryDialog}>Cancel</button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
