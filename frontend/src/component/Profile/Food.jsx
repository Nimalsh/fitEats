import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import Header from './Header'; // Adjust the import path based on your file structure
import FoodCard from './FoodCard'; // Adjust the import path based on your file structure
import RestaurantCard from '../Restaurant/RestaurantCard';
import { getAllRestaurantsAction } from '../State/Restaurant/Action';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../State/store';

const foodItems = [
  { id: 1, category: 'Pizzas', name: 'Pepperoni Pizza', image: 'https://www.simplyrecipes.com/thmb/KE6iMblr3R2Db6oE8HdyVsFSj2A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-1024x682-583b275444104ef189d693a64df625da.jpg', description: 'Delicious pepperoni pizza' },
  { id: 2, category: 'Sides', name: 'Garlic Bread', image: 'https://www.simplyrecipes.com/thmb/KE6iMblr3R2Db6oE8HdyVsFSj2A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-1024x682-583b275444104ef189d693a64df625da.jpg', description: 'Tasty garlic bread' },
  { id: 3, category: 'Drinks', name: 'Coca Cola', image: 'https://www.simplyrecipes.com/thmb/KE6iMblr3R2Db6oE8HdyVsFSj2A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-1024x682-583b275444104ef189d693a64df625da.jpg', description: 'Refreshing Coca Cola' },
  { id: 4, category: 'Combos', name: 'Pizza Combo', image: 'https://www.simplyrecipes.com/thmb/KE6iMblr3R2Db6oE8HdyVsFSj2A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-1024x682-583b275444104ef189d693a64df625da.jpg', description: 'Pizza combo with drink and side' },
  // Add more food items as needed
];


const restaurants=[1,1,1,1,1]
const Food = () => {

  const dispatch =useDispatch()
  const jwt=localStorage.getItem("jwt")
  const {restaurant}=useSelector(store=>store)

  useEffect(()=>{
    dispatch(getAllRestaurantsAction(jwt))
  },[])

  
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleTabChange = (category) => {
    setSelectedCategory(category);
  };

  const getCategoryName = (category) => {
    switch (category) {
      case 1:
        return 'Pizzas';
      case 2:
        return 'Sides';
      case 3:
        return 'Drinks';
      case 4:
        return 'Combos';
      default:
        return 'All';
    }
  };

  const filteredItems = selectedCategory === 0
    ? foodItems
    : foodItems.filter(item => item.category === getCategoryName(selectedCategory));

  return (
    <div>
      <Header onTabChange={handleTabChange} />
      <Container>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6"></Typography>
          <Grid container spacing={2}>
            {restaurant.restaurants.map(item => (                                                  //   {filteredItems.map(item => (  
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <RestaurantCard item={item}/>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Food;
