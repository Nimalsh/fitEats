import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Card, CardContent, Typography, Box, TextField, Button,MenuItem,Select } from '@mui/material';
import correctbmi from './BMIimage.jpg';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector  } from 'react-redux'; // Import useDispatch
import { createBmiplan,fetchUserDetailsByToken,fetchActiveBmiPlans } from '../State/Bmi/Action'; // Update with the correct path

const BMI = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch
  

  const [currentWeight, setCurrentWeight] = useState(70); // kg
  const [currentHeight, setCurrentHeight] = useState(1.75); // meters
  const [age, setAge] = useState(70); // kg
  const [activityLevel, setActivityLevel] = useState(""); // meters
  const [gender, setGender] = useState(""); // kg
  const [bmi, setBmi] = useState(23.44);
  const [targetWeight, setTargetWeight] = useState(0); 
  const [durationWeeks, setDurationWeeks] = useState(7);
  const [duration, setDuration] = useState(7);
  const [weightProgress, setWeightProgress] = useState([]);
  const [plotDaily, setPlotDaily] = useState(false);
  const token = localStorage.getItem('jwt'); 
   

  
  useEffect(() => {
    if (token) {
      dispatch(fetchUserDetailsByToken(token));
      dispatch(fetchActiveBmiPlans(token));
    }
  }, [dispatch, token]);
  
  const userDetails = useSelector((state) => state.bmi.userDetails);
  const planDetails = useSelector((state) => state.bmi.activePlans);
  
  useEffect(() => {
    if (planDetails && planDetails.length > 0 && planDetails[0]) {
      // If plan details exist, prioritize setting current weight and height from planDetails[0]
      setCurrentWeight(planDetails[0].weight);
      setCurrentHeight(planDetails[0].height); // Convert height from cm to meters
      setTargetWeight(planDetails[0].target); // Use target weight from plan details if available
      setDurationWeeks(planDetails[0].duration); 
      setAge(planDetails[0].age);
      setActivityLevel(planDetails[0].activitylevel); // Convert height from cm to meters
      setGender(planDetails[0].gender);
      setDurationWeeks(planDetails[0].duration/7);
    } else if (userDetails) {
      // If plan details are empty or not available, fallback to user details
      setCurrentWeight(userDetails.currentWeight);
      setCurrentHeight(userDetails.height / 100);
      setAge(userDetails.age);
      setActivityLevel(userDetails.activityLevel); // Convert height from cm to meters
      setGender(userDetails.gender);
      
     
    }
  }, [planDetails, userDetails]);
  
  useEffect(() => {
    const calculateDurationWeeks = (currentWeight, targetWeight) => {
      // Round currentWeight and targetWeight to the nearest whole numbers
      const roundedCurrentWeight = Math.round(currentWeight);
      
      const roundedTargetWeight = Math.round(targetWeight);
      console.log("rounded target",roundedTargetWeight);
      const weightDifference = roundedCurrentWeight - roundedTargetWeight;
      const weeklyLoss = 1; // kg per week
      return (weightDifference / weeklyLoss);
    };
  
    const newDurationWeeks = calculateDurationWeeks(currentWeight, targetWeight);
    setDurationWeeks(newDurationWeeks);
    setDuration(newDurationWeeks * 7);
    console.log("dura", duration);
  }, [currentWeight, targetWeight]);
  

  

  
  useEffect(() => {
    const daysInWeek = 7;
    const totalDays = durationWeeks * daysInWeek;
    const dailyWeightChange = (currentWeight - targetWeight) / totalDays;

    if (durationWeeks <= 2) {
      const dailyProgress = Array.from({ length: totalDays }, (_, i) => {
        const day = i + 1;
        const weight = currentWeight - dailyWeightChange * day;
        return weight.toFixed(1); // Round to 1 decimal place for better readability
      });

      setWeightProgress(dailyProgress);
      setPlotDaily(true);
    } else {
      const weeks = Array.from({ length: durationWeeks }, (_, i) => i + 1);
      const weeklyProgress = weeks.map(
        week => currentWeight - (currentWeight - targetWeight) * (week / durationWeeks)
      );

      setWeightProgress(weeklyProgress);
      setPlotDaily(false);
    }

    setBmi(currentWeight / (currentHeight * currentHeight)); // Update BMI
  }, [currentWeight, targetWeight, currentHeight, durationWeeks]);



  const data = {
    labels: plotDaily ?
      Array.from({ length: durationWeeks * 7 }, (_, i) => `Day ${i + 1}`) :
      Array.from({ length: durationWeeks }, (_, i) => `Week ${i + 1}`),
    datasets: [
      {
        label: plotDaily ? 'Daily Weight Progress' : 'Weekly Weight Progress',
        data: weightProgress,
        fill: false,
        backgroundColor: 'orange',
        borderColor: 'orange',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        suggestedMin: targetWeight - 5,
        suggestedMax: currentWeight + 5,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  const bmiStatusColor = bmi < 18.5 ? 'blue' : bmi < 25 ? 'green' : bmi < 30 ? 'orange' : 'red';

  const styles = {
    dashboard: {
      display: 'flex',
      gap: '20px',
      padding: '20px',
    },
    bmiChart: {
      position: 'relative',
      width: '100%',
      height: '50px',
      background: 'linear-gradient(to right, blue 0%, blue 18.5%, green 18.5%, green 25%, orange 25%, orange 30%, red 30%, red 100%)',
      borderRadius: '4px',
      marginTop: '80px',
    },
    bmiPointer: {
      position: 'absolute',
      bottom: 0,
      width: '2px',
      height: '100%',
      backgroundColor: 'black',
      transition: 'left 0.3s ease',
    },
    chartContainer: {
      position: 'relative',
      width: '100%',
      height: '300px',
    },
    valueBox: {
      backgroundColor: '#5D5F5F',
      padding: '5px',
      borderRadius: '4px',
      textAlign: 'center',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      width: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '56px',
    },
    flexRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '10px',
    },
    legendContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '10px',
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      marginRight: '20px',
    },
    legendColorBox: {
      width: '20px',
      height: '10px',
      marginRight: '5px',
    },
  };
  // Calculate median target weight for healthy BMI range
  useEffect(() => {
    if ((!planDetails || planDetails.length === 0) && (bmi < 18.5 || bmi >= 25)) {
      // Calculate target weight only if planDetails are not available and BMI is not in the healthy range
      const calculateTargetWeight = (height) => {
        const minHealthyBMI = 18.5;
        const maxHealthyBMI = 24.9;
        const minTargetWeight = minHealthyBMI * (height * height);
        const maxTargetWeight = maxHealthyBMI * (height * height);
        return (minTargetWeight + maxTargetWeight) / 2;
      };

      const newTargetWeight = calculateTargetWeight(currentHeight);
      setTargetWeight(newTargetWeight);
    }
  }, [planDetails, bmi, currentHeight]);


  const handleWeightChange = (e) => {
    const newWeight = parseFloat(e.target.value);
    setCurrentWeight(newWeight);
    setBmi(newWeight / (currentHeight * currentHeight));
  };

  const handleHeightChange = (e) => {
    const newHeight = parseFloat(e.target.value);
    setCurrentHeight(newHeight);
    setBmi(currentWeight / (newHeight * newHeight));
  };

  const handleDurationWeeksChange = (e) => {
    setDurationWeeks(parseInt(e.target.value, 10));
  };

  const handleCaloryMonitor = () => {
    if (planDetails.length > 0) {
      const { planId, duration } = planDetails[0]; // Extract planId and duration
      navigate(`/my-profile/BMI/plan/${duration}/${planId}`); // Navigate with parameters
    } else {
      // Handle the case where planDetails is empty or undefined
      console.error("No plan details available");
    }
  };
  

  let pointerLeft = '0%';

  switch (bmiStatusColor) {
    case 'blue':
      pointerLeft = '9.25%';
      break;
    case 'green':
      pointerLeft = '21.75%';
      break;
    case 'orange':
      pointerLeft = '27.5%';
      break;
    case 'red':
      pointerLeft = '65%';
      break;
    default:
      pointerLeft = '0%';
  }

  const handleProceed = () => {
   
      
      dispatch(createBmiplan( duration, currentWeight, currentHeight, bmi, targetWeight,age,activityLevel,gender,token, navigate));
   
  }
  return (
    <Box sx={styles.dashboard}>
      <Card sx={{ flex: 2, padding: '20px' }}>
        <CardContent>
          <Box sx={styles.flexRow}>
            <Typography variant="h6">Current Weight:</Typography>
            <TextField
              sx={styles.valueBox}
              type="number"
              value={currentWeight}
              onChange={handleWeightChange}
              inputProps={{ step: "0.1" }}
              disabled={planDetails && planDetails.length > 0}
            />
          </Box>
          <Box sx={styles.flexRow}>
            <Typography variant="h6">Current Height:</Typography>
            <TextField
              sx={styles.valueBox}
              type="number"
              value={currentHeight}
              onChange={handleHeightChange}
              inputProps={{ step: "0.01" }}
              disabled={planDetails && planDetails.length > 0}
            />
          </Box>
          <Box sx={styles.flexRow}>
            <Typography variant="h6">BMI:</Typography>
            <Box sx={styles.valueBox}>
              <Typography variant="h6">{bmi.toFixed(2)}</Typography>
            </Box>
          </Box>
          <div style={styles.bmiChart}>
            <div style={{ ...styles.bmiPointer, left: pointerLeft }}>
              {bmi.toFixed(2)}
            </div>
          </div>
          <Typography variant="body1" sx={{ marginTop: '50px' }}>
            {bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Healthy BMI' : bmi < 30 ? 'Overweight' : 'Obese'}
          </Typography>
          <Box sx={styles.legendContainer}>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendColorBox, backgroundColor: 'blue' }}></div>
              <Typography variant="body1">Underweight</Typography>
            </div>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendColorBox, backgroundColor: 'green' }}></div>
              <Typography variant="body1">Healthy BMI</Typography>
            </div>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendColorBox, backgroundColor: 'orange' }}></div>
              <Typography variant="body1">Overweight</Typography>
            </div>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendColorBox, backgroundColor: 'red' }}></div>
              <Typography variant="body1">Obese</Typography>
            </div>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ flex: 3, padding: '20px' }}>
        <CardContent>
          {bmi >= 18.5 && bmi < 25 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <img src={correctbmi} alt="Correct BMI" style={{ width: '500px', height: '400px', marginBottom: '20px' }} />
              <Typography variant="h6">
                You are in a Healthy BMI range!
              </Typography>
            </Box>
          ) : (
            <>
             <Box sx={styles.flexRow}>
                 <Typography variant="h6">Target Weight:</Typography>
                 <TextField
                     sx={styles.valueBox}
                     type="number"
                     value={targetWeight.toFixed(1)}
                     InputProps={{ readOnly: true }} // Make the field read-only
                   
    
                 />
             </Box>  

                <Box sx={styles.flexRow}>
                  <Typography variant="h6">Duration:</Typography>
                  <TextField
                    sx={styles.valueBox}
                    type="number"
                    value={durationWeeks}
                    InputProps={{ readOnly: true }} // Make the field read-only
                  />
                </Box>


                {!planDetails[0] && (
                  <>
                    <Box sx={styles.flexRow}>
                      <Typography variant="h6">Age:</Typography>
                      <TextField
                        sx={styles.valueBox}
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </Box>

                    <Box sx={styles.flexRow}>
                      <Typography variant="h6">Activity Level:</Typography>
                      <Select
                        sx={styles.valueBox}
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)} // Update state on selection
                        displayEmpty
                      >
                        <MenuItem value="" disabled>

                        </MenuItem>
                        <MenuItem value="sedentary">sedentary</MenuItem>
                        <MenuItem value="light">light</MenuItem>
                        <MenuItem value="moderate">moderate</MenuItem>
                        <MenuItem value="active">active</MenuItem>
                        <MenuItem value="very active">very active</MenuItem>
                      </Select>
                    </Box>

                    <Box sx={styles.flexRow}>
                      <Typography variant="h6">Gender:</Typography>
                      <Select
                        sx={styles.valueBox}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)} // Update state on selection
                        displayEmpty
                      >
                        <MenuItem value="" disabled>

                        </MenuItem>
                        <MenuItem value="male">male</MenuItem>
                        <MenuItem value="female">female</MenuItem>
                      </Select>
                    </Box>
                  </>
                )}


              <Box style={styles.chartContainer}>
                <Line data={data} options={options} />
              </Box>
              <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '10px' }}>
                Target Weight loss or gain: {targetWeight.toFixed(1 )} kg
              </Typography>
              <Box sx={{ marginLeft: '450px', marginTop: '20px' }}>
              {planDetails && planDetails.length > 0 ? (
               <Button
               variant="contained"
               color="primary"
               onClick={handleCaloryMonitor}
               sx={{
                 whiteSpace: 'nowrap',  // Prevents text from wrapping
                 overflow: 'hidden',    // Hides overflow text if it overflows the button width
                 textOverflow: 'ellipsis'  // Adds ellipsis if text overflows
               }}
             >
               Calory Monitor
             </Button>
             
          ) : (
            <Button variant="contained" color="primary" onClick={handleProceed}>
              Let's Proceed
            </Button>
          )}
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default BMI;
