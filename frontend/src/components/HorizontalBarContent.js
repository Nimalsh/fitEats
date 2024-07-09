import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import FoodCard from './FoodCard';


import RightArrowIcon from '../assets/images/right-arrow.png';
import LeftArrowIcon from '../assets/images/left-arrow.png';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <img src={LeftArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollNext()} className="left-arrow">
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};




function HorizontalBarContent() {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            
            <Box m = "0 40px">
                <FoodCard />
            </Box>

            <Box m = "0 40px">
                <FoodCard />
            </Box>

            <Box m = "0 40px">
                <FoodCard />
            </Box>

            <Box m = "0 40px">
                <FoodCard />
            </Box>

            <Box m = "0 40px">
                <FoodCard />
            </Box>


    </ScrollMenu>
  )
}

export default HorizontalBarContent