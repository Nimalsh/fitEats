import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Card, CardContent, CardMedia, IconButton, Autocomplete } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Example food items for auto-complete suggestions
const foodItems = [
  'Rice',
  'Rye',
  'Raspberry',
  'Radish',
  'Romaine Lettuce',
  'Rutabaga',
  // Add more food items as needed
];

const NewMenuForm = () => {
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  return (
    <Card sx={{ display: 'flex', p: 2, width: '80%', margin: '0 auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 300 }}>
        <CardMedia
          component="img"
          sx={{ width: '100%' }}
          image={image || 'https://via.placeholder.com/300'}
          alt="Menu Image"
        />
        <Button
          variant="contained"
          component="label"
          startIcon={<PhotoCamera />}
          sx={{ mt: 2 }}
        >
          Upload Image
          <input type="file" hidden onChange={handleImageChange} />
        </Button>
      </Box>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" gutterBottom>
          Add New Menu
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField label="Menu Name" variant="outlined" sx={{ mb: 2 }} />
          {ingredients.map((ingredient, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Autocomplete
                freeSolo
                options={foodItems}
                value={ingredient.name}
                onInputChange={(event, newInputValue) => handleIngredientChange(index, 'name', newInputValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={`Ingredient ${index + 1}`}
                    variant="outlined"
                    sx={{ width: '400px', mr: 1 }} // Explicitly set the width
                  />
                )}
                sx={{ width: '400px', mr: 1 }} // Explicitly set the width of the Autocomplete
              />
              <TextField
                label="Quantity"
                variant="outlined"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                sx={{ width: '100px', ml: 1 }} // Explicitly set the width
              />
              {index === ingredients.length - 1 && (
                <IconButton color="primary" onClick={handleAddIngredient} sx={{ ml: 1 }}>
                  <AddCircleOutlineIcon />
                </IconButton>
              )}
            </Box>
          ))}
          <Button variant="contained" color="primary">
            Add Menu
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewMenuForm;
