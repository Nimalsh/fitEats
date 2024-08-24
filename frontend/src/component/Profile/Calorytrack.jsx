import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchMealsForDay, addMealToDay,fetchNutritionData,updateNutritionValues,getNutritionValues } from '../State/Bmi/Action';

const Calorytrack = () => {
  const { duration, planId } = useParams();
  const [selectedDay, setSelectedDay] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [mealType, setMealType] = useState('');
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [measurement, setMeasurement] = useState('');
  const [mealsData, setMealsData] = useState({
    breakfasts: [],
    lunchs: [],
    dinners: [],
    snacks: []
  });
  

  const dispatch = useDispatch();
  const durationValue = parseInt(duration, 10);
  const jwt = localStorage.getItem('jwt');

  const handleDayClick = (day) => {
    setSelectedDay(day);
    console.log("Selected day:", day);

    if (jwt) {
      dispatch(fetchMealsForDay(planId, day, jwt))
        .then((response) => {
          console.log("planId:", planId);
          if (response) {
            console.log("Melas",response)
            setMealsData(response); // Update state with fetched meals
          }
        })
        .catch((error) => {
          console.error('Failed to fetch meals:', error);
        });
    }
  };

  const handleAddFoodClick = (type) => {
    setMealType(type);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setFoodName('');
    setQuantity('');
    setMeasurement('');
  };

  const handleDoneClick = () => {
    // Format quantity and measurement
    const formattedQuantity = `${quantity} ${measurement}`;
  
    const mealData = {
      item: foodName,
      measurement: measurement,
      quantity: quantity,
    };
  
    console.log("Food Name:", foodName);
    console.log("Quantity:", quantity);
    console.log("Measurement:", measurement);
  
    if (jwt) {
      dispatch(addMealToDay(planId, selectedDay, mealType.toLowerCase(), mealData, jwt))
        .then(() => {
          console.log("Meal added successfully");
  
          // Fetch nutritional data for the added meal
          dispatch(fetchNutritionData(foodName, formattedQuantity, jwt))
            .then((response) => {
              // Extract nutritional values from the response
              const nutritionValues = response.nutrition[0];
              console.log("Nutrition values fetched:", nutritionValues);
              
              // Update nutrition values in the database
              dispatch(updateNutritionValues(planId, selectedDay, nutritionValues, jwt))
                .then(() => {
                  console.log("Nutrition values updated successfully");
  
                  // Fetch the updated nutrition values
                  dispatch(getNutritionValues(planId, selectedDay, jwt))
                    .then((updatedResponse) => {
                      console.log("Updated Nutrition values:", updatedResponse);
                      // Optionally handle the updated nutrition values here
                    })
                    .catch((error) => {
                      console.error('Failed to fetch updated nutrition values:', error);
                    });
  
                })
                .catch((error) => {
                  console.error('Failed to update nutrition values:', error);
                });
            })
            .catch((error) => {
              console.error('Failed to fetch nutrition data:', error);
            });
  
          // Refetch meals for the selected day to update the display
          dispatch(fetchMealsForDay(planId, selectedDay, jwt))
            .then((response) => {
              if (response) {
                console.log("Updated Meals", response);
                setMealsData(response); // Update state with fetched meals
              }
            })
            .catch((error) => {
              console.error('Failed to fetch updated meals:', error);
            });
  
          handleDialogClose(); // Close the dialog after adding the meal
        })
        .catch((error) => {
          console.error('Failed to add meal:', error);
        });
    }
  };
   
  return (
    <Box sx={{ padding: '20px' }}>
      {/* Upper Part */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
          borderRadius: '10px',
          marginBottom: '20px'
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {Array.from({ length: durationValue }, (_, index) => index + 1).map(day => (
            <Grid item key={day}>
              <Button
                variant="contained"
                onClick={() => handleDayClick(day)}
                sx={{
                  borderRadius: '50%',
                  backgroundColor: selectedDay === day ? '#A09E0E' : '#444',
                  color: selectedDay === day ? '#fff' : '#ccc',
                  width: '40px',
                  height: '40px',
                  marginBottom: '10px',
                  '&:hover': {
                    backgroundColor: selectedDay === day ? '#A09E0E' : '#555',
                  },
                }}
              >
                {day}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Lower Part */}
      <Grid container spacing={1}>
        {/* Left Hand Side Tile */}
        <Grid item xs={12} md={6}>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                {selectedDay ? `Date: ${selectedDay}` : 'Select a date'}
              </Typography>
              <Grid container spacing={2}>
                {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map(meal => (
                  <Grid item xs={12} key={meal}>
                    <Card sx={{ marginBottom: '10px' }}>
                      <CardContent>
                        <Typography variant="h6">{meal}</Typography>
                        {/* Displaying meals data */}
                        {mealsData[meal.toLowerCase() + 's'].map((food, index) => (
                          <Typography key={index} variant="body2">
                            {`${food.item} - ${food.quantity} ${food.measurement}`}
                          </Typography>
                        ))}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleAddFoodClick(meal)}
                          sx={{ marginTop: '10px' }}
                        >
                          Add Food
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Hand Side Tile */}
        <Grid item xs={12} md={5}>
          <Box sx={{ width: '100%', padding: '20px', borderRadius: '8px', height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Content for the right tile */}
          </Box>
        </Grid>
      </Grid>

      {/* Dialog Box */}
      {/* Dialog Box */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add Food Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Food Name"
            type="text"
            fullWidth
            variant="outlined"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="text"
            fullWidth
            variant="outlined"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Box sx={{ marginTop: '10px' }}>
            <Typography variant="subtitle1">Measurement</Typography>
            {['cup', 'tablespoon', 'medium', 'grams'].map(unit => (
              <FormControlLabel
                key={unit}
                control={
                  <Checkbox
                    checked={measurement === unit}
                    onChange={() => setMeasurement(unit)}
                    name="measurement"
                    color="primary"
                  />
                }
                label={unit}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDoneClick} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
     </Box>
  );
};

export default Calorytrack;
