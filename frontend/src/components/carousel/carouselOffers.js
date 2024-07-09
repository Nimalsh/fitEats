// horizantal scrollbar

import React from 'react'
import { Box, Typography } from '@mui/material';

import CarouselCardOffers from './CarouselCardOffers';
import theme, { Colours } from '../../assets/theme/theme';
import Carousel from 'react-elastic-carousel'; //for the carousel

// ---------------css for carousel------------------------

// const carousel = ({ data })
// eslint-disable-next-line no-lone-blocks
{/* <div>
      {data.map((item) => (

        <Box
          key = {item.id || item}
        >
          
        </Box>
      )
      )}
    </div> */}


// -----------------arrows for the carousel------------

const carousel = (props) => {

  // console.log(props.item)
  //console.log(props.item)

  const x = props.item

  const data = props.item;
  return (
    <div sx={{ padding: 0, }}>
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
            {props.title}
          </Typography>
        </Box>
        {/* ---------end of title area------------ */}


        {/* ---------------carousel area-------------------------- */}

        <Carousel

          itemsToShow={props.count}
          easing={"ease"}
          breakPoints={theme.breakPoints = [
            { width: 1, itemsToShow: 1 },
            { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
            { width: 1150, itemsToShow: props.count, itemsToScroll: 2 },
            { width: 1450, itemsToShow: 5 },
            { width: 1750, itemsToShow: 6 },
          ]}>

          {Object.keys(x).map((keyName) => (
            // console.log(x[keyName]),

            <CarouselCardOffers data={x[keyName]} />

          ))}
          {/* <Box> */}

          {/* {data.map((items, index) => {
        return (
          <CarouselCardOffers item={items} />
        );
      })} */}
          {/* <CarouselCardOffers item={props.item} />
        <CarouselCardOffers item={props.item} />
        <CarouselCardOffers item={props.item} />
        <CarouselCardOffers item={props.item} />
        <CarouselCardOffers item={props.item} />
        <CarouselCardOffers item={props.item} /> */}

        </Carousel>
        {/* </Box> */}

        {/* ---------------end of carousel area-------------------------- */}

      </Box>
    </div >
  )
}

export default carousel
