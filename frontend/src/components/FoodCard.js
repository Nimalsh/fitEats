import React from 'react'
import {Stack, Typography, Button} from '@mui/material';
import LatestIcon from '../assets/images/latest_food.png';


function FoodCard() {
  return (
    <Stack
        type="button"
        alignItems="center"
        justifyContent="center"
        className="food-card"
        sx={{ background: '#EFEAEA', borderRadius: '20px', width: '283px', height: '360px', cursor: 'pointer', gap: '47px' }}
    >
       
        <img src={LatestIcon} alt="food" style={{width:'140px', height:'130px'}}/>

        <Typography fontSize="24px" fontWeight="bold" color="#272727" textTransform="capitalize" mt="-35px">Food Name</Typography>

        <Typography color="#272727" textAlign="center" mt="-35px" mb="-30px">
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
        </Typography>

        <Button variant='contained' 
        style={{
            borderRadius: 20,
            backgroundColor: "#95CD41",
            fontSize: "18px",
            color:"#272727",
            width:120
         }}
        >
        VIEW
        </Button>

    </Stack>
  )
}

export default FoodCard