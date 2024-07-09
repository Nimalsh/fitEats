import React from 'react';
import Carousel from 'react-elastic-carousel';

import Summary_Card from './Summary_Card'

const breakpoints = [
  {width:1, itemsToShow: 1},
  {width:550, itemsToShow: 2},
  {width:770, itemsToShow: 3},
  {width:1200, itemsToShow: 4},
]


function CardBarIntake(details) {
  const X = details.details;

  var totalcount = [X.calaries,X.fat, X.protein, X.carbo  ]

  return (

      <div>
        <Carousel breakPoints={breakpoints} pagination={false} disableArrowsOnEnd={true} >
          
          <Summary_Card nutcount = {totalcount[0]} Title = {"Total Daily Calories(g)"} />
          <Summary_Card nutcount = {totalcount[1]} Title = {"Total Daily Fat(g)"} />
          <Summary_Card nutcount = {totalcount[2]} Title = {"Total Daily Protein(g)"} />
          <Summary_Card nutcount = {totalcount[3]} Title = {"Total Daily Carbo(g)"} />

        </Carousel>
      </div>

  )
}

export default CardBarIntake