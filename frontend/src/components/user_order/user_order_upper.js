import React from 'react';
import { Box } from '@mui/material';
import theme, { Colours } from '../../assets/theme/theme'; //to use theme provider,need to import this
import '../../assets/css/Profile.css';
import Pickup from '../../assets/images/pickup.png';
import Gmap from '../../components/user_order/order_google_map';



const RestaurantOrder = (props) => {


  return (
    <Box marginTop="0px">
      <img className='pickupcss'
      src={Pickup}/>
      <Box
      sx={{
       color:Colours.white,
       fontSize:35,
       marginTop:'3%',
       marginLeft:'2%',
       [theme.breakpoints.down('sm')]: {
        fontSize: 28,
        marginTop:'3%',
        marginLeft:'2%',
      },
      }}
      >{props.details3[0]}</Box>


      {/* map */}
      <Box >
      <Gmap/>
     
      </Box>


    </Box>

    
  )
}


export default RestaurantOrder



