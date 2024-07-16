import React, { useState } from 'react';
import {
  Box, Typography, IconButton, Grid, Card, CardContent, Button, Checkbox
} from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const foodItems = [
  { name: 'Rice', normalConsumption: '100g', calories: 130, protein: 2.7, fat: 0.3, carbohydrate: 28.7, fiber: 0.4, sugars: 0.1, sodium: 1 },
  { name: 'Roti', normalConsumption: '1 piece', calories: 70, protein: 2.6, fat: 0.8, carbohydrate: 13.6, fiber: 0.9, sugars: 0.1, sodium: 75 },
  { name: 'Radish', normalConsumption: '100g', calories: 16, protein: 0.6, fat: 0.1, carbohydrate: 3.4, fiber: 1.6, sugars: 1.9, sodium: 39 },
  { name: 'Raspberry', normalConsumption: '100g', calories: 52, protein: 1.2, fat: 0.7, carbohydrate: 11.9, fiber: 6.5, sugars: 4.4, sodium: 1 },
];

const initialMealPlan = {
  1: [{ meal: 'Breakfast', food: foodItems[0] }, { meal: 'Lunch', food: foodItems[1] }, { meal: 'Dinner', food: foodItems[2] }],
  2: [{ meal: 'Breakfast', food: foodItems[1] }, { meal: 'Lunch', food: foodItems[2] }, { meal: 'Dinner', food: foodItems[3] }],
  3: [{ meal: 'Breakfast', food: foodItems[2] }, { meal: 'Lunch', food: foodItems[3] }, { meal: 'Dinner', food: foodItems[0] }],
  4: [{ meal: 'Breakfast', food: foodItems[3] }, { meal: 'Lunch', food: foodItems[0] }, { meal: 'Dinner', food: foodItems[1] }],
  5: [{ meal: 'Breakfast', food: foodItems[0] }, { meal: 'Lunch', food: foodItems[1] }, { meal: 'Dinner', food: foodItems[2] }],
  6: [{ meal: 'Breakfast', food: foodItems[1] }, { meal: 'Lunch', food: foodItems[2] }, { meal: 'Dinner', food: foodItems[3] }],
  7: [{ meal: 'Breakfast', food: foodItems[2] }, { meal: 'Lunch', food: foodItems[3] }, { meal: 'Dinner', food: foodItems[0] }],
};

const Mealprogress = () => {
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
    if (!mealCompleted[selectedDay - 1]) {
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

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginTop: '30px',
            justifyContent: 'center',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            padding: '10px 0',
            height: '80px',
            border: '1px solid #88891D',
            borderRadius: '8px'
          }}
        >
          <IconButton onClick={handlePrevDay}>
            <Typography variant="h6">{"<"}</Typography>
          </IconButton>
          {[...Array(7)].map((_, index) => (
            <Button
              key={index}
              variant={startDay + index === selectedDay ? 'contained' : 'outlined'}
              onClick={() => handleDayClick(startDay + index)}
              sx={{
                borderRadius: '50%',
                minWidth: '50px',
                height: '50px',
                margin: '0 10px',
                width: '100%'
              }}
            >
              {startDay + index}
            </Button>
          ))}
          <IconButton onClick={handleNextDay}>
            <Typography variant="h6">{">"}</Typography>
          </IconButton>
        </Box>
      </Box>

      {/* Lower Part */}
      <Grid container spacing={-2}>
        {/* Left Hand Side Tile */}
        <Grid item xs={12} md={8}>
          <Card sx={{ width: '700px', height: '500px' }}>
            <CardContent>
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
            <Button
              variant='contained'
              onClick={handleCompleteDay}
              sx={{
                marginLeft: '550px',
                marginTop: '30px'
              }}
            >
              completed
            </Button>
          </Card>
        </Grid>

        {/* Right Hand Side Tile */}
        <Grid item xs={12 } md={4} sx={{ paddingRight: '50px' }}>
          <Card sx={{ width: '100%', height: '100%' }}>
            <CardContent>
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
                <Typography variant="h6" >Nutritional Summary</Typography>
                <Bar
                  data={chartData}
                  options={chartOptions}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const MealCard = ({ meal, food, day, completed, handleCheckboxChange }) => {
  return (
    <Card sx={{ marginTop: '20px', backgroundColor: completed ? '#88891D' : '#545453', width: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{meal}</Typography>
          <Checkbox checked={completed} onChange={() => handleCheckboxChange(day, meal)} />
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ marginLeft: '20px' }}> {food.name} - {food.normalConsumption}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Mealprogress;
