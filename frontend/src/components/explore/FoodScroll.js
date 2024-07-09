import React from 'react';
import {Box} from '@mui/material';
import Carousel from 'react-elastic-carousel';

import FoodCard from './FoodCard copy'
import FoodCard2 from './FoodCard'

const breakpoints = [
    {width:1, itemsToShow: 1},
    {width:550, itemsToShow: 2},
    {width:770, itemsToShow: 4},
    {width:1200, itemsToShow: 4.5},
]

const foodCards = <div><FoodCard /> <FoodCard2 /></div>;

function FoodScroll(fooddetails) {


const x = fooddetails.fooddetails;

const firstFood = Array.isArray(x) && x.length ? x[0] : {};
const headers = Object.keys(firstFood);

console.log(x);
console.log(headers);


    // const X = [1,2,3,4,5,6,7,8,9,10,11,12,];
    // console.log(X)

  
    //const X = [1,2,3,4,5,6,7,8,9,10,11,12,];

    return (
  
        <Box
        sx = {{
            color: "primary",
            mt: "4%",
            mb: "6%"
        }}>
          <Carousel breakPoints={breakpoints} pagination={true} disableArrowsOnEnd={true} sx={{paddingTop:"1%"}}>
            
          {/* {Array.isArray(X)
           ? 
           X.map(Y=>
                (<FoodCard /> <FoodCard2 /> ))
           : null   
          } */}

          {/* <FoodCard />
          <FoodCard2 />
          <FoodCard />
          <FoodCard2 />
          <FoodCard />
          <FoodCard2 />
          <FoodCard />
          <FoodCard2 /> */}

          {Object.keys(x).map((keyName) => (
          console.log(x[keyName]),
          
          <FoodCard data={x[keyName]} />
          
        ))}
          
          </Carousel>
        </Box>
  
    )
  }
  
export default FoodScroll