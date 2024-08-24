import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, Button, TextField
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPlanData, updatePlanStatus } from '../State/Plan/Action'; // Import action creators
import { setBreakfast as saveBreakfast, setLunch as saveLunch, setDinner as saveDinner } from '../State/Plan/Action';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';

const Plangeneration = () => {
  const dispatch = useDispatch();
  const { planId } = useParams();
  const { duration } = useParams();
  const { status } = useParams();
  const token = localStorage.getItem('jwt');
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(1);

  // Fetching planData from Redux store
  const planData = useSelector(state => state.plan.planData[selectedDate]) || {};

  // Local state for editable fields
  const [breakfast, setBreakfast] = useState(planData.breakfast || '');
  const [lunch, setLunch] = useState(planData.lunch || '');
  const [dinner, setDinner] = useState(planData.dinner || '');

  // Duration state with default value
  

  useEffect(() => {
    console.log('Plan Data for Selected Date:', planData);
  }, [planData]);

  useEffect(() => {
    dispatch(getPlanData(planId, selectedDate, token));
  }, [selectedDate, dispatch, planId, token]);

  useEffect(() => {
    setBreakfast(planData.breakfast || '');
    setLunch(planData.lunch || '');
    setDinner(planData.dinner || '');
  }, [planData]);

  const handleDateClick = (day) => {
    console.log('Date clicked:', day);
    setSelectedDate(day);
  };

  const handleSave = (mealType) => {
    const reqData = {
      daysId: selectedDate,
      mealValue: mealType === 'Breakfast' ? breakfast : mealType === 'Lunch' ? lunch : dinner,
      token,
    };
  
    switch (mealType) {
      case 'Breakfast':
        dispatch(saveBreakfast(planId, reqData));
        break;
      case 'Lunch':
        dispatch(saveLunch(planId, reqData));
        break;
      case 'Dinner':
        dispatch(saveDinner(planId, reqData));
        break;
      default:
        console.error('Unknown meal type:', mealType);
    }
  
    console.log(`Saving ${mealType} for Day ${selectedDate}`);
  };

  // Function to handle publish plan
  const handlePublish = () => {
    dispatch(updatePlanStatus(planId, "Completed", token, navigate))

      .then(() => {
        console.log("Plan published successfully");
        // You can add navigation or any other actions after publishing here
      })
      .catch(error => {
        console.error("Error publishing plan:", error);
      });
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={1}>
        {/* Left Hand Side Tile */}
        <Grid item xs={12} md={7}>
          <Card sx={{ width: '80%' }}>
            <CardContent>
              <Typography variant="h6">Meals for Day {selectedDate}</Typography>
              <Box sx={{ marginTop: '20px' }}>
                <Typography variant="subtitle1">Breakfast</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  value={breakfast}
                  placeholder="Enter breakfast details"
                  onChange={(e) => setBreakfast(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSave('Breakfast')}
                  sx={{ marginTop: '10px' }}
                >
                  Save 
                </Button>
              </Box>
              <Box sx={{ marginTop: '20px' }}>
                <Typography variant="subtitle1">Lunch</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  value={lunch}
                  placeholder="Enter lunch details"
                  onChange={(e) => setLunch(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSave('Lunch')}
                  sx={{ marginTop: '10px' }}
                >
                  Save 
                </Button>
              </Box>
              <Box sx={{ marginTop: '20px' }}>
                <Typography variant="subtitle1">Dinner</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  value={dinner}
                  placeholder="Enter dinner details"
                  onChange={(e) => setDinner(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSave('Dinner')}
                  sx={{ marginTop: '10px' }}
                >
                  Save 
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Hand Side Tile */}
        <Grid item xs={12} md={5}>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              <Box sx={{ border: '1px solid gray', borderRadius: '8px', padding: '16px', marginTop: '20px' }}>
                <Typography variant="h6">Plan Duration</Typography>
                <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                  {Array.from({ length: duration }, (_, index) => index + 1).map(day => (
                    <Grid item xs={3} key={day}>
                      <Button
                        variant="outlined"
                        sx={{
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          minWidth: '40px',
                          backgroundColor: selectedDate === day ? 'primary.main' : 'transparent',
                          color: selectedDate === day ? 'white' : 'text.primary',
                          border: '1px solid gray'
                        }}
                        onClick={() => handleDateClick(day)}
                      >
                        {day}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              {/* Publish Plan Button */}
             {status!=="followed" &&(
              <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handlePublish}
                >
                  Publish Plan
                </Button>
              </Box>
             )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Plangeneration;
