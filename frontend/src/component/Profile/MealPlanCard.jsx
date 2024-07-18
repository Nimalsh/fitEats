import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const MealPlanCard = ({ meal }) => {

  const navigate = useNavigate();
  const handleClick = () => {
    
    navigate(`/my-profile/menu-suggest/`); 
  };


  return (
    <Card sx={{ maxWidth: 345 }} onClick={handleClick} style={{ cursor: 'pointer' }}>
      <CardMedia
        component="img"
        height="140"
        image={meal.image}
        alt={meal.title}
      />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography gutterBottom variant="subtitle2" component="div">
            MEAL PLANS
          </Typography>
        </Box>
        <Typography variant="h6" component="div">
          {meal.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {meal.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MealPlanCard;
