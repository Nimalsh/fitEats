import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import theme from '../../assets/theme/theme'; //to use theme provider,need to import this


function Summary_Card(props) {
  
  return (

    <Box color="#fff" bgcolor="#171717" opacity="10%" width="300px" height="127px" sx={{ borderRadius: '15px',
    [theme.breakpoints.down('lg')]: {
      width:"250px"
     },

     [theme.breakpoints.down('md')]: {
      width:"240px"
     },

     [theme.breakpoints.down('sm')]: {
      mt:"5%",
      width:"200px"
     }
    
    }}>
   
     <CardContent >

      <Typography sx={{ fontSize:"100%", mt:"2%"}} color="#fff" gutterBottom fontWeight="light">
        {props.Title}
      </Typography>

      <Grid display="flex" flex-direction="row">
        
        <Typography sx={{ mb: 1.5, fontSize:"150%" }} color="#fff" fontWeight="bold">
        {props.nutcount}
        </Typography>

        
      </Grid>
      
     
    </CardContent>

    </Box>


  )
}

export default Summary_Card