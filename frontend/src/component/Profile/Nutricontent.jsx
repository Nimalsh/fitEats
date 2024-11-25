import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, Box, Button } from '@mui/material';
import { Chart } from 'react-google-charts';
import { fetchNutritionData } from '../State/Nutrion/Action';

const Nutricontent = () => {
  const { foodName } = useParams();
  const dispatch = useDispatch();
  const foodData = useSelector((state) => state.nutrion.nutritionData);

  useEffect(() => {
    dispatch(fetchNutritionData(foodName));
  }, [dispatch, foodName]);

  const item = JSON.parse(localStorage.getItem('Item'));

  if (!foodData) return <div>Loading...</div>;

  const macronutrientData = [
    ['Nutrient', 'Amount'],
    ['Carbohydrates', foodData.totalNutrients.CHOCDF?.quantity || 0],
    ['Protein', foodData.totalNutrients.PROCNT?.quantity || 0],
    ['Fat', foodData.totalNutrients.FAT?.quantity || 0],
    ['Fiber', foodData.totalNutrients.FIBTG?.quantity || 0],
    ['Sugar', foodData.totalNutrients.SUGAR?.quantity || 0],
  ];

  const micronutrientData = [
    ['Nutrient', 'Amount'],
    ['Vitamin A', foodData.totalNutrients.VITA_RAE?.quantity || 0],
    ['Vitamin C', foodData.totalNutrients.VITC?.quantity || 0],
    ['Iron', foodData.totalNutrients.FE?.quantity || 0],
    ['Calcium', foodData.totalNutrients.CA?.quantity || 0],
    ['Sodium', foodData.totalNutrients.NA?.quantity || 0],
  ];

  const options = {
    is3D: true,
    backgroundColor: 'black',
    slices: {
      0: { color: '#FF6384' },
      1: { color: '#36A2EB' },
      2: { color: '#FFCE56' },
      3: { color: '#4BC0C0' },
      4: { color: '#9966FF' },
    },
    legend: { position: 'bottom', textStyle: { color: 'white', fontSize: 16 } },
    titleTextStyle: { color: 'white', fontSize: 20 },
    pieSliceText: 'label', // Ensure labels are shown on the pie chart
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '600px' }}>
            <CardMedia component="img" height="300" image={item.images} alt={item.name} />
            <CardContent>
              <Typography variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Serving Size: {foodData.totalWeight} grams
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Calories: {foodData.calories} kcal
              </Typography>
              <Button variant="contained" color="primary" sx={{ marginLeft: '20rem', marginTop:'5rem'}}>
                Order Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Nutritional Content
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1, height: '100%' }}>
                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Macronutrients
                  </Typography>
                  <Chart
                    chartType="PieChart"
                    data={macronutrientData}
                    options={options}
                    width="100%"
                    height="300px"
                  />
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Micronutrients
                  </Typography>
                  <Chart
                    chartType="PieChart"
                    data={micronutrientData}
                    options={options}
                    width="100%"
                    height="300px"
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" component="div">
                  Health Highlights
                </Typography>
                <Typography variant="body1" component="div">
                  {foodData.healthLabels.slice(0, 10).map(label => label.toLowerCase()).join(', ')}
                </Typography>
                <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                  Diet Labels
                </Typography>
                <Typography variant="body1" component="div">
                  {foodData.dietLabels.slice(0, 10).map(label => label.toLowerCase()).join(', ')}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Nutricontent;
