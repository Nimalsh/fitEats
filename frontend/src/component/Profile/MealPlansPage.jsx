import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import MealPlanCard from './MealPlanCard';

const mealPlans = [

  {
    title: '7-Day Meal Plan for Muscle Gain',
    description: 'Medically reviewed by Barbie Cervoni MS, RD, CDCES, CDN',
    image: 'https://img.freepik.com/free-photo/buddha-bowl-dish-with-vegetables-legumes-top-view_1150-42589.jpg?t=st=1721324235~exp=1721327835~hmac=f007f77f3803e2fc4d797b7f00453d533a2322f8ccc618c616c00af6657ac86a&w=996',
  },
  
  {
    title: '2,000-Calorie Meal Plan & Recipe Prep',
    description: 'Medically reviewed by Kristy Del Coro MS, RDN, LDN',
    image: 'https://img.freepik.com/premium-photo/batch-food-cooked-recipients-composition_23-2148765517.jpg?w=996',
  },
  
  {
    title: '1,400-Calorie Meal Plan and Shopping List',
    description: 'Medically reviewed by Melissa Rifkin, MS, RD, CDN',
    image: 'https://cdn.pixabay.com/photo/2023/06/12/11/34/mushrooms-8058299_960_720.jpg',
  },
  {
    title: '1-Week Meal Plan & Recipe Prep for Pre-Diabetes',
    description: 'Medically reviewed by Barbie Cervoni MS, RD, CDCES, CDN',
    image: 'https://cdn.pixabay.com/photo/2016/12/05/10/07/dish-1883501_1280.png',
  },
  {
    title: '7-Day, 1,500-Calorie Meal Plan & Recipe Prep',
    description: 'Medically reviewed by Melissa Rifkin, MS, RD, CDN',
    image: 'https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_1280.jpg',
  },
 
  {
    title: '7-Day, 1,600-Calorie Meal Plan & Recipe Prep',
    description: 'Medically reviewed by Kristy Del Coro MS, RDN, LDN',
    image: 'https://cdn.pixabay.com/photo/2021/01/16/09/05/meal-5921491_1280.jpg',
  },
  {
    title: 'First Trimester Pregnancy Meal Plan: Recipes & Prep',
    description: 'Medically reviewed by Melissa Rifkin, MS, RD, CDN',
    image: 'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549_1280.jpg',
  }
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
