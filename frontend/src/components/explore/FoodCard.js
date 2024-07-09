import image from '../../assets/images/foodimages/indian-food-served-on-table.jpg'

import React from 'react'
import {ThemeProvider,Stack, Typography, Button, Badge, styled} from '@mui/material';
import theme, { Colours } from '../../assets/theme/theme';
import { Box } from '@mui/system';
import {Link} from 'react-router-dom';
// import LatestIcon from '../assets/images/latest_food.png';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 25,
    top: 140,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },

  '& img':{
    width:'252px', 
    height:'150px',
    border: "5px solid #fff",
    [theme.breakpoints.down('sm')]: {
      width: '200px',}
  }
}));

function FoodCard() {
  return (
    <ThemeProvider theme={theme}>
    <Stack
        type="button"
        alignItems="center"
        justifyContent="center"
        className="food-card"
        sx={{ 
          backgroundColor:Colours.transparenceGrey,
          backdropFilter: "blur(30px)",
          borderRadius:"33px" ,
          color:Colours.white, 
          borderRadius: '10px', 
          maxWidth: '260px', 
          height: '320px', 
          cursor: 'pointer', 
          display:"Flex",
          justifyContent: "space-between",
          paddingBottom: '5%',
          [theme.breakpoints.down('sm')]: {
             maxWidth: '360px',  
          }
           }}
    >
        <StyledBadge color="secondary" badgeContent={4.9}>
          <img src={image} alt="food" />
        </StyledBadge>

        <Typography fontSize="24px" fontWeight="400" mt="-45px" sx={{[theme.breakpoints.down('sm')]: {fontSize: "20px", mt:"-30px"}}}>Mini Veg Salad</Typography>
        <Typography textAlign="center" mt="-45px" mb="-30px" fontWeight="200" fontSize="15px" sx={{[theme.breakpoints.down('sm')]: { mt:"-30px"}}}>
                 Rs.1000.00
        </Typography>

        <Typography textAlign="center" mt="-25px" mb="-30px" fontWeight="200" sx={{[theme.breakpoints.down('sm')]: {mt:"0px", mb:"-20px"}}}>
                 Restaurant Name
        </Typography>

        <Box
          sx={{
            display: 'flex',
            columnGap:"10px",
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
              rowGap: '10px',
            }
        }}>
          <Button component={Link} to="/Restaurant/Category/Orderfood" variant='contained' 
          style={{
            borderRadius: 10,
            backgroundColor: "#95CD41",
            fontSize: "15px",
            color:"#272727",
            width:"120",
          }}
          >
          Order Now
          </Button>
          {/* <Button variant='contained' 
          style={{
              borderRadius: 10,
              backgroundColor: "#95CD41",
              fontSize: "15px",
              color:"#272727",
              width:"120",
              padding:"0px 15px",
          }}
          >
          View 
          <ArrowForwardIosIcon fontSize='8px' sx={{color:"#272727", marginLeft:"2px"}}/>
          </Button> */}
        </Box>

    </Stack>
    </ThemeProvider>
  )
}

export default FoodCard