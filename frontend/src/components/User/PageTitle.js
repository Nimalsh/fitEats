import React from 'react'
import theme, { Colours } from '../../assets/theme/theme'; //to use theme provider,need to import this
import { Typography } from '@mui/material';
import '../../assets/css/App.css';

function PageTitle(props) {
  return (
    <Typography variant="h3" gutterBottom component="div" sx={{
        color: Colours.grayWhite,
        ml:"4%",
        mt:"3%",

        // Changing font family 
        fontFamily:"Poppins",
        [theme.breakpoints.down('sm')]: {
          fontSize: '220%',
          mt:"5%",
          ml:"5%"
        }
      }}>
        {props.MainHeader}
      </Typography>
  )
}

export default PageTitle