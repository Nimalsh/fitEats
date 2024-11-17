import { Box, Chip, CircularProgress, Modal, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFoodDetails } from '../../component/State/Menu/Action';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const FoodDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  // Get the food details and loading state from the Redux store
  const { foodDetails, loading, error } = useSelector((store) => store.foodDetails);

  // State for managing modal open/close and selected ingredient
  const [openNutrition, setOpenNutrition] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  useEffect(() => {
    dispatch(getFoodDetails(id, jwt));
  }, [dispatch, id, jwt]);

  const handleOpenNutrition = (ingredient) => {
    setSelectedIngredient(ingredient);
    setOpenNutrition(true);
  };

  const handleCloseNutrition = () => {
    setOpenNutrition(false);
    setSelectedIngredient(null);
  };

  // Function to calculate the total nutrition content of the food item
  const calculateTotalNutrition = () => {
    const totalNutrition = {
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fat: 0,
      totalSugar: 0,
      totalIron: 0,
      totalVitamins: 0,
    };

    if (foodDetails?.ingredients) {
      foodDetails.ingredients.forEach((ingredient) => {
        totalNutrition.calories += ingredient.calories || 0;
        totalNutrition.protein += ingredient.protein || 0;
        totalNutrition.carbohydrates += ingredient.carbohydrates || 0;
        totalNutrition.fat += ingredient.fat || 0;
        totalNutrition.totalSugar += ingredient.totalSugar || 0;
        totalNutrition.totalIron += ingredient.totalIron || 0;
        totalNutrition.totalVitamins += ingredient.totalVitamins || 0;
      });
    }

    return totalNutrition;
  };

  const totalNutrition = calculateTotalNutrition();

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <Typography variant="h6" color="error">Error loading food details: {error}</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      {foodDetails ? (
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>{foodDetails.name}</Typography>
          <Box display="flex" justifyContent="center" mb={2}>
            <img 
              src={foodDetails.images[0]} 
              alt={foodDetails.name} 
              style={{ width: 300, height: 200, borderRadius: '10%' }} 
            />
          </Box>
          <Typography variant="h6" gutterBottom>Description</Typography>
          <Typography variant="body1">{foodDetails.description}</Typography>
          <Typography variant="h6" gutterBottom>Price</Typography>
          <Typography variant="body1">Rs. {foodDetails.price}/=</Typography>
          <Typography variant="body1">{foodDetails.foodCategory.name}</Typography>  
          <Typography variant="body1">Vegetarian: {foodDetails.vegetarian ? 'Yes' : 'No'}</Typography> 
          <Typography variant="body1">Seasonal: {foodDetails.seasonal ? 'Yes' : 'No'}</Typography> 

          <Box display="flex" justifyContent="center" gap={1} flexWrap="wrap">
            {foodDetails.ingredients.map((ingredient, index) => (
              <Chip
                key={index}
                label={ingredient.name}
                onClick={() => handleOpenNutrition(ingredient)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>

          <div>
            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Nutrition Details</Typography>
            <Typography>Calories: {totalNutrition.calories}</Typography>
            <Typography>Protein: {totalNutrition.protein}g</Typography>
            <Typography>Carbohydrates: {totalNutrition.carbohydrates}g</Typography>
            <Typography>Fat: {totalNutrition.fat}g</Typography>
            <Typography>Total Sugar: {totalNutrition.totalSugar}g</Typography>
            <Typography>Total Iron: {totalNutrition.totalIron}mg</Typography>
            <Typography>Total Vitamins: {totalNutrition.totalVitamins}mg</Typography>
          </div>

          {/* Modal for Nutrition Information */}
          <Modal
            open={openNutrition}
            onClose={handleCloseNutrition}
            aria-labelledby="nutrition-modal-title"
            aria-describedby="nutrition-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="nutrition-modal-title" variant="h6" sx={{ mb: 2 }}>
                Nutrition Content
              </Typography>
              {selectedIngredient && (
                <>
                  <Typography>Calories: {selectedIngredient.calories}</Typography>
                  <Typography>Protein: {selectedIngredient.protein}g</Typography>
                  <Typography>Carbohydrates: {selectedIngredient.carbohydrates}g</Typography>
                  <Typography>Fat: {selectedIngredient.fat}g</Typography>
                  <Typography>Total Sugar: {selectedIngredient.totalSugar}g</Typography>
                  <Typography>Total Iron: {selectedIngredient.totalIron}mg</Typography>
                  <Typography>Total Vitamins: {selectedIngredient.totalVitamins}mg</Typography>
                </>
              )}
            </Box>
          </Modal>
        </Paper>
      ) : (
        <Typography variant="h6">Food details not found.</Typography>
      )}
    </Box>
  );
};
