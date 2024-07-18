import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import MealPlanCard from './MealPlanCard';

const mealPlans = [
  {
    title: '1-Week Meal Plan & Recipe Prep for Pre-Diabetes',
    description: 'Medically reviewed by Barbie Cervoni MS, RD, CDCES, CDN',
    image: 'https://cdn.pixabay.com/photo/2016/12/05/10/07/dish-1883501_1280.png',
  },
  {
    title: '2,000-Calorie Meal Plan & Recipe Prep',
    description: 'Medically reviewed by Kristy Del Coro MS, RDN, LDN',
    image: 'https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_1280.jpg',
  },
  // Add more meal plans here
];

const MealPlansPage = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Related Articles
      </Typography>
      <Grid container spacing={3}>
        {mealPlans.map((meal, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <MealPlanCard meal={meal} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MealPlansPage;
