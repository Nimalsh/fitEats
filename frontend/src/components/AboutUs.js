import React from 'react'
import { Box, Typography } from '@mui/material';
import FOODIFY_ABOUTUS from '../assets/images/foodify_aboutus.png';


function AboutUs() {
  return (
    <Box sx={{mt:{lg:'150px', xs:'70px'},ml:{sm:'50px'}}}
    position="relative" p="20px">

        <img src={FOODIFY_ABOUTUS} alt="banner" className='hero-aboutus-img' />
        
        
        <Typography color="#EFEAEA" fontWeight="400" fontSize="40px" 
        
        sx={{mt:{lg:'-70px', xs:'70px'},ml:{sm:'600px'}}}>
          About Us
        </Typography>

        <Typography color="#FFFFFF" fontWeight="200" sx={{fontSize:{lg:'20px', xs:'40px'},ml:{sm:'600px'}}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
        <br />
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi 
        <br />
        tincidunt ornare massa eget egestas. Cum sociis natoque penatibus et 
        <br />
        magnis dis parturient montes. Consectetur a erat nam at lectus urna.
        </Typography>

    </Box>
  )
}

export default AboutUs