import React, { useState } from 'react';
import { Box, CardHeader, TextField, Button, Typography } from '@mui/material';
import BackgroundImage from '../../assets/images/Add.jpg';
import CatImage from '../../assets/images/category.png';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';

export const AddFoodCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);

  const handleNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleAddCategory = () => {
    // Add category logic
    console.log('Category Added:', categoryName, image);
    setCategoryName('');
    setImage(null);
  };

  const handleClearForm = () => {
    setCategoryName('');
    setImage(null);
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
        justifyContent: 'space-between', // Align items to the left and right
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '35%', 
          backgroundColor: 'rgba(64, 64, 64, 0.8)',
          borderRadius: 10,
          padding: 4,
          marginLeft:'30%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CardHeader
          title="Add Food Category"
          sx={{ pt: 2, alignItems: 'center', color: 'white' }}
        />

        <TextField
          id="category_name"
          label="Category Name"
          value={categoryName}
          onChange={handleNameChange}
          sx={{
            marginBottom: '20px',
            marginTop:'50px',
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
            width: '70%',
            backgroundColor: '#95CD41', // Adjusted to a similar green color
            borderRadius: '20px',
            height: '70%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            marginBottom:'50px',
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
              alt="Category"
              style={{ width: 150, height: 150, borderRadius: '50%' }}
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 2 }}>
          <div className="button-container mt-5">
            <button type="button" className="button add-button" onClick={handleAddCategory}>
              <AddIcon /> Add
            </button>
            <button type="button" className="button delete-button" onClick={handleClearForm}>
              <ClearIcon /> Clear
            </button>
          </div>
        </Box>
      </Box>
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          justifyContent: 'flex-end', // Align image to the right
          alignItems: 'center',
        }}
      > 
      </Box>
    </Box>
  );
};
