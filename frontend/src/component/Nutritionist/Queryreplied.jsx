import React, { useState } from 'react';
import { Container, Grid, TextField, Paper, Typography, Box, Avatar, Button } from '@mui/material';

const Queryanswer = () => {
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
  const [query, setQuery] = useState('What are the best sources of protein for individuals with dietary restrictions (e.g., vegetarian, vegan, gluten-free)?'); // Renamed state to setQuery for consistency
  const [replyVisible, setReplyVisible] = useState(false); // State to manage reply input visibility
  const [replyText, setReplyText] = useState(''); // State to manage reply text
  const [weight, setWeight] = useState('55');
  const userName = 'John Doe';
  const [reply, setReply] = useState('Vegetarian Protein Sources: Lentils, chickpeas, Greek yogurt, eggs, nuts, seeds, and soy products like tofu and tempeh.');

  
  const handleReplyClick = () => {
    setReplyVisible(true);
  };

  const handleSaveReply = () => {
    // Implement save logic here
    console.log('Saving reply:', replyText);
    setReplyVisible(false); // Hide reply input after saving
  };

  return (
    <Container>
      <Grid container spacing={0}>
        {/* Left Tile */}
        <Grid item xs={12} sm={8}>
          <Box mt={5} ml={2} width={'700px'}>
            <Paper style={{ padding: 20, position: 'relative' }}>
              <Typography variant="h6" gutterBottom>
              Queries
              </Typography>
              <Box position="relative">
                <Box position="absolute" top={16} left={16} display="flex" flexDirection="column" alignItems="center" mr={5}>
                  <Avatar
                    alt="User Image"
                    src="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
                    sx={{ width: 60, height: 60 }}
                  />
                  <Typography variant="subtitle1" mt={1} sx={{ whiteSpace: 'nowrap' }}>
                    {userName}
                  </Typography>
                </Box>
                <Box sx={{ width: '550px', pl: 10 }}>
                  <form noValidate autoComplete="off">
                    <TextField
                      label="Query"
                      fullWidth
                      margin="normal"
                      multiline
                      rows={4}
                      variant="outlined"
                      type="text"
                      name="query"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      disabled // Make the field disabled
                      sx={{ width: '100%', marginLeft: '15px' }} 
                    />
                  </form>
                  <form noValidate autoComplete="off">
                    <TextField
                      label="Reply"
                      fullWidth
                      margin="normal"
                      multiline
                      rows={4}
                      variant="outlined"
                      type="text"
                      name="reply"
                      value={reply}
                      onChange={(e) => setQuery(e.target.value)}
                      disabled // Make the field disabled
                      sx={{ width: '100%', marginLeft: '15px' }} 
                    />
                  </form>
                 
               
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>

        {/* Right Tile */}
        <Grid item xs={12} sm={4}>
          <Box mt={5} ml={-1} width={'400px'}>
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

export default Queryanswer;
