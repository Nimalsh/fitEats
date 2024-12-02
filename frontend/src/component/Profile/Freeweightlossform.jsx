import React, { useState,useEffect } from 'react';
import { Button, Container, Grid, TextField, Paper, Typography, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Checkbox } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title } from 'chart.js';
import { useNavigate,useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createRequest } from '../State/Autoplans/Action';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title);

const Freeweightlossform = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProceed = () => {
    const token = localStorage.getItem('jwt'); // Or wherever your token is stored
    
    // Create a requestData object with all the form data
    const requestData = {
      title, // Example static title, replace if needed
      status: "Pending",
      weight: parseFloat(currentWeight) || 0,
      duration: (parseInt(duration) || 0) * 7, 
      age: parseInt(age) || 0,
      height: parseFloat(height) || 0,
      gender: gender,
      dietaryPreferences: dietaryPreferences.join(', '), // Convert array to comma-separated string
      dietaryRestrictions: dietaryRestrictions.join(', '), // Convert array to comma-separated string
      activitylevel: activityLevel,
      target: type === 'weightLoss' 
          ? (parseFloat(currentWeight) - parseFloat(targetWeightLoss) || 0) 
          : (parseFloat(currentWeight) + parseFloat(targetWeightLoss) || 0),
      bmi: height > 0 
          ? parseFloat(currentWeight) / Math.pow(parseFloat(height) / 100, 2) 
          : 0
  };
  
  
    // Dispatch the createRequest action with requestData and token
    dispatch(createRequest(requestData, token))
    .then((data) => {
      // Use planId and duration from the response to navigate
      const { planId, duration } = data;  // Assuming these are in the response
      console.log("dataa",data);
      navigate(`/my-profile/autoplan/view/${planId}/${duration}`);
    })
    .catch((error) => {
      console.error("Error creating request", error);
    });
  };

  
  

  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeightLoss, setTargetWeightLoss] = useState('');
  const [duration, setDuration] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const { type } = useParams();
  const [title, setTitle] = useState('');
  const [chartLabel, setChartLabel] = useState('');
  const [chartYAxisTitle, setChartYAxisTitle] = useState('');

  useEffect(() => {
    if (type === 'weightloss') {
      setTitle('Weight Loss');
      setChartLabel('Weight Loss (kg)');
      setChartYAxisTitle('Weight (kg)');
    } else if (type === 'weightgain') {
      setTitle('Weight Gain');
      setChartLabel('Weight Gain (kg)');
      setChartYAxisTitle('Weight (kg)');
    }
  }, [type]);
  
  useEffect(() => {
    if (currentWeight && targetWeightLoss) {
     
      if (targetWeightLoss > 0) {
        const calculatedDuration = Math.ceil(targetWeightLoss / 0.5); // Divide by 0.5 and round up
        setDuration(calculatedDuration); // Set the calculated duration
      }
    }
  }, [currentWeight, targetWeightLoss]);
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

  // Generate chart data based on input
  const generateChartData = () => {
    const currentWeightNum = parseFloat(currentWeight) || 0;
    const targetWeightLossNum = parseFloat(targetWeightLoss) || 0;
    const durationNum = (parseFloat(duration) || 0);

    const labels = Array.from({ length: durationNum }, (_, i) => `Week ${i + 1}`);
    const weightLossPerWeek = 0.5;
    let weightLossData;
    if (type === 'weightLoss') {
      weightLossData = Array.from({ length: durationNum }, (_, i) => currentWeightNum - weightLossPerWeek * (i + 1));
    } else {
      weightLossData = Array.from({ length: durationNum }, (_, i) => currentWeightNum + weightLossPerWeek * (i + 1));
    }

    return {
      labels,
      datasets: [
        {
          label: 'Weight (kg)',
          data: [currentWeightNum, ...weightLossData],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    };
  };

  const data = generateChartData();

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Weeks',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Weight (kg)',
        },
      },
    },
  };

  

  return (
    <Container>
      <Grid container spacing={3}>
        {/* Left Tile */}
        <Grid item xs={12} sm={6}>
          <Box mt={5} ml={-1}>
            <Paper style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
  {`${title}  Form`}
</Typography>

              <form noValidate autoComplete="off">
                <TextField
                  label="Current Weight (kg)"
                  fullWidth
                  margin="normal"
                  type="number"
                  name="currentWeight"
                  value={currentWeight}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Weight Loss (kg)"
                  fullWidth
                  margin="normal"
                  type="number"
                  name="targetWeightLoss"
                  value={targetWeightLoss}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Duration (weeks)"
                  fullWidth
                  margin="normal"
                  type="number"
                  name="duration"
                  value={duration}
                  onChange={handleInputChange}
                  disabled  
                />
              </form>
              {/* Chart Component */}
              <Box mt={3}>
              <Typography variant="h6" gutterBottom>
  {`${title}  Duration chart`}
</Typography>

                <Line data={data} options={options} />
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
          <FormControlLabel value="light" control={<Radio />} label="Lightly Active" />
        </Grid>
        <Grid item xs={6} sm={4}>
          <FormControlLabel value="moderate" control={<Radio />} label="Moderately Active" />
        </Grid>
        <Grid item xs={6} sm={4}>
          <FormControlLabel value="active" control={<Radio />} label="Very Active" />
        </Grid>
        <Grid item xs={6} sm={4}>
          <FormControlLabel value="very active" control={<Radio />} label="Super Active" />
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
            checked={dietaryPreferences.includes('Balanced')}
            onChange={(e) => handleCheckboxChange(e, 'preferences')}
            name="Balanced"
          />
        }
        label="Balanced"
      />
    </Grid>
    <Grid item xs={6} sm={4}>
      <FormControlLabel
        control={
          <Checkbox
            checked={dietaryPreferences.includes('High-Fiber')}
            onChange={(e) => handleCheckboxChange(e, 'preferences')}
            name="High-Fiber"
          />
        }
        label="High-Fiber"
      />
    </Grid>
    <Grid item xs={6} sm={4}>
      <FormControlLabel
        control={
          <Checkbox
            checked={dietaryPreferences.includes('High-Protein')}
            onChange={(e) => handleCheckboxChange(e, 'preferences')}
            name="High-Protein"
          />
        }
        label="High-Protein"
      />
    </Grid>
    <Grid item xs={6} sm={4}>
      <FormControlLabel
        control={
          <Checkbox
            checked={dietaryPreferences.includes('Low-Carb')}
            onChange={(e) => handleCheckboxChange(e, 'preferences')}
            name="Low-Carb"
          />
        }
        label="Low-Carb"
      />
    </Grid>
    <Grid item xs={6} sm={4}>
      <FormControlLabel
        control={
          <Checkbox
            checked={dietaryPreferences.includes('Low-Fat')}
            onChange={(e) => handleCheckboxChange(e, 'preferences')}
            name="Low-Fat"
          />
        }
        label="Low-Fat"
      />
    </Grid>
    <Grid item xs={6} sm={4}>
      <FormControlLabel
        control={
          <Checkbox
            checked={dietaryPreferences.includes('Low-Sodium')}
            onChange={(e) => handleCheckboxChange(e, 'preferences')}
            name="Low-Sodium"
          />
        }
        label="Low-Sodium"
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
              checked={dietaryRestrictions.includes('Alcohol-Free')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Alcohol-Free"
            />
          }
          label="Alcohol-Free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Celery-Free')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Celery-Free"
            />
          }
          label="Celery-Free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Dairy-Free')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Dairy-Free"
            />
          }
          label="Dairy-Free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Egg-Free')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Egg-Free"
            />
          }
          label="Egg-Free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Fish-Free')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Fish-Free"
            />
          }
          label="Fish-Free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Gluten-Free')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Gluten-Free"
            />
          }
          label="Gluten-Free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Immuno-Supportive')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Immuno-Supportive"
            />
          }
          label="Immuno-Supportive"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Keto-Friendly')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Keto-Friendly"
            />
          }
          label="Keto-Friendly"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Kosher')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Kosher"
            />
          }
          label="Kosher"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Low Potassium')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Low Potassium"
            />
          }
          label="Low Potassium"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Low Sugar')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Low Sugar"
            />
          }
          label="Low Sugar"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Lupine-Free')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Lupine-Free"
            />
          }
          label="Lupine-Free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Mediterranean')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Mediterranean"
            />
          }
          label="Mediterranean"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Mollusk-Free')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Mollusk-Free"
            />
          }
          label="Mollusk-Free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Mustard-Free')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Mustard-Free"
            />
          }
          label="Mustard-Free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('No oil added')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="No oil added"
            />
          }
          label="No oil added"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Paleo')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Paleo"
            />
          }
          label="Paleo"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Peanut-Free')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Peanut-Free"
            />
          }
          label="Peanut-Free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Pescatarian')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Pescatarian"
            />
          }
          label="Pescatarian"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Pork-Free')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Pork-Free"
            />
          }
          label="Pork-Free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Red-Meat-Free')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Red-Meat-Free"
            />
          }
          label="Red-Meat-Free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Soy-Free')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Soy-Free"
            />
          }
          label="Soy-Free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Sugar-Conscious')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Sugar-Conscious"
            />
          }
          label="Sugar-Conscious"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Tree-Nut-Free')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Tree-Nut-Free"
            />
          }
          label="Tree-Nut-Free"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Vegan')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Vegan"
            />
          }
          label="Vegan"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={dietaryRestrictions.includes('Vegetarian')}
              onChange={(e) => handleCheckboxChange(e, 'restrictions')}
              name="Vegetarian"
            />
          }
          label="Vegetarian"
        />
      </Grid>
    </Grid>
  </FormControl>
</Grid>
              {/* Number of Meals and Snacks per day */}
             
                {/* Preferred Times */}
                <Button
                  variant="contained"
                  sx={{
                    marginLeft: '400px',
                    marginTop: '30px',
                  }}
                  onClick={handleProceed}  >
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

export default Freeweightlossform;
