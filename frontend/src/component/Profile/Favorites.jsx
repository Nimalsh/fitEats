import React from 'react';
import { Container, Grid } from '@mui/material';
import RestaurantHardCodeCard from '../Restaurant/RestaurantHardCodeCard';
import { useSelector } from 'react-redux';

const Favorites = () => {
  const { favorites } = useSelector(state => state.auth);

  return (
    <Container>
      <Grid sx={{ mt: 2 }} container spacing={3}>
        {favorites.map((restaurant) => (
          <Grid item key={restaurant.id} xs={12} sm={6} md={4}>
            <RestaurantHardCodeCard item={restaurant} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Favorites;
