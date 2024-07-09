import React from 'react'
import { Box } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Slide from '@mui/material/Slide';


function ContactUs() {
  return (

    <Slide direction="right" in={true}>
      
        <Box sx={{mt:"5%", textAlign:"center", color:"#fff", pb:"5%"}}> 

          <FacebookIcon sx={{fontSize:"350%", pr:"5%", color:"#FAC213"}}  />
          <InstagramIcon sx={{fontSize:"350%", pr:"5%", color:"#FAC213"}} />
          <MailOutlineIcon sx={{fontSize:"350%", color:"#FAC213"}} />
      
        </Box>

    </Slide>
    
  )
}

export default ContactUs;