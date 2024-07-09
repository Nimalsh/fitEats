import React, { Component } from 'react';
import Carousel from 'react-elastic-carousel';

import Summary_Card from './profile_summary_card';

const breakpoints = [
  {width:1, itemsToShow: 1},
  {width:550, itemsToShow: 2},
  {width:770, itemsToShow: 3},
  {width:1200, itemsToShow: 4},
 
]


function CardBar(details) {
  
  
  const X = details.details;
  return (

      <div >
        <Carousel breakPoints={breakpoints} pagination={false} disableArrowsOnEnd={true}  >
          
        {Array.isArray(X)
         ? 
         X.map(Y=>
              (<Summary_Card Title={Y[0]} Count={Y[1]} icon={Y[2]}/> ))
         : null   
        }
        
        </Carousel>
      </div>

  )
}

export default CardBar