import React from 'react';
import theme, { Colours } from '../assets/theme/theme'; //to use theme provider,need to import this
import { Box, Paper, ThemeProvider, Typography } from '@mui/material';

import '../assets/css/App.css';

// -------using props to put random images using props------------------------
const RestaurantAbout = (props) => {
  return (

    // About us main box-----------------------------------------------


    <ThemeProvider theme={theme}>

      <Box maxWidth='100%' sx={{
        padding: '0',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        background: Colours.secondary,
        [theme.breakpoints.down('sm')]: {
          fontSize: '10px',
          padding: '2px',
          flexDirection: 'column',
          justifyContent: 'center',
          justifyItems: 'center',
        }
      }}>
        {/* ------------------About us Content Part------------------------------- */}

        {/* Box 1 for image */}
        <Paper sx={{
          bgcolor: '#cfe8fc',
          height: 'auto',
          minHeight: '20vh',
          margin: '0',
          padding: '0',
          width: '30%',
          justifyContent: 'center',
          borderRadius: '0px 360px 360px 0px',
          backgroundImage: `url(${props.AboutImage})`,//calling the image as a prop
          backgroundRepeat: 'no-repeat',
          // backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
            padding: '2px',
            width: '60%',
            height: '10vh',
            minHeight: '10vh',
            borderRadius: '36px',
            backgroundSize: 'cover',
            marginLeft: '20%',
          }
        }}>
        </Paper>
        {/* Box 1 */}

        {/* Box 2 */}
        <Box sx={{
          bgcolor: Colours.grayWhite,
          height: 'auto',
          margin: '0',
          padding: '0',
          width: '70%',
          justifyContent: 'center',
          background: Colours.secondary,
          [theme.breakpoints.down('sm')]: {
            fontSize: '8px',
            padding: '2px',
            width: '100%',
          }
        }}>
          {/* ---------inner box-------------- */}
          <Box sx={{
            bgcolor: Colours.grayWhite,
            height: 'auto',
            margin: '0',
            padding: '0',
            width: '100%',
            justifyContent: 'center',
            background: Colours.secondary,
            [theme.breakpoints.down('sm')]: {
              fontSize: '8px',
              padding: '2px',
              width: '100%',
            }
          }}>

            <Typography variant="h5" gutterBottom component="div" sx={{
              color: Colours.grayWhite,
              justifyContent: 'center',
              textAlign: 'center',
              [theme.breakpoints.down('sm')]: {
                fontSize: '16px',
              }
            }}>
              About us
            </Typography>

            <Typography variant="body1" gutterBottom sx={{
              color: Colours.grayWhite,
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: '1rem',
              padding: '1%',
              [theme.breakpoints.down('sm')]: {
                fontSize: '10px',
              }
            }}>
              {props.details.detail1}
              <br />
              {props.details.detail2}
              <br />
              {props.details.detail3}
            </Typography>

          </Box>
          {/* ---------inner box-------------- */}
        </Box>
        {/* Box 2 */}

      </Box>

    </ThemeProvider >

  )
}

export default RestaurantAbout
