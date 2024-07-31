import React, { useState } from 'react';
import {
  Box,IconButton, Typography, Grid, Card, CardContent, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField
} from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material'; 
ChartJS.register(BarElement, CategoryScale, LinearScale);

const foodItems = [
  // Breakfast Options
  { name: 'Greek Yogurt with Berries', normalConsumption: '1 cup Greek yogurt + 1/2 cup mixed berries', calories: 180, protein: 11, fat: 0.9, carbohydrate: 13, fiber: 2, sugars: 10, sodium: 61, status: 'Not Available' },
  { name: 'Oatmeal with Banana', normalConsumption: '1 cup cooked oatmeal + 1 medium banana', calories: 259, protein: 7, fat: 3.5, carbohydrate: 54, fiber: 7, sugars: 15, sodium: 2, status: 'Available' },

  // Lunch Options
  { name: 'Grilled Chicken Salad', normalConsumption: '100g grilled chicken + 2 cups mixed greens + 1/2 cup cherry tomatoes', calories: 190, protein: 33, fat: 3.9, carbohydrate: 5, fiber: 3, sugars: 3, sodium: 89, status: 'Not Available' },
  { name: 'Quinoa and Black Bean Bowl', normalConsumption: '1 cup cooked quinoa + 1/2 cup black beans + 1/2 cup corn', calories: 413, protein: 17, fat: 5.1, carbohydrate: 76, fiber: 14, sugars: 8.2, sodium: 20, status: 'Available' },

  // Dinner Options
  { name: 'Baked Salmon with Steamed Broccoli', normalConsumption: '100g salmon + 1 cup steamed broccoli', calories: 263, protein: 24.1, fat: 14, carbohydrate: 11.2, fiber: 5.1, sugars: 2.2, sodium: 89, status: 'Not Available' },
  { name: 'Stuffed Bell Peppers', normalConsumption: '1 medium bell pepper + 1/2 cup cooked brown rice + 1/2 cup ground turkey', calories: 416, protein: 25, fat: 11.8, carbohydrate: 51.8, fiber: 5.5, sugars: 3.7, sodium: 77, status: 'Available' },
];



const initialMealPlan = {
  1: [{ meal: 'Breakfast', food: foodItems[0] }, { meal: 'Lunch', food: foodItems[1] }, { meal: 'Dinner', food: foodItems[2] }],
  2: [{ meal: 'Breakfast', food: foodItems[1] }, { meal: 'Lunch', food: foodItems[2] }, { meal: 'Dinner', food: foodItems[5] }],
  3: [{ meal: 'Breakfast', food: foodItems[2] }, { meal: 'Lunch', food: foodItems[3] }, { meal: 'Dinner', food: foodItems[0] }],
  4: [{ meal: 'Breakfast', food: foodItems[3] }, { meal: 'Lunch', food: foodItems[4] }, { meal: 'Dinner', food: foodItems[1] }],
  5: [{ meal: 'Breakfast', food: foodItems[0] }, { meal: 'Lunch', food: foodItems[5] }, { meal: 'Dinner', food: foodItems[2] }],
  6: [{ meal: 'Breakfast', food: foodItems[1] }, { meal: 'Lunch', food: foodItems[4] }, { meal: 'Dinner', food: foodItems[3] }],
  7: [{ meal: 'Breakfast', food: foodItems[2] }, { meal: 'Lunch', food: foodItems[3] }, { meal: 'Dinner', food: foodItems[5] }],
};

const Mealprogress = () => {
  const navigate = useNavigate();
  const [startDay, setStartDay] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [progress, setProgress] = useState(0);
  const [mealCompleted, setMealCompleted] = useState(new Array(7).fill(false));
  const [mealCheckboxes, setMealCheckboxes] = useState(
    new Array(7).fill(null).map(() => ({
      Breakfast: false,
      Lunch: false,
      Dinner: false,
    }))
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentWeight, setCurrentWeight] = useState('');

  const handleNextDay = () => {
    setStartDay(prevStartDay => prevStartDay + 1);
  };

  const handlePrevDay = () => {
    setStartDay(prevStartDay => Math.max(prevStartDay - 1, 1));
  };

  const handleDayClick = day => {
    setSelectedDay(day);
  };

  const handleCompleteDay = () => {
    if (selectedDay === 7) {
      setDialogOpen(true);
    } else if (!mealCompleted[selectedDay - 1]) {
      const updatedMealCompleted = [...mealCompleted];
      updatedMealCompleted[selectedDay - 1] = true;
      setMealCompleted(updatedMealCompleted);
      setProgress(updatedMealCompleted.filter(Boolean).length * (100 / 7));
    }
  };

  const handleCheckboxChange = (day, meal) => {
    const updatedMealCheckboxes = [...mealCheckboxes];
    updatedMealCheckboxes[day - 1][meal] = !updatedMealCheckboxes[day - 1][meal];
    setMealCheckboxes(updatedMealCheckboxes);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentWeight('');
  };

 

  const handleDialogSubmit = () => {
    // Handle the current weight input here (e.g., save to state or send to server)
    console.log('Current Weight:', currentWeight);
    handleDialogClose();
    navigate('/my-profile/completed'); // Navigate to the new page
  };
  const getNutritionalSummary = () => {
    const summary = initialMealPlan[selectedDay].reduce(
      (acc, { food }) => {
        acc.calories += food.calories;
        acc.protein += food.protein;
        acc.fat += food.fat;
        acc.carbohydrate += food.carbohydrate;
        return acc;
      },
      { calories: 0, protein: 0, fat: 0, carbohydrate: 0 }
    );
    return summary;
  };

  const nutritionalSummary = getNutritionalSummary();

  const chartData = {
    labels: ['Calories', 'Protein', 'Fat', 'Carbohydrate'],
    datasets: [
      {
        label: 'Nutritional Value',
        data: [nutritionalSummary.calories, nutritionalSummary.protein, nutritionalSummary.fat, nutritionalSummary.carbohydrate],
        backgroundColor: ['#77E4C8', '#36C2CE', '#478CCF', '#4535C1']
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Upper Part */}
     
      {/* Lower Part */}
    
  {/* Left Hand Side Tile */}
  <Grid container spacing={-2}>
  {/* Left Hand Side Tile */}
  <Grid item xs={12} md={8}>
    <Card sx={{ width: '700px', height: '500px', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1, overflow: 'auto' }}>
        {initialMealPlan[selectedDay].map((meal, index) => (
          <MealCard
            key={index}
            meal={meal.meal}
            food={meal.food}
            day={selectedDay}
            completed={mealCheckboxes[selectedDay - 1][meal.meal]}
            handleCheckboxChange={handleCheckboxChange}
            
          />
        ))}
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
        <Button
          variant='contained'
          onClick={handleCompleteDay}
        >
          Completed
        </Button>
      </Box>
    </Card>
  </Grid>


        {/* Right Hand Side Tile */}
        <Grid item xs={12} md={4} sx={{ paddingRight: '50px' }}>
          <Card sx={{ width: '100%', height: '100%' }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid #d6d6d6',
                  padding: '10px',
                  borderRadius: '10px',
                  marginBottom: '20px'
                }}
              >
                <Grid container spacing={2} justifyContent="center">
                  {[1, 2, 3, 4, 5, 6, 7].map(day => (
                    <Grid item xs={3} key={day}>
                      <Button
                        variant="outlined"
                        onClick={() => handleDayClick(day)}
                        sx={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: selectedDay === day ? '#A09E0E' : 'transparent',
                          borderColor: selectedDay === day ? 'default' : 'default',
                          color: selectedDay === day ? '#fff' : 'default',
                          '&:hover': {
                            backgroundColor: selectedDay === day ? '#A09E0E' : 'transparent',
                            borderColor: selectedDay === day ? 'default' : 'default',
                          },
                        }}
                      >
                        {day}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Typography variant="h6">Your Progress</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%', marginTop: '30px' }}>
                <div style={{ width: 200, height: 200 }}>
                  <CircularProgressbar
                    value={progress}
                    text={`${Math.round(progress)}%`}
                    styles={buildStyles({
                      pathColor: '#40F3AA',
                      textColor: '#40F3AA',
                      trailColor: '#d6d6d6'
                    })}
                  />
                </div>
              </Box>
              <Box sx={{ marginTop: '40px' }}>
                <Typography variant="h6">Nutritional Summary</Typography>
                <Bar
                  data={chartData}
                  options={chartOptions}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
  <DialogTitle>Enter Current Weight</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Please enter your current weight.
    </DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      label="Current Weight"
      type="number"
      fullWidth
      variant="standard"
      value={currentWeight}
      onChange={(e) => setCurrentWeight(e.target.value)}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleDialogClose}>Cancel</Button>
    <Button onClick={handleDialogSubmit}>Submit</Button>
  </DialogActions>
</Dialog>

    </Box>
  );
};

const MealCard = ({ meal, food, day, completed, handleCheckboxChange }) => {
  return (
    <Card sx={{
      marginTop: '10px',
      backgroundColor: completed ? '#88891D' : '#545453',
      height: '120px',  // Adjust height for smaller card
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <CardContent sx={{ paddingBottom: '40px' }}> {/* Add padding at the bottom to avoid overlap */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" sx={{ fontSize: '0.9rem' }}>{meal}</Typography> {/* Adjust font size */}
          <Checkbox checked={completed} onChange={() => handleCheckboxChange(day, meal)} />
        </Box>
        <Box display="flex" alignItems="center" sx={{ marginTop: '8px' }}>
          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{food.name} - {food.normalConsumption}</Typography> {/* Adjust font size */}
        </Box>
        {/* Show "Order Now" Button only if status is "Available" */}
        {food.status === 'Available' && (
          <Button
            variant="contained"
            color="primary"
            sx={{
              position: 'absolute',
              bottom: '8px',  // Adjusted for smaller button space
              right: '8px',   // Adjusted for smaller button space
              borderRadius: '50%',
              minWidth: '40px',
              height: '40px',
              padding: '4px',  // Adjust padding for smaller button
              fontSize: '0.7rem',  // Adjust font size for smaller button
            }}
            onClick={() => alert(`Order ${food.name}`)}
          >
            <ShoppingCartIcon sx={{ fontSize: '20px' }} /> {/* Adjust icon size */}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};


export default Mealprogress;
 