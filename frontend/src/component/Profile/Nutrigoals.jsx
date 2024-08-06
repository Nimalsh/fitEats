import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography, Box, Button, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import HealthIcon from '@mui/icons-material/HealthAndSafety';
import WeightIcon from '@mui/icons-material/Scale';
import FoodLogIcon from '@mui/icons-material/Today';
import MuscleIcon from '@mui/icons-material/FitnessCenter';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import ManIcon from '@mui/icons-material/Man';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '150px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'background-color 0.3s, transform 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'scale(1.05)',
  },
}));

const Nutrigoals = () => {
  const navigate = useNavigate();

  const goals = [
    { icon: <ManIcon  style={{ fontSize: 50 }} />, label: 'BMI Analysis', route: '/my-profile/BMI' },
    { icon: <WeightIcon style={{ fontSize: 50 }} />, label: 'Lose Weight', route: '/my-profile/lose-weight' },
    { icon: <FoodLogIcon style={{ fontSize: 50 }} />, label: 'Meal Log', route: '/my-profile/meal-log' },
    { icon: <HealthIcon style={{ fontSize: 50 }} />, label: 'Personalize plans', route: '/my-profile/personalized-plan' },
    { icon: <PsychologyAltIcon style={{ fontSize: 50 }} />, label: 'Nutri queries', route: '/my-profile/nutri-queries' },
  ];

  const handleItemClick = (route) => {
    if (route) {
      navigate(route);
    }
  };

  

  return (
    <Box sx={{ flexGrow: 1, padding: '16px' }}>
      <Typography variant="h4" gutterBottom align="center">
        WHAT ARE YOUR GOALS?
      </Typography>
      <Grid container spacing={2} justifyContent="center" marginTop={10}>
        {goals.map((goal, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Item onClick={() => handleItemClick(goal.route)}>
              {goal.icon}
              <Typography variant="h6">{goal.label}</Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
      
    </Box>
  );
};

export default Nutrigoals;


