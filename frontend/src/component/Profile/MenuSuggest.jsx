import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const mealPlan = [
  {
    day: 'Monday',
    date: 'January 1, 2024',
    meals: {
      breakfast: ['pizza'],
      lunch: ['Tuna & corn salad'],
      dinner: ['Quick vegie frittata with pesto'],
    },
  },
  {
    day: 'Tuesday',
    date: 'January 2, 2024',
    meals: {
      breakfast: ['juice & strawberry toast'],
      lunch: ['Leftover Quick vegie frittata with pesto'],
      dinner: ['Chinese vegetable & noodle stir-fry with egg'],
    },
  },
  {
    day: 'Wednesday',
    date: 'January 3, 2024',
    meals: {
      breakfast: ['Weet-Bix & fruit', 'Tuna & corn salad'],
      lunch: ['Egg & hoummos crispbreads'],
      dinner: ['Spicy pork meatballs with roasted pumpkin & cabbage salad'],
    },
  },
  {
    day: 'Thursday',
    date: 'January 4, 2024',
    meals: {
      breakfast: ['Avocado & feta toast'],
      lunch: ['Chicken caesar wrap'],
      dinner: ['Grilled salmon with quinoa & asparagus'],
    },
  },
  {
    day: 'Friday',
    date: 'January 5, 2024',
    meals: {
      breakfast: ['Greek yogurt with honey & granola'],
      lunch: ['Tomato & mozzarella sandwich'],
      dinner: ['Beef stir-fry with broccoli & rice'],
    },
  },
  {
    day: 'Saturday',
    date: 'January 6, 2024',
    meals: {
      breakfast: ['Oatmeal with fresh berries'],
      lunch: ['Chicken avocado salad'],
      dinner: ['Vegetarian lasagna'],
    },
  },
  {
    day: 'Sunday',
    date: 'January 7, 2024',
    meals: {
      breakfast: ['Scrambled eggs with spinach & mushrooms'],
      lunch: ['Turkey & cheese sandwich'],
      dinner: ['Lemon garlic shrimp pasta'],
    },
  },
];


const MenuSuggest = () => {
  const navigate = useNavigate();

  const handleMealClick = (meal) => {
    navigate(`/my-profile/auto-suggest-restaurant?meal=${meal}`);
  };

  const renderMealList = (meals) => (
    <List>
      {meals.map((meal, index) => (
        <ListItem 
        sx={{
          '&:hover': {
            backgroundColor: '#535353',
            cursor: 'pointer',
          },
        }}
          key={index} 
          button 
          onClick={() => handleMealClick(meal)}
        >
          <ListItemText primary={meal} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Meal Plan - Week 1
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>Day</strong></TableCell>
              <TableCell align="center"><strong>Date</strong></TableCell>
              <TableCell align="center"><strong>Breakfast</strong></TableCell>
              <TableCell align="center"><strong>Lunch</strong></TableCell>
              <TableCell align="center"><strong>Dinner</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mealPlan.map((dayPlan) => (
              <TableRow 
                key={dayPlan.day}
                sx={{
                  '&:hover': {
                    backgroundColor: '#020201',
                    cursor: 'pointer',
                  },
                }}
              >
                <TableCell align="center">{dayPlan.day}</TableCell>
                <TableCell align="center">{dayPlan.date}</TableCell>
                <TableCell align="center" >{renderMealList(dayPlan.meals.breakfast)}</TableCell>
                <TableCell align="center">{renderMealList(dayPlan.meals.lunch)}</TableCell>
                <TableCell align="center">{renderMealList(dayPlan.meals.dinner)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MenuSuggest;
