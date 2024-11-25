import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  styled
} from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts'; // Import Recharts components
import { useDispatch, useSelector } from 'react-redux';
import {
  createOrUpdateMeallog,
  getMealsByDate,
  addMealToLog,
  updateNutritionValues,
  getNutritionValues,
  getMeallogStatusByDate
} from '../State/Meallog/Action'; // Import fetchNutritionData
import { fetchNutritionData } from '../State/Bmi/Action'; // Import fetchNutritionData
import { format } from 'date-fns';

// Styled Calendar Component
const StyledCalendar = styled(Calendar)(({ theme }) => ({
  '.react-calendar': {
    backgroundColor: 'black',
    color: 'white',
  },
  '.react-calendar__tile': {
    backgroundColor: 'black',
    color: 'white',
  },
  '.react-calendar__tile:hover': {
    backgroundColor: '#333',
  },
  '.react-calendar__month-view__weekdays': {
    backgroundColor: 'black',
    color: 'white',
  },
  '.react-calendar__navigation': {
    backgroundColor: 'black',
    color: 'white',
  },
  '.react-calendar__tile--now': {
    backgroundColor: 'yellow',
    color: 'black',
    borderRadius: '50%',
    border: 'none',
  }
}));

const Meallog = () => {
  const [date, setDate] = useState(new Date());
  const [mealsData, setMealsData] = useState({ breakfast: [], lunch: [], dinner: [], snack: [] });
  const [openDialog, setOpenDialog] = useState(false);
  const [mealType, setMealType] = useState('');
  const [foodItem, setFoodItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [measurement, setMeasurement] = useState('Cup');
  const [foodPreparationStatus, setFoodPreparationStatus] = useState('cooked');
  const [consumeCalories, setConsumeCalories] = useState(0);
  const [consumeProteins, setConsumeProteins] = useState(0);
  const [consumeFat, setConsumeFat] = useState(0);
  const [consumeSugars, setConsumeSugars] = useState(0);
  const [consumeFiber, setConsumeFiber] = useState(0);
  const [consumeSodium, setConsumeSodium] = useState(0);
  const [consumeCarbohydrates, setConsumeCarbohydrates] = useState(0);
  const [meallogStatus, setMeallogStatus] = useState(null);

  const dispatch = useDispatch();
  const token = localStorage.getItem('jwt');

  const COLORS = ['#61f4de', '#577590', '#90be6d', '#68b6ef', '#6aa1f4', '#43AA8B', '#6e78ff'];

  const pieChartData = [
    { name: 'Calories', value: consumeCalories },
    { name: 'Proteins', value: consumeProteins },
    { name: 'Fat', value: consumeFat },
    { name: 'Sugars', value: consumeSugars },
    { name: 'Fiber', value: consumeFiber },
    { name: 'Sodium', value: consumeSodium },
    { name: 'Carbohydrates', value: consumeCarbohydrates }
  ];

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const formattedDate = format(date, 'yyyy-MM-dd');
  
        // Fetch meals
        const mealsData = await dispatch(getMealsByDate(formattedDate, token));
        setMealsData(mealsData || { breakfast: [], lunch: [], dinner: [], snack: [] });
  
        // Fetch meallog status
        const meallogStatusData = await dispatch(getMeallogStatusByDate(formattedDate, token));
        setMeallogStatus(meallogStatusData); // Assuming `data` contains a `status` field
  
        if (meallogStatusData === 'set') {
          // Fetch nutrition values if status is 'set'
          dispatch(getNutritionValues(formattedDate, token))
            .then((updatedResponse) => {
              console.log("Updated Nutrition values:", updatedResponse);
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
              // Set nutritional values to 0 on error
              setConsumeCalories(0);
              setConsumeCarbohydrates(0);
              setConsumeFat(0);
              setConsumeFiber(0);
              setConsumeProteins(0);
              setConsumeSodium(0);
              setConsumeSugars(0);
            });
        } else {
          // Set nutritional values to 0 if status is not 'set'
          setConsumeCalories(0);
          setConsumeCarbohydrates(0);
          setConsumeFat(0);
          setConsumeFiber(0);
          setConsumeProteins(0);
          setConsumeSodium(0);
          setConsumeSugars(0);
        }
      } catch (error) {
        console.error('Failed to fetch meals or meallog status:', error);
        // Set nutritional values to 0 on error
        setConsumeCalories(0);
        setConsumeCarbohydrates(0);
        setConsumeFat(0);
        setConsumeFiber(0);
        setConsumeProteins(0);
        setConsumeSodium(0);
        setConsumeSugars(0);
      }
    };
  
    fetchMeals();
  }, [date, dispatch, token]);
  
  const handleDateChange = async (selectedDate) => {
    setDate(selectedDate);
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const data = await dispatch(getMeallogStatusByDate(formattedDate, token));
    setMeallogStatus(data); // Assuming `data` contains a `status` field
  };
  

  const handleLogFoodClick = () => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    dispatch(createOrUpdateMeallog(formattedDate, token));
  };

  const handleOpenDialog = (mealType) => {
    setMealType(mealType);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFoodItem('');
    setQuantity('');
    setMeasurement('Cup');
    setFoodPreparationStatus('cooked');
  };

  const handleAddFood = () => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const formattedQuantity = `${quantity} ${measurement}`;

    if (token) {
      dispatch(addMealToLog(formattedDate, mealType, foodItem, measurement, quantity, token))
        .then(() => {
          console.log("Meal added successfully");

          dispatch(fetchNutritionData(foodItem, formattedQuantity, token, foodPreparationStatus))
            .then((response) => {
              const nutritionValues = response.nutrition[0];
              console.log("Nutrition values fetched:", nutritionValues);

              dispatch(updateNutritionValues(formattedDate, nutritionValues, token))
                .then(() => {
                  console.log("Nutrition values updated successfully");

                  dispatch(getNutritionValues(formattedDate, token))
                    .then((updatedResponse) => {
                      console.log("Updated Nutrition values:", updatedResponse);
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

                })
                .catch((error) => {
                  console.error('Failed to update nutrition values:', error);
                });
            })
            .catch((error) => {
              console.error('Failed to fetch nutrition data:', error);
            });

          dispatch(getMealsByDate(formattedDate, token))
            .then((response) => {
              if (response) {
                console.log("Updated Meals", response);
                setMealsData(response);
              }
            })
            .catch((error) => {
              console.error('Failed to fetch updated meals:', error);
            });

          handleCloseDialog();
        })
        .catch((error) => {
          console.error('Failed to add meal:', error);
        });
    }
  };

  const displayDate = date.toDateString();

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Upper Part */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <Typography variant="h4">Daily Food Log</Typography>
        <Typography variant="body1">Plan or log what you eat.</Typography>
      </Box>

      {/* Lower Part */}
      <Grid container spacing={2}>
        {/* Left Hand Side Tile */}
        <Grid item xs={12} md={7}>
          <Box sx={{ padding: '10px' }}>
            {/* Display the selected date */}
            <Typography variant="h6" sx={{ marginBottom: '20px' }}>
             {displayDate}
            </Typography>
            <Grid container spacing={2} direction="column">
              {/* Breakfast Card */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Breakfast</Typography>
                    {mealsData.breakfast.length > 0 ? (
                      mealsData.breakfast.map((meal) => (
                        <Typography key={meal.breakfastId}>
                          {meal.item} - {meal.quantity} {meal.measurement}
                        </Typography>
                      ))
                    ) : (
                      <Typography>No breakfast items</Typography>
                    )}
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog('breakfast')}>Add Food</Button>
                  </CardContent>
                </Card>
              </Grid>

              {/* Lunch Card */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Lunch</Typography>
                    {mealsData.lunch.length > 0 ? (
                      mealsData.lunch.map((meal) => (
                        <Typography key={meal.id}>
                          {meal.item} - {meal.quantity} {meal.measurement}
                        </Typography>
                      ))
                    ) : (
                      <Typography>No lunch items</Typography>
                    )}
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog('lunch')}>Add Food</Button>
                  </CardContent>
                </Card>
              </Grid>

              {/* Dinner Card */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Dinner</Typography>
                    {mealsData.dinner.length > 0 ? (
                      mealsData.dinner.map((meal) => (
                        <Typography key={meal.id}>
                          {meal.item} - {meal.quantity} {meal.measurement}
                        </Typography>
                      ))
                    ) : (
                      <Typography>No dinner items</Typography>
                    )}
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog('dinner')}>Add Food</Button>
                  </CardContent>
                </Card>
              </Grid>

              {/* Snack Card */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Snack</Typography>
                    {mealsData.snack.length > 0 ? (
                      mealsData.snack.map((meal) => (
                        <Typography key={meal.id}>
                          {meal.item} - {meal.quantity} {meal.measurement}
                        </Typography>
                      ))
                    ) : (
                      <Typography>No snacks</Typography>
                    )}
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog('snack')}>Add Food</Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Right Hand Side Tile */}
        <Grid item xs={12} md={5}>
          <Box sx={{ padding: '10px' }}>
            <StyledCalendar value={date} onChange={handleDateChange} />
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginTop: '10px' }}
              onClick={handleLogFoodClick}
              style={{ display: meallogStatus === 'set' ? 'none' : 'block' }} // Conditional display
            >
              LOG OUT
            </Button>


            {/* Pie Chart Section */}
            <PieChart width={400} height={300} style={{ marginTop: '20px' }}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
            </PieChart>
          </Box>
        </Grid>
      </Grid>

      {/* Dialog for Adding Food */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Food</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details of the food item.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Food Item"
            type="text"
            fullWidth
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Select
            fullWidth
            value={measurement}
            onChange={(e) => setMeasurement(e.target.value)}
          >
            <MenuItem value="Cup">Cup</MenuItem>
            <MenuItem value="Tablespoon">Tablespoon</MenuItem>
            <MenuItem value="Gram">Gram</MenuItem>
            {/* Add more measurement units as needed */}
          </Select>
          <Select
            fullWidth
            value={foodPreparationStatus}
            onChange={(e) => setFoodPreparationStatus(e.target.value)}
          >
            <MenuItem value="cooked">cooked</MenuItem>
            <MenuItem value="raw">uncooked</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddFood} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Meallog;
