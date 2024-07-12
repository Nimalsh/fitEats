import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CardHeader, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';
import BackgroundImage from '../../assets/images/hodai.jpg';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

const ingredientCategories = ["Category1", "Category2", "Category3"]; // Replace with actual categories
const ingredientItems = ["Item1", "Item2", "Item3"]; // Replace with actual items

export const AddFoodItem = () => {
  const { categoryId } = useParams();
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const [ingredientData, setIngredientData] = useState(
    Array.from({ length: 10 }, () => ({ category: '', item: '', amount: '' }))
  );

  const handleFoodNameChange = (event) => {
    setFoodName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleIngredientChange = (index, field, value) => {
    const newData = [...ingredientData];
    newData[index][field] = value;
    setIngredientData(newData);
  };

  const handleAddFoodItem = () => {
    // Add food item logic
    console.log('Food Item Added:', foodName, price, description, image, categoryId, ingredientData);
    setFoodName('');
    setPrice('');
    setDescription('');
    setImage(null);
    setIngredientData(Array.from({ length: 10 }, () => ({ category: '', item: '', amount: '' })));
  };

  const handleClearForm = () => {
    setFoodName('');
    setPrice('');
    setDescription('');
    setImage(null);
    setIngredientData(Array.from({ length: 10 }, () => ({ category: '', item: '', amount: '' })));
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: 2,
        display: 'flex',
        flexDirection: 'column', // Use column direction
        alignItems: 'center',
        gap: '10px', // Add gap between grid items
      }}
    >
      <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
       <Grid item xs={12} md={4}>
          <Box
            sx={{
              backgroundColor: 'rgba(64, 64, 64, 0.8)',
              borderRadius: 10,
              padding: 4,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              marginTop: '40px',
              marginBottom: '10px', // Adjust margin bottom for gap
            }}
          >
            <CardHeader
              title="Add Food Item"
              sx={{ pt: 2, alignItems: 'center', color: 'white' }}
            />

            <TextField
              id="food_name"
              label="Food Item Name"
              value={foodName}
              onChange={handleFoodNameChange}
              sx={{
                alignContent: 'left',
                width: '100%',
                marginBottom: '20px',
                marginTop: '50px',
                backgroundColor: '#000000',
                borderRadius: 1,
                'label': { color: '#fff' },
                '& label.Mui-focused': { color: '#fff' },
              }}
              fullWidth
            />

            <TextField
              id="price"
              label="Price"
              value={price}
              onChange={handlePriceChange}
              sx={{
                width: '100%',
                marginBottom: '20px',
                backgroundColor: '#000000',
                borderRadius: 1,
                'label': { color: '#fff' },
                '& label.Mui-focused': { color: '#fff' },
              }}
              fullWidth
            />

            <TextField
              id="description"
              label="Description"
              value={description}
              onChange={handleDescriptionChange}
              multiline
              rows={4}
              sx={{
                marginBottom: '20px',
                backgroundColor: '#000000',
                borderRadius: 1,
                'label': { color: '#fff' },
                '& label.Mui-focused': { color: '#fff' },
              }}
              fullWidth
            />

            <Button
              type="button"
              variant="contained"
              component="label"
              sx={{
                alignContent: 'center',
                width: '100%',
                backgroundColor: '#95CD41',
                borderRadius: '20px',
                height: '70%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                marginBottom: '50px',
              }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {image && (
              <Box
                sx={{
                  marginBottom: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={image}
                  alt="Food Item"
                  style={{ width: 150, height: 150, borderRadius: '50%' }}
                />
              </Box>
            )}

          </Box>
        </Grid>

        <Grid item xs={12} md={8} sx={{ mt: 2, marginTop: '10px' }}>
          <Box
            sx={{
              backgroundColor: 'rgba(64, 64, 64, 0.8)',
              borderRadius: 10,
              padding: 4,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              marginTop: '65%',
              alignItems :'center'
            }}
          >

            <CardHeader
              title="Ingredients of the Food Item"
              sx={{ pt: 2, alignItems: 'center', color: 'white' }}
            />

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
              {ingredientData.map((ingredient, index) => (
                <React.Fragment key={index}>
                  <FormControl sx={{ m: 1, minWidth: 120, backgroundColor: '#000', color: '#fff', borderRadius: 1 }}>
                    <InputLabel sx={{ color: '#fff' }}>Category</InputLabel>
                    <Select
                      value={ingredient.category}
                      onChange={(e) => handleIngredientChange(index, 'category', e.target.value)}
                      sx={{
                        color: '#fff',
                        '.MuiOutlinedInput-notchedOutline': {
                          borderColor: '#fff',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#fff',
                        },
                        '.MuiSvgIcon-root': {
                          color: '#fff',
                        },
                        '.MuiSelect-icon': {
                          color: '#fff',
                        },
                      }}
                    >
                      {ingredientCategories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 120, backgroundColor: '#000', color: '#fff', borderRadius: 1 }}>
                    <InputLabel sx={{ color: '#fff' }}>Item</InputLabel>
                    <Select
                      value={ingredient.item}
                      onChange={(e) => handleIngredientChange(index, 'item', e.target.value)}
                      sx={{
                        color: '#fff',
                        '.MuiOutlinedInput-notchedOutline': {
                          borderColor: '#fff',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#fff',
                        },
                        '.MuiSvgIcon-root': {
                          color: '#fff',
                        },
                        '.MuiSelect-icon': {
                          color: '#fff',
                        },
                      }}
                    >
                      {ingredientItems.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Amount (grams)"
                    value={ingredient.amount}
                    onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                    type="number"
                    sx={{
                      m: 1,
                      backgroundColor: '#000000',
                      borderRadius: 1,
                      'label': { color: '#fff' },
                      '& label.Mui-focused': { color: '#fff' },
                      '& .MuiInputBase-input': { color: '#fff' },
                    }}
                  />
                </React.Fragment>
              ))}
              <Box>
                <div className="button-container mt-5">
                  <button type='button' className='button add-button'
                    onClick={handleAddFoodItem}
                  >
                    <AddIcon /> Add
                  </button>
                  <button type='button' className='button delete-button'
                    onClick={handleClearForm}
                  >
                    <ClearIcon /> Clear
                  </button>
                </div>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
