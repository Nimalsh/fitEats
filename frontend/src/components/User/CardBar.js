import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Carousel from 'react-elastic-carousel';

import Summary_Card from './Summary_Card'
import theme, { Colours } from '../../assets/theme/theme'; //to use theme provider,need to import this
import { width } from '@mui/system';

const breakpoints = [
  {width:1, itemsToShow: 1},
  {width:550, itemsToShow: 2},
  {width:770, itemsToShow: 3},
  {width:1200, itemsToShow: 4},
]


function CardBar(details) {
  const X = details.details;

  
  return (

      <div>
        <Carousel breakPoints={breakpoints} pagination={false} disableArrowsOnEnd={true} >
          
        {Array.isArray(X)
         ? 
         X.map(Y=>
              (<Summary_Card Title={Y[0]} nutcount={Y[1]} icon={Y[2]} />))
         : null   
        }
        
        </Carousel>
      </div>

  )
}

export default CardBar