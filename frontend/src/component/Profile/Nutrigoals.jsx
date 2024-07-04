import React from 'react';
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
  const goals = [
    { icon: <ManIcon />, label: 'BMI Analysis' },
    { icon: <WeightIcon />, label: 'Lose Weight' },
    { icon: <MuscleIcon />, label: 'Build Muscle' },
    { icon: <FoodLogIcon />, label: 'Meal Log' },
    { icon: <HealthIcon />, label: 'Personalize plans' },
    { icon: <PsychologyAltIcon />, label: 'Nutri queries' },
  ];

  return (
    <Box sx={{ flexGrow: 1, width: '100%', maxWidth: 360, margin: '0 auto', padding: '16px' }}>
      <Typography variant="h6" gutterBottom align="center">
        WHAT ARE YOUR GOALS?
      </Typography>
      <Grid container spacing={2}>
        {goals.map((goal, index) => (
          <Grid item xs={6} key={index}>
            <Item>
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
