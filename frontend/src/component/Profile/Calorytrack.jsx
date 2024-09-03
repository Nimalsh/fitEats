import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControlLabel, Checkbox, LinearProgress,FormControl,FormLabel,Radio,RadioGroup } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateWeightAndHeight, fetchMealsForDay, addMealToDay, fetchNutritionData, updateNutritionValues, getNutritionValues, fetchBmiplanByPlanId } from '../State/Bmi/Action';

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
  const [calories, setCalories] = useState(0);
  const [carbohydrates, setCarbohydrates] = useState(0);
  const [fat, setFat] = useState(0);
  const [sodium, setSodium] = useState(0);
  const [fiber, setFiber] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [protein, setProtein] = useState(0);

  const [consumeCalories, setConsumeCalories] = useState(0);
  const [consumeProteins, setConsumeProteins] = useState(0);
  const [consumeFat, setConsumeFat] = useState(0);
  const [consumeSugars, setConsumeSugars] = useState(0);
  const [consumeFiber, setConsumeFiber] = useState(0);
  const [consumeSodium, setConsumeSodium] = useState(0);
  const [consumeCarbohydrates, setConsumeCarbohydrates] = useState(0);
  const [buttonColors, setButtonColors] = useState({});
  const [openFinishDialog, setOpenFinishDialog] = useState(false);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [bmiCondition, setBmiCondition] = useState('');
  const [foodPreparationStatus, setFoodPreparationStatus] = useState('');


  const handleCalculateBMI = () => {
    const heightInMeters = height / 100; // Convert height from cm to meters
    const bmiValue = weight / (heightInMeters * heightInMeters); // BMI formula
    setBmi(bmiValue.toFixed(1)); // Set BMI state to formatted value

    // Determine BMI condition and provide specific messages
    let condition = '';
    if (bmiValue < 18.5) {
      condition = 'Underweight  Let\'s try again, you need a balanced diet!';
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      condition = 'Healthy weight Good to go! No restriction for high calories any more.';
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      condition = 'Overweight Let\'s try again, focus on healthy eating and exercise.';
    } else {
      condition = 'Obese  Let\'s try again, consider a healthier lifestyle!';
    }

    setBmiCondition(condition); // Set BMI condition state
  };

  const handleSet = () => {
    dispatch(updateWeightAndHeight(jwt, weight, height, planId));
    setOpenFinishDialog(false); // Close the dialog after dispatching
  };

  const calculatePercentage = (consumed, total) => {
    return total > 0 ? (consumed / total) * 100 : 0;
  };

  const getBarColor = (consumed, total) => {
    return consumed > total ? 'error' : 'primary';
  };

  const dispatch = useDispatch();
  const durationValue = parseInt(duration, 10);
  const jwt = localStorage.getItem('jwt');

  const handleDayClick = (day) => {
    setSelectedDay(day);
    console.log("Selected day:", day);

    if (jwt) {
      // Fetch meals for the selected day
      dispatch(fetchMealsForDay(planId, day, jwt))
        .then((response) => {
          console.log("planId:", planId);
          if (response) {
            console.log("Meals", response);
            setMealsData(response); // Update state with fetched meals
          }
        })
        .catch((error) => {
          console.error('Failed to fetch meals:', error);
        });

      // Fetch nutrition values for the selected day
      dispatch(getNutritionValues(planId, day, jwt))
        .then((updatedResponse) => {
          console.log("Updated Nutrition values:", updatedResponse);

          // Update consumed nutrition values
          setConsumeCalories(updatedResponse.calories);
          setConsumeCarbohydrates(updatedResponse.carbohydrates);
          setConsumeFat(updatedResponse.fat);
          setConsumeFiber(updatedResponse.fiber);
          setConsumeProteins(updatedResponse.protein);
          setConsumeSodium(updatedResponse.sodium);
          setConsumeSugars(updatedResponse.sugars);

          // Determine button color based on consumed calories
          setButtonColors(prevColors => ({
            ...prevColors,
            [day]: updatedResponse.calories === 0 ? 'transparent' :
              updatedResponse.calories < calories ? 'success' : 'error'
          }));
        })
        .catch((error) => {
          console.error('Failed to fetch updated nutrition values:', error);
        });


    }
  };

  useEffect(() => {
    if (jwt) {
      dispatch(fetchBmiplanByPlanId(planId, jwt))
        .then((data) => {
          console.log("Fetching:", data); // Log the response data

          if (data) {
            const { calories, carbohydrates, fat, sodium, fiber, sugar, protein } = data; // Adjust if data structure differs

            setCalories(calories);
            setCarbohydrates(carbohydrates);
            setFat(fat);
            setSodium(sodium);
            setFiber(fiber);
            setSugar(sugar);
            setProtein(protein);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch BMI plan:', error);
        });

      // Fetch nutrition values for each day and set button colors
      const fetchAllNutritionValues = async () => {
        const colors = {};
        for (let day = 1; day <= durationValue; day++) {
          try {
            const response = await dispatch(getNutritionValues(planId, day, jwt));
            if (response.calories === 0) {
              colors[day] = 'transparent';
            } else {
              colors[day] = response.calories < calories ? 'success' : 'error';
            }
          } catch (error) {
            console.error(`Failed to fetch nutrition values for day ${day}:`, error);
            colors[day] = 'default'; // Set default color if error occurs
          }
        }
        setButtonColors(colors);
      };

      fetchAllNutritionValues();

      dispatch(fetchMealsForDay(planId, 1, jwt))
        .then((response) => {
          if (response) {
            console.log("Meals for day 1:", response);
            setMealsData(response); // Update state with fetched meals
          }
        })
        .catch((error) => {
          console.error('Failed to fetch meals:', error);
        });

      dispatch(getNutritionValues(planId, 1, jwt))
        .then((updatedResponse) => {

          // Update consumed nutrition values
          setConsumeCalories(updatedResponse.calories);
          setConsumeCarbohydrates(updatedResponse.carbohydrates);
          setConsumeFat(updatedResponse.fat);
          setConsumeFiber(updatedResponse.fiber);
          setConsumeProteins(updatedResponse.protein);
          setConsumeSodium(updatedResponse.sodium);
          setConsumeSugars(updatedResponse.sugars);

        })
        .catch((error) => {
          console.error('Failed to fetch updated nutrition values:', error);
        });

    }
  }, [dispatch, jwt, planId, durationValue, calories]);

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
  
    if (jwt) {
      dispatch(addMealToDay(planId, selectedDay, mealType.toLowerCase(), mealData, jwt))
        .then(() => {
          console.log("Meal added successfully");
  
          // Fetch nutritional data for the added meal
          dispatch(fetchNutritionData(foodName, formattedQuantity, jwt, foodPreparationStatus))
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
                      setConsumeCalories(updatedResponse.calories);
                      setConsumeCarbohydrates(updatedResponse.carbohydrates);
                      setConsumeFat(updatedResponse.fat);
                      setConsumeFiber(updatedResponse.fiber);
                      setConsumeProteins(updatedResponse.protein);
                      setConsumeSodium(updatedResponse.sodium);
                      setConsumeSugars(updatedResponse.sugars);

                      setButtonColors(prevColors => ({
                        ...prevColors,
                        [selectedDay]: updatedResponse.calories < calories ? 'success' : 'error'
                      }));

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
                  backgroundColor: buttonColors[day] === 'transparent' ? 'transparent' :
                    buttonColors[day] === 'success' ? 'green' :
                      buttonColors[day] === 'error' ? 'red' : '#444',
                  color: buttonColors[day] === 'white' ? 'white' :
                    selectedDay === day ? '#fff' : '#ccc',
                  border: buttonColors[day] === 'transparent' ? '1px solid #ccc' : 'none',
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
          <Box sx={{ marginLeft: '20px', marginTop: '17px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenFinishDialog(true)}>
              Finish
            </Button>
          </Box>
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
            <Box sx={{ marginBottom: '10px' }}>
              <Typography variant="body1">Calories:</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <Typography variant="body1">{consumeCalories.toFixed(2)} Kcal</Typography>
                <Typography variant="body1">{calories.toFixed(2)} Kcal</Typography>
              </Box>


              <LinearProgress
                variant="determinate"
                value={calculatePercentage(consumeCalories, calories)}
                color={getBarColor(consumeCalories, calories)}
              />
            </Box>

            <Box sx={{ marginBottom: '10px' }}>

              <Typography variant="body1">Proteins:</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <Typography variant="body1">{consumeProteins.toFixed(2)}g</Typography>
                <Typography variant="body1">{protein.toFixed(2)}g</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={calculatePercentage(consumeProteins, protein)}
                color={getBarColor(consumeProteins, protein)}
              />
            </Box>

            <Box sx={{ marginBottom: '10px' }}>
              <Typography variant="body1">Carbohydrates:</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <Typography variant="body1">{consumeCarbohydrates.toFixed(2)}g</Typography>
                <Typography variant="body1">{carbohydrates.toFixed(2)}g</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={calculatePercentage(consumeCarbohydrates, carbohydrates)}
                color={getBarColor(consumeCarbohydrates, carbohydrates)}
              />
            </Box>

            <Box sx={{ marginBottom: '10px' }}>
              <Typography variant="body1">Fat:</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <Typography variant="body1">{consumeFat.toFixed(2)}g</Typography>
                <Typography variant="body1">{fat.toFixed(2)}g</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={calculatePercentage(consumeFat, fat)}
                color={getBarColor(consumeFat, fat)}
              />
            </Box>

            <Box sx={{ marginBottom: '10px' }}>
              <Typography variant="body1">Sugars:</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <Typography variant="body1">{consumeSugars.toFixed(2)}g</Typography>
                <Typography variant="body1">{sugar.toFixed(2)}g</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={calculatePercentage(consumeSugars, sugar)}
                color={getBarColor(consumeSugars, sugar)}
              />
            </Box>

            <Box sx={{ marginBottom: '10px' }}>
              <Typography variant="body1">Fiber:</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <Typography variant="body1">{consumeFiber.toFixed(2)}g</Typography>
                <Typography variant="body1">{fiber.toFixed(2)}g</Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={calculatePercentage(consumeFiber, fiber)}
                color={getBarColor(consumeFiber, fiber)}
              />

            </Box>

            <Box sx={{ marginBottom: '10px' }}>
              <Typography variant="body1">Sodium :</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <Typography variant="body1">{consumeSodium.toFixed(2)}g</Typography>
                <Typography variant="body1">{sodium.toFixed(2)}g</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={calculatePercentage(consumeSodium, sodium)}
                color={getBarColor(consumeSodium, sodium)}
              />
            </Box>

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
    <Box sx={{ marginTop: '20px' }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Food Preparation Status</FormLabel>
        <RadioGroup
          row
          aria-label="foodPreparationStatus"
          name="foodPreparationStatus"
          value={foodPreparationStatus}
          onChange={(e) => setFoodPreparationStatus(e.target.value)}
        >
          <FormControlLabel
            value="cooked"
            control={<Radio color="primary" />}
            label="Cooked"
          />
          <FormControlLabel
            value="uncooked"
            control={<Radio color="primary" />}
            label="Uncooked"
          />
        </RadioGroup>
      </FormControl>
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

      <Dialog open={openFinishDialog} onClose={() => setOpenFinishDialog(false)}>
        <DialogTitle>Finish and Calculate BMI</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Height (cm)"
            type="number"
            fullWidth
            variant="outlined"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Weight (kg)"
            type="number"
            fullWidth
            variant="outlined"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <TextField
            margin="dense"
            label="BMI"
            type="text"
            fullWidth
            variant="outlined"
            value={bmi}
            InputProps={{ readOnly: true }}
          />
          <Typography variant="subtitle1" sx={{ marginTop: '10px' }}>
            {bmiCondition}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCalculateBMI} color="primary">
            Calculate
          </Button>
          <Button onClick={handleSet} color="primary">
            Set
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default Calorytrack;
