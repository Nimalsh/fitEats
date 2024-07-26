import React, { useState } from 'react';
import { Container, Grid, TextField, Paper, Typography, Box, Avatar,Button } from '@mui/material';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, ArcElement } from 'chart.js';
import { useNavigate } from 'react-router-dom';
// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, ArcElement);

const Weightloss = () => {
  const navigate = useNavigate();
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

  // Assume we have the user's name
  const userName = 'John Doe';

  const generateChartData = () => {
    const currentWeightNum = parseFloat(currentWeight) || 0;
    const targetWeightLossNum = parseFloat(targetWeightLoss) || 0;
    const durationNum = parseFloat(duration) || 0;

    const labels = Array.from({ length: durationNum }, (_, i) => `Week ${i + 1}`);
    const weightLossPerWeek = targetWeightLossNum / durationNum;
    const weightLossData = Array.from({ length: durationNum }, (_, i) => currentWeightNum - (weightLossPerWeek * (i + 1)));

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

  // Dummy data for the donut chart
  const donutData = {
    labels: ['Protein', 'Carbohydrates', 'Fat'],
    datasets: [
      {
        data: [20, 70, 10], // Example data
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const donutOptions = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 50, // Increase the gap between the donut chart and the legend
        },
      },
    },
  };
  const handleProceedClick = () => {
    // Navigate to the article page
   navigate('/nutri/weightloss/view/proceed');
  };

  return (
    <Container>
      <Grid container spacing={-2}>
        {/* Left Tile */}
        <Grid item xs={12} sm={8}>
          <Box mt={5} ml={-5} width={'650px'} marginLeft={'5px'}>
            <Paper style={{ padding: 20 }}>
              <Typography variant="h6" gutterBottom>
                Weight Loss Plan
              </Typography>
              <Box display="flex" alignItems="center">
                <Box display="flex" flexDirection="column" alignItems="center" mr={5} mt={-5}>
                  <Avatar
                    alt="User Image"
                    src="path_to_user_image.jpg"
                    sx={{ width: 50, height: 50 }}
                  />
                  <Typography
                    variant="subtitle1"
                    mt={1}
                    mr={3}
                    ml={1}
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100px',
                    }}
                  >
                    {userName}
                  </Typography>
                </Box>
                <Box>
                  <form noValidate autoComplete="off">
                    <TextField
                      label="Current Weight (kg)"
                      fullWidth
                      margin="normal"
                      type="number"
                      name="currentWeight"
                      value={currentWeight}
                      disabled // Make the field disabled
                    />
                    <TextField
                      label="Weight Loss (kg)"
                      fullWidth
                      margin="normal"
                      type="number"
                      name="targetWeightLoss"
                      value={targetWeightLoss}
                      disabled // Make the field disabled
                    />
                    <TextField
                      label="Duration (weeks)"
                      fullWidth
                      margin="normal"
                      type="number"
                      name="duration"
                      value={duration}
                      disabled // Make the field disabled
                    />
                  </form>
                </Box>
              </Box>
              {/* Chart Component */}
              <Box mt={3}>
                <Typography variant="h6" gutterBottom>
                  Weight Loss and Duration Chart
                </Typography>
                <Line data={data} options={options} />
              </Box>
              {/* Donut Chart Component */}
              <Box mt={2} display="flex" flexDirection="column">
                <Typography variant="h6" gutterBottom mb={-5}>
                  Daily Caloric Needs Breakdown
                </Typography>
                <Box width={400} height={400} marginRight={'20px'}>
                  <Doughnut data={donutData} options={donutOptions} />
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
                <Button
                  variant="contained"
                  sx={{
                    marginLeft: '250px',
                    marginTop: '30px',
                  }} onClick={handleProceedClick}
                >
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

export default Weightloss;
