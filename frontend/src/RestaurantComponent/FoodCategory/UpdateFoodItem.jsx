 import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CardHeader, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import BackgroundImage from '../../assets/images/hodai.jpg';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const ingredientCategories = ["Vegetables", "Fruits", "Meats", "Dairy", "Spices"];

const ingredientItemsMap = {
  Vegetables: ["Tomato", "Onion", "Pepper", "Carrot", "Broccoli"],
  Fruits: ["Apple", "Banana", "Orange", "Strawberry", "Grapes"],
  Meats: ["Chicken", "Beef", "Pork", "Lamb", "Turkey"],
  Dairy: ["Milk", "Cheese", "Butter", "Yogurt", "Cream"],
  Spices: ["Salt", "Pepper", "Cumin", "Turmeric", "Paprika"]
};

export const UpdateFoodItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [ingredientData, setIngredientData] = useState(
    Array.from({ length: 10 }, () => ({ category: '', item: '', amount: '', items: [] }))
  );

  useEffect(() => {
    // Fetch the food item details using the id and populate the state
    // For example:
    // fetch(`/api/food-items/${id}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     setFoodName(data.name);
    //     setPrice(data.price);
    //     setDescription(data.description);
    //     setImage(data.image);
    //     setIngredientData(data.ingredients);
    //   });
  }, [id]);

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
    
    // Update ingredientItems when category changes
    if (field === 'category') {
      newData[index].items = ingredientItemsMap[value] || [];
      newData[index].item = ''; // Reset item when category changes
    }

    setIngredientData(newData);
  };

  const handleUpdateFoodItem = () => {
    // Update food item logic
    console.log('Food Item Updated:', foodName, price, description, image, ingredientData);
    // Redirect to food items page after update
    navigate('/food-items');
  };

  const handleClearForm = () => {
    setFoodName('');
    setPrice('');
    setDescription('');
    setImage(null);
    setIngredientData(Array.from({ length: 10 }, () => ({ category: '', item: '', amount: '', items: [] })));
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
            title="Update Food Item"
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
                  onClick={handleUpdateFoodItem}
                >
                  <BorderColorIcon /> Update
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
    </Box>
  );
};
