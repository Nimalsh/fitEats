import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, Box, Button } from '@mui/material';
import { Pie } from 'react-chartjs-2';
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

  const macronutrientData = {
    labels: ['Carbohydrates', 'Protein', 'Fat', 'Fiber', 'Sugar'],
    datasets: [
      {
        data: [
          foodData.totalNutrients.CHOCDF?.quantity || 0,
          foodData.totalNutrients.PROCNT?.quantity || 0,
          foodData.totalNutrients.FAT?.quantity || 0,
          foodData.totalNutrients.FIBTG?.quantity || 0,
          foodData.totalNutrients.SUGAR?.quantity || 0,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const micronutrientData = {
    labels: ['Vitamin A', 'Vitamin C', 'Iron', 'Calcium', 'Sodium'],
    datasets: [
      {
        data: [
          foodData.totalNutrients.VITA_RAE?.quantity || 0,
          foodData.totalNutrients.VITC?.quantity || 0,
          foodData.totalNutrients.FE?.quantity || 0,
          foodData.totalNutrients.CA?.quantity || 0,
          foodData.totalNutrients.NA?.quantity || 0,
        ],
        backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB', '#9966FF', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#FFCE56', '#36A2EB', '#9966FF', '#4BC0C0'],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'start',
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          color: 'white',
        },
      },
    },
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
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
              <Button variant="contained" color="primary" sx={{ marginLeft: '37rem' }}>
                Order Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Nutritional Content
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Macronutrients
                  </Typography>
                  <Pie data={macronutrientData} options={chartOptions} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Micronutrients
                  </Typography>
                  <Pie data={micronutrientData} options={chartOptions} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Nutricontent;
