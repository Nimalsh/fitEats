import React from 'react'
import { Box } from '@mui/material';
import RegisterBanner0 from '../../components/Register/RegisterBanner0';
import '../../assets/css/Registeruser.css';
import Navbar from './../../components/Navbar';
import Fade from 'react-reveal/Fade';


const Signup = () => {
  return (
    <Box className='Registerrole-body-Style' >

        <Fade top>
          <Navbar />
        </Fade>
    

        <RegisterBanner0 />

    </Box>
    
  )
}

export default Signup