import React, { useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, Button, TextField
} from '@mui/material';

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

  const handlePublishClick = () => {
    console.log('Plan Published', mealPlans);
    // Add your publish logic here
  };

  const formatDate = (day) => {
    const suffix = (day) => {
      if (day === 1) return 'st';
      if (day === 2) return 'nd';
      if (day === 3) return 'rd';
      return 'th';
    };
    return `${day}${suffix(day)} day of duration`;
  };

   
  const [age, setAge] = useState(30); 
const [height, setHeight] = useState(170); 
const [gender, setGender] = useState('Male');
const [activityLevel, setActivityLevel] = useState('Moderately Active'); // Activity Level: 'Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Super Active'
const [dietaryPreferences, setDietaryPreferences] = useState('Vegetarian'); // Dietary Preferences: 'Vegetarian', 'Vegan', 'Gluten-free', 'Lactose intolerant', etc.
const [dietaryRestrictions, setDietaryRestrictions] = useState('None'); // Dietary Restrictions: 'None', 'Gluten-free', 'Lactose intolerant', 'Nut-free', etc.
const [mealsPerDay, setMealsPerDay] = useState(3); 
const [weight, setWeight] = useState(70);
const [bmi, setbmi] = useState(24.2); 
const [calory, setCalory] = useState(2500); 


  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={1}>
        {/* Left Hand Side Tile */}
        <Grid item xs={12} md={7}>
          <Card sx={{ width: '80%' }}>
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
                      <Typography variant="body1" sx={{ marginTop: '10px', whiteSpace: 'pre-line' }}>
                        {mealPlans[selectedDate][meal]}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </Grid>
        {/* Right Hand Side Tile */}
        <Grid item xs={12} md={5}>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              <Typography variant="h6"></Typography>
              <Box sx={{ border: '1px solid gray', borderRadius: '8px', padding: '16px', marginTop: '20px' }}>
                <Typography variant="h6">Plan Duration</Typography>
                <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                  {[1, 2, 3, 4, 5, 6, 7].map(day => (
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
              <form noValidate autoComplete="off">
              <TextField
                  label="Gender"
                  fullWidth
                  margin="normal"
                  type="text"
                  name="Gender"
                  value={gender}
                  disabled // Make the field disabled
                />
                <TextField
                  label="Age"
                  fullWidth
                  margin="normal"
                  type="number"
                  name="Age"
                  value={age}
                  disabled // Make the field disabled
                />
                  <TextField
                  label="Daily calorie limit(cal) "
                  fullWidth
                  margin="normal"
                  type="number"
                  name="calory"
                  value={calory}
                  disabled // Make the field disabled
                />
                  <TextField
                  label="Weight"
                  fullWidth
                  margin="normal"
                  type="number"
                  name="weight"
                  value={weight}
                  disabled // Make the field disabled
                />
                <TextField
                  label="Height"
                  fullWidth
                  margin="normal"
                  type="number"
                  name="Height"
                  value={height}
                  disabled // Make the field disabled
                />
                  <TextField
                  label="BMI"
                  fullWidth
                  margin="normal"
                  type="number"
                  name="bmi"
                  value={bmi}
                  disabled // Make the field disabled
                />
              
                <TextField
                  label="Activity Level"
                  fullWidth
                  margin="normal"
                  type="text"
                  name="activitylevel"
                  value={activityLevel}
                  disabled // Make the field disabled
                />
                <TextField
                  label="Dietary Preferences"
                  fullWidth
                  margin="normal"
                  type="text"
                  name="dietaryPreferences"
                  value={dietaryPreferences}
                  disabled // Make the field disabled
                />
                <TextField
                  label="Dietary Restrictions"
                  fullWidth
                  margin="normal"
                  type="text"
                  name="dietaryRestrictions"
                  value={dietaryRestrictions}
                  disabled // Make the field disabled
                />
                <TextField
                  label="Meals per day"
                  fullWidth
                  margin="normal"
                  type="number"
                  name="mealsPerDay"
                  value={mealsPerDay}
                  disabled // Make the field disabled
                />
              </form>
              <Button
                variant="contained"
                sx={{ marginTop: '20px' }}
                onClick={handlePublishClick}
              >
                Publish the Plan
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Plangeneration;
