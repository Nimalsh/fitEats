import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Card, CardContent, Typography, Box, TextField,Button } from '@mui/material';
import correctbmi from './BMIimage.jpg';

const Dashboard = () => {
  const [currentWeight, setCurrentWeight] = useState(70); // kg
  const [currentHeight, setCurrentHeight] = useState(1.75); // meters
  const [bmi, setBmi] = useState(23.44);
  const [targetWeight] = useState(65); // kg
  const [durationWeeks, setDurationWeeks] = useState(12);
  const [weightProgress, setWeightProgress] = useState([]);
  const [plotDaily, setPlotDaily] = useState(false);

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
      <Card sx={{ flex: 3, padding: '20px', height: '600px' }}>
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
                <Box sx={styles.valueBox}>
                  <Typography variant="h6">{targetWeight}</Typography>
                </Box>
              </Box>
              <Box sx={styles.flexRow}>
                <Typography variant="h6">Duration (weeks):</Typography>
                <TextField
                  sx={styles.valueBox}
                  type="number"
                  value={durationWeeks}
                  onChange={handleDurationWeeksChange}
                />
              </Box>
              <Box style={styles.chartContainer}>
                <Line data={data} options={options} />
              </Box>
              <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '10px' }}>
                Target Weight loss or gain: {targetWeight} kg
              </Typography>
              <Box sx={{ marginLeft: '600px', marginTop: '20px' }}>
          <Button variant="contained"  style={{ whiteSpace: 'nowrap' }}>
  Lets Proceed
</Button>
        </Box>

            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
