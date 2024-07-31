import React, { useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, Button, Checkbox, Divider, TextField
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

const Completedplans = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [mealCheckboxes, setMealCheckboxes] = useState([
    { Breakfast: true, Lunch: false, Dinner: true },
    { Breakfast: false, Lunch: true, Dinner: false },
    { Breakfast: true, Lunch: false, Dinner: false },
    { Breakfast: false, Lunch: false, Dinner: true },
    { Breakfast: true, Lunch: true, Dinner: false },
    { Breakfast: false, Lunch: false, Dinner: false },
    { Breakfast: false, Lunch: true, Dinner: true },
  ]);
  const [comment, setComment] = useState("");
  const [isCommentDisabled, setIsCommentDisabled] = useState(false);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSaveComment = () => {
    console.log("Comment saved:", comment);
    // You can add logic here to save the comment to a backend or perform other actions.
    setIsCommentDisabled(true);
  };

  const calculateOverallProgress = () => {
    const totalMeals = 7 * 3;
    const completedMeals = mealCheckboxes.reduce((total, day) => {
      return total + Object.values(day).filter(Boolean).length;
    }, 0);
    return (completedMeals / totalMeals) * 100;
  };

  const progress = calculateOverallProgress();

  const pastweight = 75; // Example past weight
  const currentweight = 70; // Example current weight

  const weightDifference = pastweight - currentweight;
  const weightProgress = (weightDifference / 10) * 100;

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={-2}>
        {/* Left Hand Side Tile */}
        <Grid item xs={12} md={8}>
          <Card sx={{ width: '700px', height: 'auto', minHeight: '500px' }}>
            <CardContent>
              {initialMealPlan[selectedDay].map((meal, index) => (
                <MealCard
                  key={index}
                  meal={meal.meal}
                  food={meal.food}
                  day={selectedDay}
                  completed={mealCheckboxes[selectedDay - 1][meal.meal]}
                />
              ))}
              <TextField
                label="Comment"
                fullWidth
                margin="normal"
                type="text"
                name="comment"
                value={comment}
                onChange={handleCommentChange}
                multiline
                rows={4}
                disabled={isCommentDisabled}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveComment}
                sx={{ marginTop: '10px' }}
              >
                Save
              </Button>
            </CardContent>
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
              <Typography variant="h6">Meal Plan Adherence</Typography>
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
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2">Planned Meals</Typography>
                  <Typography variant="h6">13</Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2">Logged Meals</Typography>
                  <Typography variant="h6">21</Typography>
                </Box>
              </Box>
              <Box sx={{ marginTop: '40px' }}>
                <Typography variant="h6">Meeting Goal</Typography>
                <Box>
                <TextField
                    label="Past Weight"
                    fullWidth
                    margin="normal"
                    type="number"
                    name="past weight"
                    value={pastweight}
                    disabled
                  />
                  <TextField
                    label="Current Weight"
                    fullWidth
                    margin="normal"
                    type="number"
                    name="current weight"
                    value={currentweight}
                    disabled
                  />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%', marginTop: '30px' }}>
                  <div style={{ width: 200, height: 200 }}>
                    <CircularProgressbar
                      value={weightProgress}
                      text={`${Math.round(weightProgress)}%`}
                      styles={buildStyles({
                        pathColor: '#40F3AA',
                        textColor: '#40F3AA',
                        trailColor: '#d6d6d6'
                      })}
                    />
                  </div>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2">Achieved weight loss</Typography>
                    <Typography variant="h6">13</Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2">Target weight loss</Typography>
                    <Typography variant="h6">21</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const MealCard = ({ meal, food, day, completed }) => {
  return (
    <Card sx={{ marginTop: '20px', backgroundColor: completed ? '#88891D' : '#545453', width: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{meal}</Typography>
          <Checkbox checked={completed} disabled />
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ marginLeft: '20px' }}>{food.name} - {food.normalConsumption}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Completedplans;
