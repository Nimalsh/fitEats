import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const FoodCard = ({ name, image, description }) => {
  return (
    <Card sx={{ width: 300 }}>
      <CardMedia
        component="img"
        height="150"
        image={image}
        alt={name}
      />
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Order Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
