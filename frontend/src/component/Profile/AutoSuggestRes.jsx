import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction } from '../State/Restaurant/Action';
import RestaurantCard from '../Restaurant/RestaurantCard';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const AutoSuggestRes = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector(store => store);

  const queryParams = new URLSearchParams(location.search);
  const meal = queryParams.get('meal');

  useEffect(() => {
    dispatch(getAllRestaurantsAction(jwt));
  }, [dispatch, jwt]);

  const filteredRestaurants = restaurant.restaurants.filter(item => 
    item.name && meal && item.name.toLowerCase().includes(meal.toLowerCase())
  );

  return (
    <Container>
      <Box sx={{ mt: 9 }}>
        <Typography variant="h6">Suggested Restaurants for: {meal}</Typography>
        {filteredRestaurants.length > 0 ? (
          <Grid container spacing={2}>
            {filteredRestaurants.map(item => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <RestaurantCard item={item} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection:'raw',
              justifyContent: 'center',
              alignItems: 'center',
              height: '40vh',
              width:'40vh',
              flexDirection: 'column',
              bgcolor: '#252323',
              boxShadow: 3,
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
            }}
          >
            <SentimentDissatisfiedIcon sx={{ fontSize: 50 }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              No food suggestions available
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default AutoSuggestRes;
