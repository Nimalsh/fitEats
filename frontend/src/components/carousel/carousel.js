// horizantal scrollbar

import React from 'react'
import { Box, Typography } from '@mui/material';

import CarouselCard from './CarouselCardMenu';
import theme, { Colours } from '../../assets/theme/theme';
import Carousel from 'react-elastic-carousel'; //for the carousel


// -----------------arrows for the carousel------------

const carousel = (props) => {

  const data = props.item;
  // const resId = props.resId;
  const RestId = props.RestId;
  // console.log(props);

  return (
    <div sx={{ padding: 0 }}>
      {/*------------------------- carousel area--------------------- */}
      <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '2%',
        padding: 0,
        background: Colours.secondary,
        backgroundImage: `url(${props.bimage})`,
      }}>
        {/* ---------title area------------ */}
        <Box sx={{
          width: '100%',
        }}>

          <Typography variant="h4" gutterBottom component="div" sx={{
            width: '100%',
            textAlign: 'center',
            color: Colours.green,
            [theme.breakpoints.down('sm')]: {
              fontSize: '20px',
              padding: '2px',
            },
          }}>
            
            Menu

          </Typography>
        </Box>
        {/* ---------end of title area------------ */}


        {/* ---------------carousel area-------------------------- */}

        <Carousel
          itemsToShow={3}
          easing={"ease"}
          breakPoints={theme.breakPoints = [
            { width: 1, itemsToShow: 1 },
            { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
            { width: 1150, itemsToShow: props.count, itemsToScroll: 2 },
            { width: 1450, itemsToShow: 5 },
            { width: 1750, itemsToShow: 6 },
          ]}>
          {/* <Box> */}

          {Object.keys(data).map((key, index) => (

            
            <CarouselCard item={data[index]} RestId={RestId}/>

          ))}

          {/* <CarouselCard item={props.item} />
        <CarouselCard item={props.item} />
        <CarouselCard item={props.item} />
        <CarouselCard item={props.item} />
        <CarouselCard item={props.item} />
        <CarouselCard item={props.item} /> */}

        </Carousel>


        {/* </Box> */}
        {/* ---------------end of carousel area-------------------------- */}

      </Box>
    </div >
  )
}

export default carousel
