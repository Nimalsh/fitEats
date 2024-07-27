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
    { icon: <ManIcon />, label: 'BMI Analysis', route: '/my-profile/BMI' },
    { icon: <WeightIcon />, label: 'Lose Weight', route: '/my-profile/lose-weight' },
    { icon: <MuscleIcon />, label: 'Build Muscle', route: '/my-profile/build-muscle' },
    { icon: <FoodLogIcon />, label: 'Meal Log', route: '/my-profile/meal-log' },
    { icon: <HealthIcon />, label: 'Personalize plans', route: '/my-profile/personalized-plan' },
    { icon: <PsychologyAltIcon />, label: 'Nutri queries', route: '/my-profile/nutri-queries' },
  ];

  const handleItemClick = (route) => {
    if (route) {
      navigate(route);
    }
  };

  const nutritionists = [
    {
      name: 'Dr. Alice Johnson',
      title: 'Dietitian & Nutritionist',
      description: 'Specializes in weight management and personalized diet plans.',
      image: 'https://img.freepik.com/premium-photo/portrait-young-girl_93675-32518.jpg?w=360',
    },
    {
      name: 'Dr. Jane Smith',
      title: 'Clinical Nutritionist',
      description: 'Expert in clinical nutrition and dietary therapy.',
      image: 'https://img.freepik.com/free-photo/front-view-business-woman-suit_23-2148603018.jpg?t=st=1721378464~exp=1721382064~hmac=904c81b37e6b5889b23db6e35e46763b84c7be19fcf5ab9f4e7b52a8c79107f8&w=740',
    },
    {
      name: 'Dr. John Doe',
      title: 'Sports Nutritionist',
      description: 'Focuses on nutrition for athletic performance and recovery.',
      image: 'https://img.freepik.com/free-photo/office-happy-man-work_144627-6324.jpg?t=st=1721378495~exp=1721382095~hmac=3c2fbc25c73af5a6164a1fd86f5d6c070d67b8c4a729f72ce1dd4d349fdfd5f7&w=360',
    },
    {
      name: 'Dr. Emily Davis',
      title: 'Pediatric Nutritionist',
      description: 'Specializes in child nutrition and dietary needs.',
      image: 'https://img.freepik.com/free-photo/portrait-business-woman-office_1398-6.jpg?t=st=1721378515~exp=1721382115~hmac=f19c68a1500e9662e8550753e7799d3ed469daa3f7fbc7ded9b1aa33ca04a92f&w=360',
    },
    {
      name: 'Dr. Rachel Green',
      title: 'Holistic Nutritionist',
      description: 'Integrates holistic approaches with modern nutrition science.',
      image: 'https://img.freepik.com/free-photo/elegant-business-woman_23-2147626296.jpg?t=st=1721378546~exp=1721382146~hmac=be0bc3bf8ad21595e024c0ac90eb67d272387dcbf2d119292cad79d08813e778&w=360',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: '16px' }}>
      <Typography variant="h4" gutterBottom align="center">
        WHAT ARE YOUR GOALS?
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {goals.map((goal, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Item onClick={() => handleItemClick(goal.route)}>
              {goal.icon}
              <Typography variant="h6">{goal.label}</Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ marginTop: '32px' }}>
        <Typography variant="h5" gutterBottom align="center">
          Nutritionist Profiles
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {nutritionists.map((nutritionist, index) => (
            <Grid item xs={12} key={index}>
              <Paper sx={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
                <Avatar
                  sx={{ marginRight: '16px', width: 56, height: 56 }}
                  src={nutritionist.image}
                  alt={nutritionist.name}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{nutritionist.name}</Typography>
                  <Typography variant="body2">{nutritionist.title}</Typography>
                  <Typography variant="body2">{nutritionist.description}</Typography>
                </Box>
                <Button variant="contained" color="primary">
                  view profile
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Nutrigoals;


