import React, { useState } from 'react';
import { Button, Container, Grid, TextField, Paper, Typography, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Checkbox } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title);

const Paidothergoalform = () => {
  const navigate = useNavigate();
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeightLoss, setTargetWeightLoss] = useState('');
  const [duration, setDuration] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [mealsPerDay, setMealsPerDay] = useState('');
  const [goal, setGoal] = useState('');
const [isGoalDisabled, setIsGoalDisabled] = useState(false);


  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const sanitizedValue = value.replace(/^0+/, ''); // Remove leading zeros

    switch (name) {
      case 'currentWeight':
        setCurrentWeight(sanitizedValue);
        break;
      case 'targetWeightLoss':
        setTargetWeightLoss(sanitizedValue);
        break;
      case 'duration':
        setDuration(sanitizedValue);
        break;
      case 'age':
        setAge(sanitizedValue);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'height':
        setHeight(sanitizedValue);
        break;
      case 'activityLevel':
        setActivityLevel(value);
        break;
      case 'mealsPerDay':
        setMealsPerDay(value);
        break;
      default:
        break;
    }
  };

  // Function to handle checkbox changes
  const handleCheckboxChange = (event, type) => {
    const { name, checked } = event.target;
    const setState = type === 'preferences' ? setDietaryPreferences : setDietaryRestrictions;
    const state = type === 'preferences' ? dietaryPreferences : dietaryRestrictions;

    if (checked) {
      setState([...state, name]);
    } else {
      setState(state.filter((item) => item !== name));
    }
  };

 
  return (
    <Container>
      <Grid container spacing={3}>
        {/* Left Tile */}
        <Grid item xs={12} sm={6}>
      <Box mt={5}>
        <Paper style={{ padding: 20 }}>
          <Typography variant="h6" gutterBottom>
            Describe your Goal
          </Typography>
          <ReactQuill
            theme="snow"
            value={goal}
            onChange={setGoal}
            readOnly={isGoalDisabled}
            style={{ height: '200px', marginBottom: '20px' }}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 5, ml: 'auto' }}
              onClick={() => setIsGoalDisabled(true)}
            >
              Set
            </Button>
          </Box>
        </Paper>
      </Box>
    </Grid>
        {/* Right Tile */}
        <Grid item xs={12} sm={4}>
          <Box mt={5} width={'550px'} marginLeft={'3px'}>
            <Paper style={{ padding: 20, width: '100%' }}>
              <Typography variant="h6" gutterBottom>
               
              </Typography>
              <Grid >
                {/* Age, Gender, Height */}
                <Grid item xs={12} sm={4}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Age</FormLabel>
                    <TextField
                      fullWidth
                      margin="normal"
                      type="number"
                      name="age"
                      value={age}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="gender"
                      value={gender}
                      onChange={handleInputChange}
                    >
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Weight</FormLabel>
                    <TextField
                      fullWidth
                      margin="normal"
                      type="number"
                      name="currentWeight"
                      value={currentWeight}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Height</FormLabel>
                    <TextField
                      fullWidth
                      margin="normal"
                      type="number"
                      name="height"
                      value={height}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Grid>
                {/* Activity Level */}
                <Grid item xs={12}>
  <FormControl component="fieldset">
    <FormLabel component="legend">Activity Level</FormLabel>
    <RadioGroup
      aria-label="activityLevel"
      name="activityLevel"
      value={activityLevel}
      onChange={handleInputChange}
    >
      <Grid container spacing={0}>
        <Grid item xs={6} sm={4}>
          <FormControlLabel value="sedentary" control={<Radio />} label="Sedentary" />
        </Grid>
        <Grid item xs={6} sm={4}>
          <FormControlLabel value="lightlyActive" control={<Radio />} label="Lightly Active" />
        </Grid>
        <Grid item xs={6} sm={4}>
          <FormControlLabel value="moderatelyActive" control={<Radio />} label="Moderately Active" />
        </Grid>
        <Grid item xs={6} sm={4}>
          <FormControlLabel value="veryActive" control={<Radio />} label="Very Active" />
        </Grid>
        <Grid item xs={6} sm={4}>
          <FormControlLabel value="superActive" control={<Radio />} label="Super Active" />
        </Grid>
      </Grid>
    </RadioGroup>
  </FormControl>
</Grid>

<Grid item xs={12}>
  <FormControl component="fieldset">
    <FormLabel component="legend">Dietary Preferences</FormLabel>
    <Grid container spacing={0}>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryPreferences.includes('vegetarian')}
              onChange={(e) => handleCheckboxChange(e, 'preferences')}
              name="vegetarian"
            />
          }
          label="Vegetarian"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryPreferences.includes('vegan')}
              onChange={(e) => handleCheckboxChange(e, 'preferences')}
              name="vegan"
            />
          }
          label="Vegan"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryPreferences.includes('lowFat')}
              onChange={(e) => handleCheckboxChange(e, 'preferences')}
              name="lowFat"
            />
          }
          label="Low-fat"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryPreferences.includes('keto')}
              onChange={(e) => handleCheckboxChange(e, 'preferences')}
              name="keto"
            />
          }
          label="Keto"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryPreferences.includes('glutenFree')}
              onChange={(e) => handleCheckboxChange(e, 'preferences')}
              name="glutenFree"
            />
          }
          label="Gluten-free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryPreferences.includes('lowCarb')}
              onChange={(e) => handleCheckboxChange(e, 'preferences')}
              name="lowCarb"
            />
          }
          label="Low-carb"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryPreferences.includes('paleo')}
              onChange={(e) => handleCheckboxChange(e, 'preferences')}
              name="paleo"
            />
          }
          label="Paleo"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryPreferences.includes('lactoseIntolerant')}
              onChange={(e) => handleCheckboxChange(e, 'preferences')}
              name="lactoseIntolerant"
            />
          }
          label="Lactose intolerant"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryPreferences.includes('flexitarian')}
              onChange={(e) => handleCheckboxChange(e, 'preferences')}
              name="flexitarian"
            />
          }
          label="Flexitarian"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryPreferences.includes('pescatarian')}
              onChange={(e) => handleCheckboxChange(e, 'preferences')}
              name="pescatarian"
            />
          }
          label="Pescatarian"
        />
      </Grid>
    </Grid>
  </FormControl>
</Grid>
  {/* Dietary Restrictions */}
<Grid item xs={12}>
  <FormControl component="fieldset">
    <FormLabel component="legend">Dietary Restrictions</FormLabel>
    <Grid container spacing={0}>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('nutFree')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="nutFree"
            />
          }
          label="Nut-free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('glutenFree')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="glutenFree"
            />
          }
          label="Gluten-free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('lactoseIntolerant')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="lactoseIntolerant"
            />
          }
          label="Lactose intolerant"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('shellfishFree')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="shellfishFree"
            />
          }
          label="Shellfish-free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('soyFree')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="soyFree"
            />
          }
          label="Soy-free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('dairyFree')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="dairyFree"
            />
          }
          label="Dairy-free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('vegetarian')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="vegetarian"
            />
          }
          label="Vegetarian"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('vegan')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="vegan"
            />
          }
          label="Vegan"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('eggFree')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="eggFree"
            />
          }
          label="Egg-free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('halal')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="halal"
            />
          }
          label="Halal"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('kosher')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="kosher"
            />
          }
          label="Kosher"
        />
      </Grid>
    </Grid>
  </FormControl>
</Grid>
              {/* Number of Meals and Snacks per day */}
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Number of Meals and Snacks per day</FormLabel>
                    <RadioGroup
                      aria-label="mealsPerDay"
                      name="mealsPerDay"
                      value={mealsPerDay}
                      onChange={handleInputChange}
                    >
                      <FormControlLabel value="2" control={<Radio />} label="2" />
                      <FormControlLabel value="3" control={<Radio />} label="3" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {/* Preferred Times */}
                <Button
                  variant="contained"
                  sx={{
                    marginLeft: '400px',
                    marginTop: '30px',
                  }}
                  onClick={() => navigate('/my-profile/personalized-plan/weightloss/nutritionist')}  >
                  Proceed
                </Button>
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Paidothergoalform;
