import React from 'react';
import theme, { Colours } from '../../../assets/theme/theme'; //to use theme provider,need to import this
import { Box, IconButton, Paper, ThemeProvider, Typography } from '@mui/material';
import Gmap from '../RestaurantLocationMap';

import '../../../assets/css/App.css';

// ----------------for the icon---------------------
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

// -------to import forms------------
import { ContactForm } from './EditForms';

// const { decode } = require('pluscodes')
// decode('VVW3+8WF') 

// console.log(decode('VVW3+8WF'))

// -------using props to put random images using props------------------------
const RestaurantEditContact = (props) => {

  
  return (

    // About us main box-----------------------------------------------

    <ThemeProvider theme={theme}>

      <Box maxWidth='100%' sx={{
        padding: '0',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        background: Colours.secondary,
        marginTop: '1rem',
        [theme.breakpoints.down('sm')]: {
          fontSize: '10px',
          padding: '2px',
          flexDirection: 'column',
          justifyContent: 'center',
          justifyItems: 'center',
        }
      }}>
        {/* ------------------details Content Part------------------------------- */}

        {/* Box 1 for image */}
        <Paper sx={{
          bgcolor: '#cfe8fc',
          height: 'auto',
          minHeight: '20vh',
          margin: '0',
          padding: '0',
          width: '40%',
          overflow:"hidden",
          justifyContent: 'center',
          borderRadius: '0px 360px 360px 0px',
          backgroundImage: `url(${props.Map})`,//calling the image as a prop
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
{/*  */}
          {/* ---------enter the map----------- */}
          <Gmap location={props.details.Location}/>
          
        </Paper>
        {/* Box 1 */}

        {/* Box 2 */}
        <Box sx={{
          bgcolor: Colours.grayWhite,
          height: 'auto',
          margin: '0',
          padding: '0',
          width: '60%',
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
            color: Colours.yellow,
            justifyContent: 'center',
            background: Colours.secondary,
            [theme.breakpoints.down('sm')]: {
              fontSize: '8px',
              padding: '2px',
              width: '100%',
            }
          }}>
            <ContactForm />

            <Typography variant="h4" gutterBottom component="div" sx={{
              color: Colours.yellow,
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: '2rem',
              [theme.breakpoints.down('sm')]: {
                fontSize: '16px',
              }
            }}>
              Contact Detail
            </Typography>

            <Typography variant="body1" gutterBottom sx={{
              color: Colours.yellow,
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: '1.4rem',
              padding: '1%',
              [theme.breakpoints.down('sm')]: {
                fontSize: '10px',
              }
            }}>
              {props.details.Location}
              <br />
              {props.details.Address}
              <br />
              {props.details.TpNumber}
            </Typography>

            {/* ------------------------for socail media----------------------- */}
            <Box direction="row" spacing={1} sx={{alignItems:'center',justifyContent:'center', textAlign:'center'}}>
              <IconButton aria-label="social media" sx={{color:Colours.yellow}}>
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="social media" sx={{color:Colours.yellow}}>
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="social media" sx={{color:Colours.yellow}}>
                <EmailIcon />
              </IconButton>
            </Box>

          </Box>
          {/* ---------inner box-------------- */}
        </Box>
        {/* Box 2 */}

      </Box>

    </ThemeProvider >

  )
}

export default RestaurantEditContact
