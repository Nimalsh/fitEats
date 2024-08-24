import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFoodDetails } from '../../component/State/Menu/Action';

export const FoodDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  
  // Get the food details and loading state from the Redux store
  const { foodDetails, loading, error } = useSelector((store) => store.foodDetails);

  useEffect(() => {
    dispatch(getFoodDetails(id, jwt));
  }, [dispatch, id, jwt]);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <Typography variant="h6" color="error">Error loading food details: {error}</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      {foodDetails ? (
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>{foodDetails.name}</Typography>
          <Box display="flex" justifyContent="center" mb={2}>
            <img 
              src={foodDetails.images[0]} 
              alt={foodDetails.name} 
              style={{ width: 300, height: 200, borderRadius: '10%' }} 
            />
          </Box>
          <Typography variant="h6" gutterBottom>Description</Typography>
          <Typography variant="body1">{foodDetails.description}</Typography>
          <Typography variant="h6" gutterBottom>Price</Typography>
          <Typography variant="body1">Rs. {foodDetails.price}/=</Typography>
          <Typography variant="body1">{foodDetails.vegetarian}</Typography>
          {/* You can add more details about the food item here */}
        </Paper>
      ) : (
        <Typography variant="h6">Food details not found.</Typography>
      )}
    </Box>
  );
};
 
