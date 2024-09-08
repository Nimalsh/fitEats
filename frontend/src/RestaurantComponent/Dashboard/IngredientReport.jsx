import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { FaDownload } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsOfRestaurant } from '../../component/State/ingredients/Action';

export const IngredientReport = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients } = useSelector((store) => store);

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      console.log("Fetching ingredients for restaurant:", restaurant.usersRestaurant.id); // Debugging log
      dispatch(
        getIngredientsOfRestaurant({
          jwt,
          id: restaurant.usersRestaurant.id, // Correct ID usage
        })
      );
    }
  }, [dispatch, jwt, restaurant.usersRestaurant]); 

  // Correct filter for ingredients that are out of stock
  const outOfStockIngredients = ingredients.ingredients?.filter(
    (ingredient) => ingredient.inStoke === false
  );

  console.log("All ingredients data:", ingredients.ingredients); // Debugging log for all ingredients
  console.log("Out of stock ingredients:", outOfStockIngredients); // Debugging log for out-of-stock ingredients

  return (
    <>
      <Typography variant="h4" sx={{ margin: 4 }}>
        Ingredient Report
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60%', margin: '0 auto' }}>
        <TableContainer component={Paper} sx={{ marginBottom: 4, width: '100%', maxWidth: '800px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h6">Ingredients Out of Stock</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {outOfStockIngredients && outOfStockIngredients.length > 0 ? (
                outOfStockIngredients.map((ingredient) => (
                  <TableRow key={ingredient.id}>
                    <TableCell align="center">{ingredient.name}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center">
                    <Typography>No ingredients are out of stock.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          sx={{
            justifyContent:'space-between',
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight:'bold',
            background: '#95CD41',
            '&:hover': {
              background: '#7baf30',
            },
          }}
        >
          <FaDownload/> Download
        </Button>
      </Box>
    </>
  );
};
