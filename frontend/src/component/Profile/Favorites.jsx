import React from 'react';
import { Container, Grid } from '@mui/material';
import RestaurantHardCodeCard from '../Restaurant/RestaurantHardCodeCard';

const restaurants = [
  {
    id: 1,
    name: 'Sushi Place',
    description: 'Authentic Japanese Sushi',
    address: {
      city: 'Tokyo',
    },
    open: true,
    images: [
      'https://th.bing.com/th/id/R.c10f675e755c4fb52dd367b6e4ae9317?rik=aU2xEMKzYKBxKw&pid=ImgRaw&r=0',
    ],
  },
  {
    id: 2,
    name: 'Pasta Paradise',
    description: 'Delicious Italian Pasta',
    address: {
      city: 'Rome',
    },
    open: false,
    images: [
      'https://cdnassets.hw.net/91/71/65e7a2ce47b18970d0d30e97b8ba/barraval-partisans-herojpg',
    ],
  },
];

const Favorites = () => {
  return (
    <Container>
      
      <Grid sx={{ mt: 2 }} container spacing={3}>
        {restaurants.map((restaurant) => (
          <Grid item key={restaurant.id} xs={12} sm={6} md={4}>
            <RestaurantHardCodeCard item={restaurant} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Favorites;
