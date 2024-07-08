import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Box, Button } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const foodData = {
  name: 'Chicken Biryani',
  image: 'https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_960_720.jpg', // Replace with your image URL
  servingSize: '200 grams',
  calories: 350,
  macronutrients: {
    carbohydrates: 45,
    protein: 20,
    fat: 15,
    fiber: 4,
    sugar: 5,
  },
  micronutrients: {
    vitaminA: 20,
    vitaminC: 15,
    iron: 10,
    calcium: 8,
    sodium: 600,
  },
  ingredients: 'Basmati rice, chicken, onions, tomatoes, yogurt, spices (turmeric, cumin, coriander, etc.)',
  allergens: 'Contains dairy',
  healthHighlights: ['High in protein', 'Good source of fiber'],
};

const macronutrientData = {
  labels: ['Carbohydrates', 'Protein', 'Fat', 'Fiber', 'Sugar'],
  datasets: [
    {
      data: [
        foodData.macronutrients.carbohydrates,
        foodData.macronutrients.protein,
        foodData.macronutrients.fat,
        foodData.macronutrients.fiber,
        foodData.macronutrients.sugar,
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
        foodData.micronutrients.vitaminA,
        foodData.micronutrients.vitaminC,
        foodData.micronutrients.iron,
        foodData.micronutrients.calcium,
        foodData.micronutrients.sodium,
      ],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    },
  ],
};

const chartOptions = {
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      align: 'start', // Align legend items to the start (left)
      labels: {
        usePointStyle: true, // Use a circular point as legend icon
        boxWidth: 10, // Width of the colored box next to legend labels
        color: 'white', // Set legend label text color to white
        generateLabels: function(chart) {
          return chart.data.labels.map(function(label, i) {
            const backgroundColor = chart.data.datasets[0].backgroundColor[i];
            return {
              text: label,
              fillStyle: backgroundColor,
              fontColor: 'white', // Set font color to white
              hidden: false,
              index: i,
            };
          });
        },
      },
    },
  },
};

const NutritionInfo = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia component="img" height="300" image={foodData.image} alt={foodData.name} />
          
            <CardContent>
              <Typography variant="h5" component="div">
                {foodData.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Serving Size: {foodData.servingSize}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Calories: {foodData.calories} kcal
              </Typography>
                  <Button variant="contained" color="primary"sx={{ marginLeft: '37rem' }}  >
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
              <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
                <strong>Ingredients:</strong> {foodData.ingredients}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Allergens:</strong> {foodData.allergens}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Health Highlights:</strong>
              </Typography>
              <ul>
                {foodData.healthHighlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NutritionInfo;
