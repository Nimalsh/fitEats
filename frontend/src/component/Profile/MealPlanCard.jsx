import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
   width: '300px',
  cursor: 'pointer',
  position: 'relative',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[10],
  },
}));

const MealPlanLabel = styled(Typography)(({ theme }) => ({
  backgroundColor: '#ffc107', // Yellow background color
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  fontWeight: 'bold',
  color: theme.palette.common.black,
  marginTop: theme.spacing(1),
  display: 'inline-block', // This makes the width fit the content
}));


const MealPlanCard = ({ meal }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/my-profile/menu-suggest/`);
  };

  return (
    <StyledCard onClick={handleClick}>
      <CardMedia
        component="img"
        height="140"
        image={meal.image}
        alt={meal.title}
      />
      <CardContent>
        <MealPlanLabel variant="subtitle2" component="div">
          MEAL PLANS
        </MealPlanLabel>
        <Typography variant="h6" component="div" sx={{ marginTop: 1 }}>
          {meal.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {meal.description}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default MealPlanCard;
