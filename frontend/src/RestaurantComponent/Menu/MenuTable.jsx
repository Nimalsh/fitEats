import { Delete } from '@mui/icons-material';
import CreateIcon from '@mui/icons-material/Create';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteFoodAction, getMenuItemsByRestaurantId } from '../../component/State/Menu/Action';

export const MenuTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, menu } = useSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(getMenuItemsByRestaurantId({
        restaurantId: restaurant.usersRestaurant.id,
        jwt,
        vegetarian: false,
        seasonal: false,
        nonveg: false,
        foodCategory: ""
      }));
    }
  }, [dispatch, jwt, restaurant.usersRestaurant]);

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({ foodId, jwt }));
  };

  const handleViewDetails = (foodId) => {
    navigate(`/admin/restaurant/menu/food-details/${foodId}`);
  };
  


  return (
    <Box> 
      <Card className="mt-2">
        <CardHeader
          action={
            <IconButton onClick={() => navigate("/admin/restaurant/add-menu")} aria-label='settings'>
              <CreateIcon /> 
            </IconButton>
          }
          title={"All Food Items"}
          sx={{ pt: 2, alignItems: "center" }}
        />
      </Card>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {menu.menuItems && menu.menuItems.length > 0 ? (
          menu.menuItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card style={{ background: '#555555' }}>
                <CardContent>
                  <Box display="flex" justifyContent="center">
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      style={{ 
                        width: 180, 
                        height: 150, 
                        borderRadius: '10%', 
                        marginBottom: '10px' 
                      }} 
                    />
                  </Box>
                  <Typography variant="h5" align="center" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center">
                    Rs.{item.price}/=
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ fontWeight: 'bold' }} 
                    onClick={() => handleViewDetails(item.id)}
                  >
                    View Details
                  </Button>
                  <IconButton color="error" onClick={() => handleDeleteFood(item.id)}>
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
              No Menu Items Found
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
