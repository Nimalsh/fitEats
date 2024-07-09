import React, { useState } from 'react';
import { useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import theme, { Colours } from '../../assets/theme/theme'; //to use theme provider,need to import this
import '../../assets/css/Profile.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import authHeader from "../../services/auth-header";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';

import '../../assets/css/Profile.css';

// ---------------------for the time picker-----------------
// import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const Userorderform = (props) => {

  const details1 = props.details1;
  const details2 = props.details2;
  const details3 = props.details3;
  const price = props.price;

  var todayDate = new Date();

  // -------------------------------for the time picker-----------------------------------

  const [locale, setLocale] = React.useState('en');
  const [datePickerValue, setDatePickerValue] = React.useState(todayDate);

  const [timePickerValue, setTimePickerValue] = React.useState(todayDate);

  const Date1 = new Date(datePickerValue);
  const Time1 = new Date(timePickerValue);


  const navigate = useNavigate();

  // ----------------------------end of time picker---------------------------------------

  // -----------------adding Order--------------------
  const makeOrder = () => {

    // console.log(items);

    var d = new Date,
      dformat = [Time1.getFullYear(),
      Time1.getMonth() + 1,
      Time1.getDate()].join('-') + 'T' +
        [Time1.getHours(),
        Time1.getMinutes(),
        Time1.getSeconds()].join(':');

    // for the time
    var d1 = new Date,
      dDate = [Date1.getFullYear(),
      Date1.getMonth() + 1,
      Date1.getDate()].join('-') + 'T' +
        [Date1.getHours(),
        Date1.getMinutes(),
        Date1.getSeconds()].join(':');

    console.log(dformat);

    const setOrder = async () => {
      try {

        const orderData = new FormData();
        orderData.append('date1', dDate);
        orderData.append('time1', dformat);

        const order = {
          "orderDate": Date1,
          "orderTime": Time1
        }

        console.log(Date1);
        console.log(Time1);
        console.log(orderData);
        // setItemData(itemData);

        const resp2 = await axios.post("http://localhost:8072/FoodiFy/User/setOrder", orderData, { headers: authHeader() });
        console.log("success");
        navigate("/restaurant")
        // const details2 = resp2.data;
        // setDetails2({ ...details2 });


      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };

    setOrder();

  };

  return (

    <Grid container spacing={2} columns={16} sx={{
      marginLeft: '3%',
    }}>
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography sx={{
            color: Colours.white,
            fontSize: 28,
            marginTop: '3%',
            marginLeft: '3%',
            fontFamily: 'Poppins',
          }}>
            {details3[0]}</Typography>


          <Typography sx={{
            color: Colours.white,
            marginTop: '0%',
            marginLeft: '3%',
            fontSize: 14,
          }}>{details3[1]}</Typography>
        </Box>

        {/* payment code */}

        {/* <Box>
          <Typography sx={{
            color: Colours.white,
            fontSize: 28,
            marginTop: '8%',
            marginLeft: '3%',
            fontFamily: 'Poppins',
          }}>
            Payment</Typography>



          <Typography sx={{
            color: Colours.white,
            marginTop: '3%',
            marginLeft: '8%',
            fontSize: 14,
          }}>Apply the promo code

          </Typography>

          <Button xs={12} sm={6} href='#' variant="contained" sx={{
            marginLeft: '10%',
            marginTop: '6%',
            marginBottom: '6%',
            background: Colours.green, '&:hover': {
              backgroundColor: Colours.yellow,
            },
            color: Colours.dark,
            fontSize: '20px',
            fontFamily: 'Poppins',
            hover: Colours.yellow,
            [theme.breakpoints.down('sm')]: {
              fontSize: '18px',
              marginLeft: '20%',
              width: '50%',


            },
          }}>
            APPLY
          </Button>
        </Box> */}

        <Box sx={{
          width: '100%',
          height: '0.2%',
          backgroundColor: Colours.white,
          marginTop: '3%'
        }}></Box>


        {/* food items */}
        <Box>
          <Typography sx={{
            color: Colours.white,
            fontSize: 28,
            marginTop: '6%',
            marginLeft: '3%',
            marginBottom: '6%',
            fontFamily: 'Poppins',
          }}>
            Food Items</Typography>



          <Typography>

            {/* -----------------------items list------------------------- */}

            <Box
              sx={{
                width: '80%',
                marginLeft: '5%',
                height: 'auto',
                backgroundColor: Colours.transparenceGrey,
                color: Colours.white,
                padding: '5%',
              }}
              display="flex" justifyContent="space-between">
              <p>Image</p>
              <p>Quantity</p>
              <p>Name</p>
              <p>Price</p>
            </Box>
            {
              Array.from(details1).map((item, index) => {
                // console.log(index);
                return (

                  <Box
                    key={item.id}
                    sx={{
                      width: '80%',
                      marginLeft: '5%',
                      height: 'auto',
                      backgroundColor: Colours.transparenceGrey,
                      color: Colours.white,
                      padding: '5%',
                    }}
                    display="flex" justifyContent="space-between">
                    <img className='pickupfoodstyle' src={`data:image/jpeg;base64,${item.image.data}`} />
                    <p>{details2[index]}</p>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                  </Box>

                )

              })
            }



          </Typography>


        </Box>

        <Box sx={{
          width: '100%',
          height: '0.2%',
          backgroundColor: Colours.white,
          marginTop: '8%',
          marginBottom: '8%',
        }}></Box>


      </Grid>

      {/* Right side  */}
      <Grid item xs={12} sm={6}>
        {/* ------------------------------final checkout form-------------------------- */}
        <Box className="Pickup-body-Style"
          component="form"
          autoComplete="off"
          sx={{
            width: '80%',
            height: '70%',
            backgroundColor: Colours.transparenceGrey,
            padding: '5%',
            paddingTop: '30%',
            marginLeft: '60%',
            marginTop: '20%',
            marginBottom: '10%',
            color: Colours.white,
            borderRadius: '33px',
            [theme.breakpoints.down('sm')]: {

              marginLeft: '4%',
              width: '80%'


            },

          }}>

          {/* -------------------estimate time-------------------- */}
          {/* pick up estimate */}
          <Box>
            <Typography sx={{
              color: Colours.white,
              fontSize: 28,
              marginTop: '8%',
              marginLeft: '3%',
              fontFamily: 'Poppins',
            }}>
              Pick Up Time</Typography>
          </Box>

          {/* --------------------------------------localize time picker--------------------------- */}
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
            <Stack spacing={3}>

              <DatePicker
                value={datePickerValue}
                onChange={(newValue) => setDatePickerValue(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />

              <TimePicker
                value={timePickerValue}
                onChange={(newValue) => setTimePickerValue(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />

            </Stack>
          </LocalizationProvider>

          {/* ---------------------------------end of localize time picker------------------------- */}

          <Box sx={{
            width: '100%',
            height: '0.2%',
            backgroundColor: Colours.white,
            marginTop: '8%',
            fontFamily: 'Poppins',
          }}></Box>

          <Box display="flex" justifyContent="space-between">
            <p>Total Amount :</p>
            <p>{price}</p>
          </Box>

          <Box display="flex">
            <Button xs={12} sm={6} onClick={makeOrder} variant="contained" sx={{
              marginLeft: '30%',
              marginTop: '10%',
              background: Colours.green, '&:hover': {
                backgroundColor: Colours.yellow,
              },
              color: Colours.dark,
              fontSize: '20px',
              fontFamily: 'Poppins',
              hover: Colours.yellow,
              [theme.breakpoints.down('sm')]: {
                fontSize: '18px',
                marginLeft: '0%',
                width: '100%',


              },
            }}>
              PLACE THE ORDER
            </Button>
          </Box>

        </Box>



      </Grid>
    </Grid>
  )
}

export default Userorderform
