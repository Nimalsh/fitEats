import React from 'react';
import { Box } from '@mui/material';
import Carousel from 'react-elastic-carousel';

import RestaurantCard from './RestaurantCard'

const breakpoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 770, itemsToShow: 4 },
  { width: 1200, itemsToShow: 4.5 },
]

function FoodScroll(details) {


  // const X = [1,2,3,4,5,6,7,8,9,10,11,12,];

  const x = details.details;

  const firstDog = Array.isArray(x) && x.length ? x[0] : {};
  const headers = Object.keys(firstDog);
  
  return (

    <Box
      sx={{
        color: "primary",
        mt: "4%",
        mb: "6%"
      }}>
      <Carousel breakPoints={breakpoints} pagination={true} disableArrowsOnEnd={true} sx={{ paddingTop: "1%" }}>

        {Object.keys(x).map((keyName) => (
          
          <RestaurantCard data={x[keyName]} />
          
        ))}

      </Carousel>
    </Box>

  )
}

export default FoodScroll