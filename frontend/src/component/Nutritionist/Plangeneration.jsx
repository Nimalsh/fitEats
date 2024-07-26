import React, { useState } from 'react';
import {
  Box, Typography, IconButton, Grid, Card, CardContent, Button, TextField
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Plangeneration = () => {
  const [startDay, setStartDay] = useState(1);
  const [selectedDate, setSelectedDate] = useState(startDay);
  const [editableStates, setEditableStates] = useState({
    Breakfast: false,
    Lunch: false,
    Dinner: false,
    Snacks: false
  });
  const [mealPlans, setMealPlans] = useState({});
  const [mealInputs, setMealInputs] = useState({
    Breakfast: '',
    Lunch: '',
    Dinner: '',
    Snacks: ''
  });

  const handleNextDay = () => {
    setStartDay(prevStartDay => prevStartDay + 1);
  };

  const handlePrevDay = () => {
    setStartDay(prevStartDay => Math.max(prevStartDay - 1, 1));
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    if (mealPlans[day]) {
      setMealInputs(mealPlans[day]);
    } else {
      setMealInputs({
        Breakfast: '',
        Lunch: '',
        Dinner: '',
        Snacks: ''
      });
    }
  };

  const handleAddFoodClick = (meal) => {
    setEditableStates(prevState => ({
      ...prevState,
      [meal]: !prevState[meal]
    }));
  };

  const handleInputChange = (meal, value) => {
    setMealInputs(prevState => ({
      ...prevState,
      [meal]: value
    }));
  };

  const handleSaveClick = (meal) => {
    setEditableStates(prevState => ({
      ...prevState,
      [meal]: false
    }));
    setMealPlans(prevPlans => ({
      ...prevPlans,
      [selectedDate]: {
        ...prevPlans[selectedDate],
        [meal]: mealInputs[meal]
      }
    }));
  };

  const formatDate = (day) => {
    const date = new Date();
    date.setDate(date.getDate() + (day - 1));
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
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
          {[...Array(7)].map((_, index) => {
            const day = startDay + index;
            return (
              <Button
                key={index}
                variant={day === selectedDate ? 'contained' : 'outlined'}
                onClick={() => handleDateClick(day)}
                sx={{
                  borderRadius: '50%',
                  minWidth: '50px',
                  height: '50px',
                  margin: '0 10px',
                  width: '100%'
                }}
              >
                {day}
              </Button>
            );
          })}
          <IconButton onClick={handleNextDay}>
            <Typography variant="h6">{">"}</Typography>
          </IconButton>
          <IconButton sx={{ ml: 5 }}>
            <CalendarTodayIcon />
          </IconButton>
          
        </Box>
        <Button
        variant="contained"
        sx={{ marginTop: '20px' }} >
            Publish the plan
        </Button>
       
      </Box>

      {/* Lower Part */}
      <Grid container spacing={2}>
        {/* Left Hand Side Tile */}
        <Grid item xs={12} md={8}>
          <Card sx={{ width: '600px' }}>
            <CardContent>
              <Typography variant="h6">{formatDate(selectedDate)}</Typography>
              {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map(meal => (
                <Card key={meal} sx={{ marginTop: '20px', backgroundColor: '#545453', width: '100%' }}>
                  <CardContent>
                    <Typography variant="h6">{meal}</Typography>
                    <Button
                      variant="contained"
                      sx={{ marginTop: '10px' }}
                      onClick={() => handleAddFoodClick(meal)}
                    >
                      Add Food
                    </Button>
                    {editableStates[meal] && (
                      <Box sx={{ marginTop: '10px' }}>
                        <TextField
                          variant="outlined"
                          sx={{ width: '100%' }}
                          placeholder={`Enter ${meal} items`}
                          multiline
                          rows={4}  // Adjust the number of rows as needed
                          value={mealInputs[meal]}
                          onChange={(e) => handleInputChange(meal, e.target.value)}
                        />
                        <Button
                          variant="contained"
                          sx={{ marginTop: '10px' }}
                          onClick={() => handleSaveClick(meal)}
                        >
                          Save
                        </Button>
                      </Box>
                    )}
                    {!editableStates[meal] && mealPlans[selectedDate] && mealPlans[selectedDate][meal] && (
                      <Typography variant="body1" sx={{ marginTop: '10px' }}>
                        {mealPlans[selectedDate][meal]}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Plangeneration;
  