import React, { useState } from 'react';
import { Container, Grid, TextField, Paper, Typography, Box, Avatar, Button } from '@mui/material';

const Othergoal = () => {
  // Initialize with initial values and disable
  const [currentWeight, setCurrentWeight] = useState('75'); // Initial value
  const [targetWeightLoss, setTargetWeightLoss] = useState('5'); // Initial value
  const [duration, setDuration] = useState('12'); // Initial value
  const [age, setAge] = useState('24');
  const [gender, setGender] = useState('Male');
  const [height, setHeight] = useState('154');
  const [activityLevel, setActivityLevel] = useState('Moderately active');
  const [dietaryPreferences, setDietaryPreferences] = useState('Vegan');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('Nut free');
  const [mealsPerDay, setMealsPerDay] = useState('3');
  const [goal, setGoal] = useState('rfghhjjjsjsj ffhhrhhhssh'); // Renamed state to setGoal for consistency

  // Assume we have the user's name
  const userName = 'John Doe';

  // Mock data for previously achieved goals
  const achievedGoals = [
    { description: 'Lost 5kg in 8 weeks', duration: '8 weeks', weightLost: '5kg' },
    { description: 'Lost 3kg in 4 weeks', duration: '4 weeks', weightLost: '3kg' },
    { description: 'Lost 2kg in 3 weeks', duration: '3 weeks', weightLost: '2kg' },
  ];

  return (
    <Container>
      <Grid container spacing={2}>
        {/* Left Tile */}
        <Grid item xs={12} sm={8}>
          <Box mt={5} ml={-5} width={'700px'}>
            <Paper style={{ padding: 20 }}>
              <Typography variant="h6" gutterBottom>
                {/* Title or Heading */}
              </Typography>
              <Box display="flex" alignItems="center">
                <Box display="flex" flexDirection="column" alignItems="center" mr={5} mt={5}>
                  <Avatar
                    alt="User Image"
                    src="path_to_user_image.jpg"
                    sx={{ width: 60, height: 60 }}
                  />
                  <Typography variant="subtitle1" mt={1}>
                    {userName}
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', position: 'relative' }}>
                  <form noValidate autoComplete="off">
                    <TextField
                      label="Goal"
                      fullWidth
                      margin="normal"
                      type="text"
                      name="goal"
                      value={goal}
                      disabled // Make the field disabled
                    />
                  </form>
                  <Button
                    variant="contained"
                    sx={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                    }}
                  >
                    Reply
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>

        {/* Right Tile */}
        <Grid item xs={12} sm={4}>
          <Box mt={5} ml={-1} width={'500px'}>
            <Paper style={{ padding: 20, width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Grid>
                {/* Age, Gender, Height */}
                <form noValidate autoComplete="off">
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
                    label="Height"
                    fullWidth
                    margin="normal"
                    type="number"
                    name="Height"
                    value={height}
                    disabled // Make the field disabled
                  />
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
                
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Othergoal;
