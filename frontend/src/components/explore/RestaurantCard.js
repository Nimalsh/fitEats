import image from '../../assets/images/foodimages/indian-food-served-on-table.jpg'

import React, { useState } from 'react';
import { ThemeProvider, Stack, Typography, Badge, styled } from '@mui/material';
import theme, { Colours } from '../../assets/theme/theme';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';

// import LatestIcon from '../assets/images/latest_food.png';

const id = "";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 25,
    top: 140,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function ResCard(data) {

  const [Cover1, setCover] = useState(null);

  const image1 = data.data.bImage

  // console.log(data.data.restaurantName);
  // console.log(data.data.bImage);
  // console.log(data.data.rating);

  return (
    <ThemeProvider theme={theme}>
      <Stack
        type="button"
        alignItems="center"
        justifyContent="center"
        className="food-card"
        sx={{
          backgroundColor: Colours.transparenceGrey,
          backdropFilter: "blur(30px)",
          borderRadius: "33px",
          color: Colours.white,
          borderRadius: '10px',
          maxWidth: '260px',
          height: '300px',
          cursor: 'pointer',
          display: "Flex",
          justifyContent: "space-between",
          paddingBottom: '5%',
        }}
      >
        <StyledBadge color="secondary" badgeContent={"5.0"}>
          <img src={image1 !== null ? `data:image/jpeg;base64,${image1}` : image}
            alt="food"
            style={{ width: '252px', height: '150px', border: "5px solid #fff" }} />
        </StyledBadge>
        <Typography fontSize="24px" fontWeight="400" mt="-15px">{data.data.restaurantName}</Typography>


        <Typography fontSize="15px" textAlign="center" mt="-15px" mb="-10px" fontWeight="200">
          {data.data.address}
        </Typography>

        <Typography fontSize="15px" textAlign="center" mt="-15px" mb="-10px" fontWeight="200">
          Colombo
        </Typography>


        {/* to={"/restaurant"} */}
        <IconButton variant='contained' component={Link} to={{ pathname: "/restaurant",}} state= {{ id: data.data.id }}
          style={{
            borderRadius: 10,
            backgroundColor: "#FAC213",
            fontSize: "15px",
            color: "#272727",
            padding: "10px 10px",
            marginLeft: "75%"
          }}
        >
          
          <ArrowForwardIosIcon fontSize='8px' sx={{ color: "#272727" }} />
        </IconButton>


      </Stack>
    </ThemeProvider>
  )
}

export default ResCard