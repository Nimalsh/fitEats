import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography, Box } from '@mui/material';
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
    { icon: <ManIcon />, label: 'BMI Analysis', route: '/my-profile/BMI' },
    { icon: <WeightIcon />, label: 'Lose Weight',route: '/my-profile/lose-weight' },
    { icon: <MuscleIcon />, label: 'Build Muscle',route: '/my-profile/build-muscle' },
    { icon: <FoodLogIcon />, label: 'Meal Log',route: '/my-profile/meal-log' },
    { icon: <HealthIcon />, label: 'Personalize plans',route: '/my-profile/personalized-plan' },
    { icon: <PsychologyAltIcon />, label: 'Nutri queries',route: '/my-profile/nutri-queries' },
  ];

  const handleItemClick = (route) => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, width: '100%', maxWidth: 360, margin: '0 auto', padding: '16px' }}>
      <Typography variant="h6" gutterBottom align="center">
        WHAT ARE YOUR GOALS?
      </Typography>
      <Grid container spacing={2}>
        {goals.map((goal, index) => (
          <Grid item xs={6} key={index}>
            <Item onClick={() => handleItemClick(goal.route)}>
              {goal.icon}
              <Typography variant="subtitle1">{goal.label}</Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Nutrigoals;

