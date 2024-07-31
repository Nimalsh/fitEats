import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BackgroundImage from '../../assets/images/hodai.jpg';

const ingredientCategories = ["Vegetables", "Fruits", "Meats", "Dairy", "Spices"];

const ingredientItemsMap = {
  Vegetables: ["Tomato", "Onion", "Pepper", "Carrot", "Broccoli"],
  Fruits: ["Apple", "Banana", "Orange", "Strawberry", "Grapes"],
  Meats: ["Chicken", "Beef", "Pork", "Lamb", "Turkey"],
  Dairy: ["Milk", "Cheese", "Butter", "Yogurt", "Cream"],
  Spices: ["Salt", "Pepper", "Cumin", "Turmeric", "Paprika"]
};

export const AddFoodItem = () => {
  const { categoryId } = useParams();
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [ingredientData, setIngredientData] = useState(
    Array.from({ length: 10 }, () => ({ category: '', item: '', amount: '', items: [] }))
  );
  
  // State for dialogs
  const [openIngredientDialog, setOpenIngredientDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [newIngredient, setNewIngredient] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const handleFoodNameChange = (event) => setFoodName(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleIngredientChange = (index, field, value) => {
    const newData = [...ingredientData];
    newData[index][field] = value;
    
    if (field === 'category') {
      newData[index].items = ingredientItemsMap[value] || [];
      newData[index].item = '';
    }

    setIngredientData(newData);
  };

  const handleAddFoodItem = () => {
    console.log('Food Item Added:', foodName, price, description, image, categoryId, ingredientData);
    setFoodName('');
    setPrice('');
    setDescription('');
    setImage(null);
    setIngredientData(Array.from({ length: 10 }, () => ({ category: '', item: '', amount: '', items: [] })));
  };

  const handleClearForm = () => {
    setFoodName('');
    setPrice('');
    setDescription('');
    setImage(null);
    setIngredientData(Array.from({ length: 10 }, () => ({ category: '', item: '', amount: '', items: [] })));
  };

  const handleClickOpenIngredientDialog = () => setOpenIngredientDialog(true);
  const handleCloseIngredientDialog = () => setOpenIngredientDialog(false);
  const handleAddIngredient = () => {
    console.log('New Ingredient:', newIngredient);
    // Add new ingredient to the ingredientItemsMap or handle as needed
    setOpenIngredientDialog(false);
    setNewIngredient('');
  };

  const handleClickOpenCategoryDialog = () => setOpenCategoryDialog(true);
  const handleCloseCategoryDialog = () => setOpenCategoryDialog(false);
  const handleAddCategory = () => {
    console.log('New Category:', newCategory);
    // Add new category to ingredientCategories and update the ingredientItemsMap as needed
    setOpenCategoryDialog(false);
    setNewCategory('');
  };

  const categoryNames = {
    1: 'Pizza',
    2: 'Bakery',
    3: 'Burgers',
    4: 'Drinks',
    5: 'Sea Food',
    6: 'Breakfast'
  };

  const categoryName = categoryNames[categoryId];

  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        paddingLeft: '10%'
      }}
    >
      <div style={{ width: '40%', justifyContent: 'left', marginLeft: '10px' }}>
        <Box
          sx={{
            backgroundColor: 'rgba(64, 64, 64, 0.8)',
            borderRadius: 10,
            padding: 4,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '30px',
            marginBottom: '10px',
          }}
        >
          <CardHeader
            title={`Add New ${categoryName}`}
            sx={{ pt: 2, alignItems: 'center', color: 'white' }}
          />

          <TextField
            id="food_name"
            label="Food Item Name"
            value={foodName}
            onChange={handleFoodNameChange}
            sx={{
              alignContent: 'left',
              width: '60%',
              marginBottom: '20px',
              marginTop: '30px',
              backgroundColor: '#000000',
              borderRadius: 1,
              'label': { color: '#fff' },
              '& label.Mui-focused': { color: '#fff' },
            }}
          />

          <TextField
            id="price"
            label="Price"
            value={price}
            onChange={handlePriceChange}
            sx={{
              width: '60%',
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
              align: 'center',
              width: '50%',
              backgroundColor: '#95CD41',
              borderRadius: '20px',
              height: '70%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              marginBottom: '30px',
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
      </div>

      <div style={{ width: '66.67%' }}>
        <Box
          sx={{
            backgroundColor: 'rgba(64, 64, 64, 0.8)',
            borderRadius: 10,
            padding: 4,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            alignItems: 'center',
          }}
        >
          <CardHeader
            title="Ingredients of the Food Item"
            sx={{ pt: 2, alignItems: 'center', color: 'white' }}
            action={
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center',
                }}
              >
                <button
                  className='button add-button'
                  variant="contained"
                  color="success"
                  onClick={handleClickOpenIngredientDialog}
                  sx={{
                    borderRadius: '20px',
                    backgroundColor: '#95CD41',
                    '&:hover': { backgroundColor: '#7aad33' },
                  }}
                >
                  <AddIcon /> Add Ingredient
                </button>
                <button
                  className='button add-button'
                  variant="contained"
                  color="success"
                  onClick={handleClickOpenCategoryDialog}
                  sx={{
                    borderRadius: '20px',
                    backgroundColor: '#95CD41',
                    '&:hover': { backgroundColor: '#7aad33' },
                  }}
                >
                  <AddIcon /> Add Category
                </button>
              </Box>
            }
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
                    disabled={!ingredient.category}
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
                    {ingredient.items.map((item) => (
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
                  disabled={!ingredient.item}
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
              <div className="button-container mt-5 mr-2">
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
      </div>

      {/* Ingredient Dialog */}
      <Dialog open={openIngredientDialog} onClose={handleCloseIngredientDialog}>
        <DialogTitle>Add New Ingredient</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="ingredient"
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

      {/* Category Dialog */}
      <Dialog open={openCategoryDialog} onClose={handleCloseCategoryDialog}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="category"
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
