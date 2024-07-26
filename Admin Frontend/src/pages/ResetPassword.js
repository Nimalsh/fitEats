import React from 'react'
import { Box } from '@mui/material';
import ResetPasswordBanner from '../components/login/ResetPasswordBanner';
import '../assets/css/Registeruser.css';

// for scroll reveals
import Fade from 'react-reveal/Fade';
import Navbar from '../components/Navbar';


const ResetPassword = () => {
  return (
    <Box className='Forgetpass-body-Style' >
        <Fade top>
            <Navbar />
        </Fade>
        <ResetPasswordBanner />

    </Box>
    
  )
}

export default ResetPassword