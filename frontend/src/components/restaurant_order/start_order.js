import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import theme, { Colours } from '../../assets/theme/theme';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';

import axios from 'axios';
import authHeader from "../../services/auth-header";

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { useNavigate } from 'react-router-dom';

// ---------------for the add to cart message-------------------
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrderwithS(props) {

  const navigate = useNavigate();

  // ---order item------
  const order = props.order
  const itemId = order.foodId;
  console.log(order);

  // ---order id ---------------
  const oID = props.oId

  // function callData() {

  // -------------------to show the message---------------
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // };

  let callData = () => {
    // -----------------------------------to getting food item details------------------------------------------
    const getOfferDetails = async () => {

      const ItemData = new FormData();
      ItemData.append('itemId', itemId);
      ItemData.append('orderId', oID);

      try {
        const resp = await axios.put(`http://localhost:8072/FoodiFy/Restaurant/updateOrderItem`, ItemData, { headers: authHeader() });

        handleClickOpen();
        navigate("/Restaurantprofile")
        // const details = resp.data;

        // setDetails1({ ...details });

        // console.log(details);

        // setItems([...items1]);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };

    getOfferDetails();

    // --------calling items for cart---------------
  };

  console.log(order.preparedStatus)

  var start = "START";
  var finish = "FINISH";

  return (
    <Box sx={{ backgroundColor: Colours.transparenceGrey, padding: '3%' }} >

      <Box display="flex">
        <Skeleton sx={{ backgroundColor: Colours.white, marginLeft: '40%' }} variant="circular" width={100} height={100} />
        <DoneAllRoundedIcon sx={{
          backgroundColor: 'none', marginTop: '2.5%', position: 'absolute', marginLeft: '16.5%',

          [theme.breakpoints.down('sm')]: {
            marginLeft: '43%',
            marginTop: '8%',

          },

        }} />
      </Box>

      {/* -----------------add to cart message---------------- */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Preparing status recorded!"}</DialogTitle>
      </Dialog>
      {/* -------------end of add to cart message------------- */}


      <Grid item xs={12} sm={6}>
        <Button xs={12} sm={6} variant="contained" onClick={callData} sx={{
          marginLeft: '80%', marginTop: '10%',
          background: Colours.darkgray, '&:hover': {
            backgroundColor: Colours.grayWhite, color: Colours.dark,
          },
          color: Colours.grayWhite,
          fontSize: '20px',
          fontFamily: 'Poppins',

          [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
            width: '100%',
            marginBottom: '7%',
            marginLeft: '0%',

          },
        }}>
          {(() => {
            if (order.preparedStatus == "Preparing") {
              return (
                finish
              );
            }
          }
          )()}

          {(() => {
            if (order.preparedStatus == "Queued") {
              return (
                start
              );
            }
          }
          )()}
        </Button>

      </Grid>


    </Box>
  )
}