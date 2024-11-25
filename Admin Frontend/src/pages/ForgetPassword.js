import React from 'react'
import { Box } from '@mui/material';
import ForgetPasswordBanner from '../components/login/ForgetPasswordBanner';
import '../assets/css/Registeruser.css';

// for scroll reveals
import Fade from 'react-reveal/Fade';
import Navbar from '../components/Navbar';

const ForgetPassword = () => {
  return (
    <Box className='Forgetpass-body-Style' >
        <Fade top>
            <Navbar />
        </Fade>
        <ForgetPasswordBanner />
    </Box>
    
  )
}

export default ForgetPassword